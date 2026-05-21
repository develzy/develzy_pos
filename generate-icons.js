const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputImagePath = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\5532c814-72eb-4cfd-a9a5-c6e5920510af\\media__1779355201343.png';

async function generateIcons() {
  try {
    const img = sharp(inputImagePath);
    
    // Create src/app/icon.png (Next.js App Router default icon)
    await img.resize(512, 512).toFile(path.join(__dirname, 'src', 'app', 'icon.png'));
    
    // Create src/app/apple-icon.png
    await img.resize(180, 180).toFile(path.join(__dirname, 'src', 'app', 'apple-icon.png'));

    // Create public/logo.png
    await img.resize(512, 512).toFile(path.join(__dirname, 'public', 'logo.png'));
    
    // Create PWA Icons
    await img.resize(192, 192).toFile(path.join(__dirname, 'public', 'icon-192x192.png'));
    await img.resize(512, 512).toFile(path.join(__dirname, 'public', 'icon-512x512.png'));
    
    // Create favicon.ico (just a 32x32 png saved as ico usually works, or just write a 32x32 png to favicon.ico)
    // Wait, sharp doesn't fully support .ico out of the box unless specified. We can use .png and name it favicon.ico or just create public/favicon.png and rely on Next.js `icon.png` to do the job. 
    // Wait, Next.js 13+ App router uses `src/app/icon.png` to generate favicon.ico automatically! So we don't even need to generate favicon.ico manually. Next.js will serve it.
    // However, for traditional HTML, public/favicon.ico is good. Let's just create a 32x32 png and name it favicon.ico.
    await img.resize(32, 32).png().toFile(path.join(__dirname, 'public', 'favicon.ico'));

    console.log('All icons generated successfully!');

    // Generate manifest.json
    const manifest = {
      "name": "DEVELZY POS",
      "short_name": "DEVELZY",
      "description": "Aplikasi Kasir Modern Premium Berbasis Cloud",
      "start_url": "/dashboard",
      "display": "standalone",
      "background_color": "#ffffff",
      "theme_color": "#0F4BFF",
      "icons": [
        {
          "src": "/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ]
    };

    fs.writeFileSync(path.join(__dirname, 'public', 'manifest.json'), JSON.stringify(manifest, null, 2));
    console.log('manifest.json created successfully!');
    
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
