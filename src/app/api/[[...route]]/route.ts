import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { cors } from 'hono/cors';

export const runtime = 'edge';

type Bindings = {
  DB: any; // Type as any for now, or D1Database if types are installed
};

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

app.use('*', cors());

app.get('/health', (c) => {
  return c.json({ status: 'ok', message: 'DEVELZY POS API is running smoothly' });
});

app.get('/products', async (c) => {
  try {
    const db = (c.env?.DB || process.env.DB) as any;
    if (!db) return c.json({ error: "D1 Database binding not found." }, 500);
    
    const { results } = await db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
    return c.json({ data: results });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.post('/products', async (c) => {
  try {
    const db = (c.env?.DB || process.env.DB) as any;
    if (!db) return c.json({ error: "D1 Database binding not found." }, 500);

    const body = await c.req.json();
    const id = `PRD-${Math.floor(Math.random() * 100000)}`;
    const { store_id, name, sku, price, cogs, stock, category, status, image } = body;

    await db.prepare(`
      INSERT INTO products (id, store_id, name, sku, price, cogs, stock, category, status, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(id, store_id, name, sku || '', price, cogs || 0, stock || 0, category || 'Lainnya', status || 'Aktif', image || '').run();

    return c.json({ success: true, data: { id, ...body } });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.delete('/products/:id', async (c) => {
  try {
    const db = (c.env?.DB || process.env.DB) as any;
    if (!db) return c.json({ error: "D1 Database binding not found." }, 500);

    const id = c.req.param('id');
    await db.prepare('DELETE FROM products WHERE id = ?').bind(id).run();

    return c.json({ success: true });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get('/customers', async (c) => {
  try {
    const db = (c.env?.DB || process.env.DB) as any;
    
    if (!db) {
      return c.json({ error: "D1 Database binding not found." }, 500);
    }
    
    const { results } = await db.prepare('SELECT * FROM customers ORDER BY created_at DESC').all();
    return c.json({ data: results });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

