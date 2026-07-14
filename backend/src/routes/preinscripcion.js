/**
 * routes/preinscripcion.js — POST /api/preinscripcion
 *
 * RF-07: Permite que un aspirante solicite información desde la ficha,
 *        registrando datos de contacto, programa de interés y
 *        autorización de tratamiento de datos.
 *
 * CA2: El usuario puede llegar a "Solicitar información" en máx. 1 clic
 *      desde la ficha; este endpoint procesa esa acción.
 *
 * Validación: HTTP 400 si faltan campos obligatorios.
 * Persistencia: preinscripciones.json (archivo local).
 *               En producción reemplazar con BD o servicio de correo.
 */
import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORE_PATH = join(__dirname, '../../data/preinscripciones.json');

/* ── Helpers de persistencia ─────────────────────────────── */
function leerStore() {
  try {
    return JSON.parse(readFileSync(STORE_PATH, 'utf-8'));
  } catch {
    return [];
  }
}

function guardarStore(datos) {
  writeFileSync(STORE_PATH, JSON.stringify(datos, null, 2), 'utf-8');
}

/* ── Validación de correo ────────────────────────────────── */
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── Campos obligatorios (RF-07) ─────────────────────────── */
const CAMPOS_REQUERIDOS = ['nombre', 'correo', 'programaInteres', 'autorizaDatos'];

export const preinscripcionRouter = Router();

/**
 * POST /api/preinscripcion
 *
 * Body esperado:
 * {
 *   nombre:          string  — obligatorio
 *   correo:          string  — obligatorio, formato e-mail válido
 *   telefono:        string  — opcional
 *   programaInteres: string  — obligatorio (RF-07)
 *   autorizaDatos:   boolean — obligatorio, debe ser true (Ley 1581/2012)
 *   mensaje:         string  — opcional
 * }
 *
 * Respuestas:
 *   201 Created  — preinscripción guardada
 *   400 Bad Request — falta(n) campo(s) obligatorio(s) o valor inválido
 */
preinscripcionRouter.post('/', (req, res) => {
  const { nombre, correo, telefono, programaInteres, autorizaDatos, mensaje } = req.body ?? {};

  /* ── 1. Presencia de campos obligatorios ─────────────────── */
  const faltantes = CAMPOS_REQUERIDOS.filter(c => {
    const val = req.body?.[c];
    return val === undefined || val === null || val === '';
  });

  if (faltantes.length > 0) {
    return res.status(400).json({
      error: 'Faltan campos obligatorios.',
      camposFaltantes: faltantes,
    });
  }

  /* ── 2. Formato de correo ────────────────────────────────── */
  if (!RE_EMAIL.test(correo.trim())) {
    return res.status(400).json({
      error: 'El campo correo no tiene un formato válido.',
      campo: 'correo',
    });
  }

  /* ── 3. Autorización de datos — Ley 1581/2012 ───────────── */
  if (autorizaDatos !== true) {
    return res.status(400).json({
      error: 'Debe autorizar el tratamiento de sus datos personales para continuar.',
      campo: 'autorizaDatos',
    });
  }

  /* ── 4. Longitudes mínimas ───────────────────────────────── */
  if (nombre.trim().length < 2) {
    return res.status(400).json({ error: 'El nombre debe tener al menos 2 caracteres.', campo: 'nombre' });
  }
  if (programaInteres.trim().length < 2) {
    return res.status(400).json({ error: 'El campo programaInteres no es válido.', campo: 'programaInteres' });
  }

  /* ── 5. Guardar en preinscripciones.json ─────────────────── */
  const registro = {
    id: `PI-${Date.now()}`,
    timestamp: new Date().toISOString(),
    nombre: nombre.trim(),
    correo: correo.trim().toLowerCase(),
    telefono: telefono?.trim() ?? null,
    programaInteres: programaInteres.trim(),
    mensaje: mensaje?.trim() ?? null,
    autorizaDatos: true,
    estado: 'pendiente',
  };

  try {
    const store = leerStore();
    store.push(registro);
    guardarStore(store);
  } catch (err) {
    console.error('Error al guardar preinscripción:', err);
    return res.status(500).json({ error: 'No se pudo guardar la preinscripción. Intenta de nuevo.' });
  }

  console.log(`📩  Preinscripción recibida [${registro.id}]: ${registro.nombre} <${registro.correo}>`);

  return res.status(201).json({
    mensaje: `Gracias, ${registro.nombre}. Tu solicitud fue recibida. En máximo 2 días hábiles te contactaremos en ${registro.correo}.`,
    id: registro.id,
    programa: registro.programaInteres,
    contacto: {
      correo: 'admisionesyopal@unisangil.edu.co',
      telefono: '(608) 661 2616',
      horario: 'Lunes a viernes, 7:00 a.m. – 5:00 p.m.',
    },
  });
});

/**
 * GET /api/preinscripcion
 * Lista todas las preinscripciones (uso interno / debugging).
 * En producción proteger con autenticación.
 */
preinscripcionRouter.get('/', (_req, res) => {
  try {
    const store = leerStore();
    res.json({ total: store.length, preinscripciones: store });
  } catch {
    res.status(500).json({ error: 'No se pudo leer el archivo de preinscripciones.' });
  }
});
