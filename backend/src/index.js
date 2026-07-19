/**
 * Portal Ingeniería de Sistemas — UNISANGIL Yopal
 * Servidor Express — punto de entrada
 */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';

import { programaRouter } from './routes/programa.js';
import { admisionRouter } from './routes/admision.js';
import { contactoRouter } from './routes/contacto.js';
import { planRouter } from './routes/plan.js';
import { preinscripcionRouter } from './routes/preinscripcion.js';
import { asistenteRouter } from './routes/asistente.js';

import serverless from 'serverless-http';

const app = express();
const PORT = process.env.PORT || 3001;

/* ── Middleware ─────────────────────────────────────────── */
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3001', 'https://portal-unisangil-yopal.netlify.app'] }));
app.use(express.json());

/* ── Rutas API ──────────────────────────────────────────── */
// For Netlify Functions, we can mount on /.netlify/functions/api as a fallback, but we will use redirects in netlify.toml
const router = express.Router();
router.use('/programa', programaRouter);
router.use('/admision', admisionRouter);
router.use('/contacto', contactoRouter);
router.use('/plan', planRouter);
router.use('/preinscripcion', preinscripcionRouter);
router.use('/asistente', asistenteRouter);

// Netlify redirects will send /api/* to the function
app.use('/api', router);
// Fallback if netlify functions run from the raw path
app.use('/.netlify/functions/api', router);

/* ── Health check ───────────────────────────────────────── */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* ── Frontend estático (solo desarrollo local) ──────────── */
if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
  const distPath = path.resolve(process.cwd(), '../frontend/dist');
  app.use(express.static(distPath));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`✅  Servidor arriba en http://localhost:${PORT}`);
    console.log(`📦  Frontend servido desde: ${distPath}`);
  });
}

export const handler = serverless(app);


