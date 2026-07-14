/**
 * Portal Ingeniería de Sistemas — UNISANGIL Yopal
 * Servidor Express — punto de entrada
 */
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { programaRouter } from './routes/programa.js';
import { admisionRouter } from './routes/admision.js';
import { contactoRouter } from './routes/contacto.js';
import { planRouter } from './routes/plan.js';
import { preinscripcionRouter } from './routes/preinscripcion.js';

const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* ── Middleware ─────────────────────────────────────────── */
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3001'] }));
app.use(express.json());

/* ── Rutas API ──────────────────────────────────────────── */
app.use('/api/programa', programaRouter);
app.use('/api/admision', admisionRouter);
app.use('/api/contacto', contactoRouter);
app.use('/api/plan', planRouter);
app.use('/api/preinscripcion', preinscripcionRouter);

/* ── Health check ───────────────────────────────────────── */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* ── Frontend estático (producción) ─────────────────────── */
const distPath = path.resolve(__dirname, '../../frontend/dist');
app.use(express.static(distPath));

/* ── SPA fallback — todas las rutas no-API van al index.html */
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅  Servidor arriba en http://localhost:${PORT}`);
  console.log(`📦  Frontend servido desde: ${distPath}`);
});

