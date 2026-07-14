import { Router } from 'express';
import { PROGRAMA, PLAN_ESTUDIOS } from '../data/programa.data.js';

export const programaRouter = Router();

/** GET /api/programa/ficha — RF-01 (CA1: duración, créditos, costo, vigencia, SNIES) */
programaRouter.get('/ficha', (_req, res) => {
  res.json({
    titulo: PROGRAMA.titulo,
    snies: PROGRAMA.snies,
    acreditacion: PROGRAMA.acreditacion,
    modalidad: PROGRAMA.modalidad,
    duracion: PROGRAMA.duracion,
    creditosTotales: PROGRAMA.creditosTotales,
    costos: PROGRAMA.costos,
    vigencia: PROGRAMA.vigencia,
  });
});

/** GET /api/programa/plan — RF-04, RF-05 */
programaRouter.get('/plan', (_req, res) => {
  res.json(PLAN_ESTUDIOS);
});

/** GET /api/programa/semestre/:n — RF-04 */
programaRouter.get('/semestre/:n', (req, res) => {
  const n = parseInt(req.params.n, 10);
  const sem = PLAN_ESTUDIOS.semestres.find(s => s.nivel === n);
  if (!sem) return res.status(404).json({ error: 'Semestre no encontrado.' });
  res.json(sem);
});
