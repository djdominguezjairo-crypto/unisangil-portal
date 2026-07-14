/**
 * routes/plan.js — GET /api/plan
 *
 * RF-04: Publica el plan de estudios vigente por semestre con
 *        asignaturas, créditos, total acumulado, requisitos,
 *        electivas y modalidad de grado.
 * RF-05: Identifica versión, fecha de vigencia y documento normativo.
 *
 * CA3: El plan muestra ocho semestres con materias y créditos,
 *      total de créditos, electivas, requisitos y modalidad de grado;
 *      cada dato indica su vigencia.
 */
import { Router } from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, '../../data/plan.json');

function leerPlan() {
  return JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
}

export const planRouter = Router();

/**
 * GET /api/plan
 * Devuelve el plan completo con metadatos de vigencia.
 */
planRouter.get('/', (_req, res) => {
  try {
    const plan = leerPlan();
    res.json(plan);
  } catch {
    res.status(500).json({ error: 'No se pudo leer el plan de estudios.' });
  }
});

/**
 * GET /api/plan/semestre/:n
 * Devuelve un semestre específico (1-8).
 */
planRouter.get('/semestre/:n', (req, res) => {
  const n = parseInt(req.params.n, 10);
  if (isNaN(n) || n < 1 || n > 8) {
    return res.status(400).json({ error: 'El semestre debe ser un número entre 1 y 8.' });
  }
  try {
    const { semestres, meta } = leerPlan();
    const sem = semestres.find(s => s.nivel === n);
    if (!sem) return res.status(404).json({ error: 'Semestre no encontrado.' });
    // Incluir metadatos de vigencia en la respuesta parcial (RF-05)
    res.json({ meta: { version: meta.version, vigencia: meta.vigencia, fuente: meta.fuente }, ...sem });
  } catch {
    res.status(500).json({ error: 'No se pudo leer el plan de estudios.' });
  }
});
