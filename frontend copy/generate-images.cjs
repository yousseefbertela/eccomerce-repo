const fs = require('fs');
const path = require('path');

// Create directory for products if it doesn't exist
const productsDir = path.join(__dirname, 'public', 'assets', 'images', 'products');
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

console.log('🎨 Generating 360 placeholder product images (120 products × 3 images)...\n');

const colors = [
  '#1A1A1A', '#2C3E50', '#34495E', '#7F8C8D', '#95A5A6', 
  '#BDC3C7', '#ECF0F1', '#3498DB', '#2ECC71', '#F39C12',
  '#E74C3C', '#9B59B6', '#1ABC9C', '#16A085', '#27AE60',
  '#2980B9', '#8E44AD', '#2C2C2C', '#464646', '#5A5A5A'
];

for (let prodNum = 1; prodNum <= 120; prodNum++) {
  for (let imgNum = 1; imgNum <= 3; imgNum++) {
    const colorIndex = (prodNum + imgNum) % colors.length;
    const bgColor = colors[colorIndex];
    const textColor = colorIndex < 8 ? '#FFFFFF' : '#000000';
    
    // Create SVG
    const svg = `<svg width="800" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${prodNum}-${imgNum}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${adjustBrightness(bgColor, -30)};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#grad${prodNum}-${imgNum})"/>
  <text x="400" y="450" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="${textColor}" text-anchor="middle">PROD ${prodNum}</text>
  <text x="400" y="550" font-family="Arial, sans-serif" font-size="48" font-weight="normal" fill="${textColor}" opacity="0.8" text-anchor="middle">Image ${imgNum}</text>
  <circle cx="400" cy="700" r="80" fill="none" stroke="${textColor}" stroke-width="4" opacity="0.3"/>
  <text x="400" y="720" font-family="Arial, sans-serif" font-size="32" fill="${textColor}" opacity="0.5" text-anchor="middle">${getImageLabel(imgNum)}</text>
</svg>`;
    
    const filename = `product-${prodNum}-${imgNum}.svg`;
    const filepath = path.join(productsDir, filename);
    fs.writeFileSync(filepath, svg, 'utf8');
    
    if (prodNum % 20 === 0 && imgNum === 3) {
      console.log(`✅ Generated ${prodNum * 3} images (${Math.floor(prodNum/1.2)}% complete)...`);
    }
  }
}

console.log('\n🎉 Successfully generated 360 product images!');
console.log(`📁 Images saved to: ${productsDir}`);

function adjustBrightness(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
}

function getImageLabel(imgNum) {
  switch(imgNum) {
    case 1: return 'FRONT';
    case 2: return 'BACK';
    case 3: return 'DETAIL';
    default: return 'VIEW';
  }
}
