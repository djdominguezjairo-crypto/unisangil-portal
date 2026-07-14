import { Router } from 'express';
import { PROGRAMA } from '../data/programa.data.js';

export const contactoRouter = Router();

/** GET /api/contacto — RF-10 */
contactoRouter.get('/', (_req, res) => {
  res.json(PROGRAMA.contacto);
});

/**
 * POST /api/contacto/solicitud — RF-07
 * Registra la solicitud de información del aspirante.
 * En producción, aquí se conectaría con un CRM o servicio de correo.
 */
contactoRouter.post('/solicitud', (req, res) => {
  const { nombre, correo, telefono, autorizaDatos } = req.body;

  if (!nombre || !correo || !autorizaDatos) {
    return res.status(400).json({
      error: 'Los campos nombre, correo y autorización de datos son obligatorios.',
    });
  }

  // Simulación de registro (reemplazar con integración real en producción)
  console.log('📩  Solicitud de información recibida:', { nombre, correo, telefono });

  res.status(201).json({
    mensaje: `Gracias, ${nombre}. En máximo 2 días hábiles te contactaremos en ${correo}.`,
    programa: 'Ingeniería de Sistemas — Sede Yopal',
  });
});
