import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

async function generateSignature(params: Record<string, string>, secret: string) {
  const sortedKeys = Object.keys(params).sort();
  const queryStr = sortedKeys.map(k => `${k}=${params[k]}`).join('&');
  const stringToSign = queryStr + secret;
  
  const encoder = new TextEncoder();
  const data = encoder.encode(stringToSign);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

app.post('/upload', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file');
    const storeId = formData.get('store_id') as string || 'General';
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return c.json({ error: 'Cloudinary credentials missing' }, 500);
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = `develzy_pos/${storeId}`;

    const signature = await generateSignature({ folder, timestamp }, apiSecret);

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('api_key', apiKey);
    cloudinaryFormData.append('timestamp', timestamp);
    cloudinaryFormData.append('signature', signature);
    cloudinaryFormData.append('folder', folder);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: cloudinaryFormData,
    });

    const data = await res.json();
    if (!res.ok) {
      return c.json({ error: data.error?.message || 'Upload failed' }, res.status as any);
    }

    return c.json({ url: data.secure_url, public_id: data.public_id });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.post('/upload/delete', async (c) => {
  try {
    const { public_id } = await c.req.json();
    
    if (!public_id) {
      return c.json({ error: 'No public_id provided' }, 400);
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return c.json({ error: 'Cloudinary credentials missing' }, 500);
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = await generateSignature({ public_id, timestamp }, apiSecret);

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('public_id', public_id);
    cloudinaryFormData.append('api_key', apiKey);
    cloudinaryFormData.append('timestamp', timestamp);
    cloudinaryFormData.append('signature', signature);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: 'POST',
      body: cloudinaryFormData,
    });

    const data = await res.json();
    return c.json({ success: true, result: data.result });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
