// Script para gerar textura da fita do cordão
// Execute com: node scripts/generate-lanyard-texture.js

import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const canvas = createCanvas(512, 512);
const ctx = canvas.getContext('2d');

// Fundo base - gradiente esmeralda
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, '#34d399');
gradient.addColorStop(0.5, '#10b981');
gradient.addColorStop(1, '#059669');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Listras diagonais para textura de tecido
ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
ctx.lineWidth = 2;
for (let i = -canvas.height; i < canvas.width + canvas.height; i += 8) {
  ctx.beginPath();
  ctx.moveTo(i, 0);
  ctx.lineTo(i + canvas.height, canvas.height);
  ctx.stroke();
}

// Bordas mais escuras
ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
ctx.fillRect(0, 0, canvas.width, 30);
ctx.fillRect(0, canvas.height - 30, canvas.width, 30);

// Linhas de costura
ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
ctx.lineWidth = 1;
ctx.setLineDash([5, 5]);
ctx.beginPath();
ctx.moveTo(0, 20);
ctx.lineTo(canvas.width, 20);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(0, canvas.height - 20);
ctx.lineTo(canvas.width, canvas.height - 20);
ctx.stroke();
ctx.setLineDash([]);

// Texto
ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
ctx.font = 'bold 48px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('MAURICIO', canvas.width / 2, canvas.height / 2);

// Textura de tecido (pontos aleatórios)
for (let i = 0; i < 1000; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const size = Math.random() * 2;
  ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
  ctx.fillRect(x, y, size, size);
}

// Salvar arquivo
const buffer = canvas.toBuffer('image/png');
const outputPath = join(__dirname, '..', 'public', 'lanyard.png');
writeFileSync(outputPath, buffer);

console.log('✅ Textura gerada com sucesso em:', outputPath);
