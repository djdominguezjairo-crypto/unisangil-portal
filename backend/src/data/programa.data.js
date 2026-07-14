/**
 * Datos del programa — fuente única de verdad (RF-01, RF-04, RF-05)
 * Vigencia: 2026 · Circular REC-2025-003
 */
export const PROGRAMA = {
  titulo: 'Ingeniería de Sistemas',
  snies: '7915',
  acreditacion: 'Alta Calidad — Resolución No. 7575 del 8 de mayo de 2023',
  modalidad: 'Presencial',
  duracion: '8 semestres',
  creditosTotales: 137,
  vigencia: '2026',
  costos: {
    valorCreditoPrimerIngreso: 348472,
    matriculaPrimerIngreso: 5924024,
    cursoIngles: 585203,
    fuente: 'Circular REC-2025-003 · Valores pecuniarios 2026',
  },
  contacto: {
    telefono: '(608) 661 2616',
    extensiones: ['2208', '2209', '2210', '2240'],
    celulares: ['310 628 1503', '322 810 6500', '312 781 2305'],
    correoPrograma: 'ingsistemasyopal@unisangil.edu.co',
    correoAdmisiones: 'admisionesyopal@unisangil.edu.co',
    correoRegistro: 'registroacademicoyopal@unisangil.edu.co',
    direccion: 'Campus Universitario Km 2 vía Matepantano, Yopal, Casanare',
    horarioAtencion: 'Lunes a viernes, 7:00 a.m. – 5:00 p.m.',
    tiempoRespuesta: 'Máximo 2 días hábiles',
  },
};

export const PLAN_ESTUDIOS = {
  version: 'Plan vigente 2024-2026',
  totalCreditos: 137,
  totalAsignaturas: 49,
  modalidadGrado: 'Trabajo de Grado o modalidades equivalentes establecidas en el Reglamento Académico',
  requisitoIdioma: 'Certificación en inglés nivel B1',
  semestres: [
    {
      nivel: 1,
      creditos: 17,
      asignaturas: [
        { nombre: 'Cálculo Diferencial', creditos: 3 },
        { nombre: 'Fundamentos de Programación', creditos: 3 },
        { nombre: 'Álgebra', creditos: 3 },
        { nombre: 'Diseño y Prototipado', creditos: 3 },
        { nombre: 'Mecánica', creditos: 3 },
        { nombre: 'Expresión 1', creditos: 2 },
      ],
    },
    {
      nivel: 2,
      creditos: 17,
      asignaturas: [
        { nombre: 'Matemáticas Discretas', creditos: 3 },
        { nombre: 'Programación 1', creditos: 3 },
        { nombre: 'Cálculo Integral', creditos: 3 },
        { nombre: 'Electromagnetismo', creditos: 3 },
        { nombre: 'Proyecto Integrador 1', creditos: 1 },
        { nombre: 'Expresión 2', creditos: 2 },
      ],
      prereq: 'Nivel I aprobado',
    },
    {
      nivel: 3,
      creditos: 19,
      asignaturas: [
        { nombre: 'Hardware y Sistemas Operativos', creditos: 3 },
        { nombre: 'Estructura de Datos', creditos: 3 },
        { nombre: 'Cálculo en Varias Variables', creditos: 3 },
        { nombre: 'Modelado y Análisis Numérico', creditos: 3 },
        { nombre: 'Sistemas Bióticos', creditos: 3 },
        { nombre: 'Proyecto Integrador 2', creditos: 1 },
        { nombre: 'Ciudadanía', creditos: 2 },
      ],
      prereq: 'Nivel II aprobado',
    },
    {
      nivel: 4,
      creditos: 17,
      asignaturas: [
        { nombre: 'Programación 2', creditos: 3 },
        { nombre: 'Redes de Computadores', creditos: 3 },
        { nombre: 'Bases de Datos', creditos: 3 },
        { nombre: 'Estadística', creditos: 3 },
        { nombre: 'Proyecto Integrador 3', creditos: 1 },
        { nombre: 'Electiva Complementaria 1', creditos: 2, esElectiva: true },
      ],
      prereq: 'Nivel III aprobado',
      nota: 'Consultar el PEP vigente para detalle de electivas',
    },
    {
      nivel: 5,
      creditos: 17,
      asignaturas: [
        { nombre: 'Modelado de Sistemas de Información', creditos: 3 },
        { nombre: 'Administración y Gestión de Bases de Datos', creditos: 3 },
        { nombre: 'Desarrollo Web', creditos: 3 },
        { nombre: 'Gestión de TI', creditos: 3 },
        { nombre: 'Proyecto Integrador 4', creditos: 1 },
        { nombre: 'Electiva Complementaria 2', creditos: 2, esElectiva: true },
      ],
      prereq: 'Nivel IV aprobado',
      nota: 'Consultar el PEP vigente para detalle de electivas',
    },
    {
      nivel: 6,
      creditos: 17,
      asignaturas: [
        { nombre: 'Ingeniería de Software', creditos: 3 },
        { nombre: 'Seguridad Informática', creditos: 3 },
        { nombre: 'Inteligencia Artificial', creditos: 3 },
        { nombre: 'Formulación y Evaluación de Proyectos', creditos: 3 },
        { nombre: 'Proyecto Integrador 5', creditos: 1 },
        { nombre: 'Electiva Profesional 1', creditos: 2, esElectiva: true },
      ],
      prereq: 'Nivel V aprobado',
    },
    {
      nivel: 7,
      creditos: 17,
      asignaturas: [
        { nombre: 'Gerencia de Proyectos de TI', creditos: 3 },
        { nombre: 'Arquitectura de Software', creditos: 3 },
        { nombre: 'Ciencia de Datos', creditos: 3 },
        { nombre: 'Emprendimiento e Innovación', creditos: 3 },
        { nombre: 'Electiva Profesional 2', creditos: 3, esElectiva: true },
      ],
      prereq: 'Nivel VI aprobado',
    },
    {
      nivel: 8,
      creditos: 16,
      asignaturas: [
        { nombre: 'Trabajo de Grado 1', creditos: 4 },
        { nombre: 'Trabajo de Grado 2', creditos: 4 },
        { nombre: 'Electiva Profesional 3', creditos: 3, esElectiva: true },
        { nombre: 'Electiva de Movilidad', creditos: 3, esElectiva: true },
      ],
      prereq: 'Nivel VII aprobado · Certificación inglés B1',
      nota: 'Los niveles 7 y 8 y el detalle de electivas deben confirmarse con el PEP oficial disponible en unisangil.edu.co',
    },
  ],
};

export const ADMISION = {
  pasos: [
    {
      numero: 1,
      titulo: 'Solicitud de admisión',
      descripcion: 'Diligencia el formulario de inscripción en el portal institucional de UNISANGIL.',
      destino: 'Formulario externo — Portal UNISANGIL',
      url: 'https://www.unisangil.edu.co',
    },
    {
      numero: 2,
      titulo: 'Entrevista con el director del programa',
      descripcion: 'Entrevista orientativa para conocer el perfil e intereses del aspirante.',
    },
    {
      numero: 3,
      titulo: 'Matrícula',
      descripcion: 'Pago de matrícula y formalización de la vinculación académica.',
    },
  ],
  requisitos: [
    'Ser bachiller (diploma de bachiller o acta de grado)',
    'Documento de identidad vigente',
    'Formulario de inscripción diligenciado',
    'No se exige puntaje mínimo en Pruebas Saber 11',
  ],
  fechas2026: {
    semestre2: {
      solicitudAdmision: '7 de abril – 31 de julio de 2026',
      matriculaProntoPago: '9 de abril – 4 de julio de 2026',
      matriculaPlena: '6 de julio – 1 de agosto de 2026',
      inscripcionAsignaturas: '18 de junio – 31 de julio de 2026',
    },
  },
  financiacion: [
    'Convenios con entidades financieras',
    'Apoyo para trámites de crédito con ICETEX',
  ],
};
