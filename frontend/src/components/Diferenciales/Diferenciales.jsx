import React from 'react';
import './Diferenciales.css';

const DIFERENCIALES = [
  {
    icono: '🏆',
    titulo: 'Acreditación en Alta Calidad',
    descripcion: 'Resolución No. 7575 del 8 de mayo de 2023. Reconocimiento oficial a la excelencia académica del programa.',
  },
  {
    icono: '🔬',
    titulo: 'Semilleros de Investigación activos',
    descripcion: 'ComunitiC y DINAMUS: semilleros donde los estudiantes desarrollan proyectos tecnológicos con impacto real en la región.',
  },
  {
    icono: '🖥️',
    titulo: 'Laboratorios especializados',
    descripcion: 'Infraestructura actualizada en redes, hardware, software y electrónica para aprendizaje práctico desde el primer semestre.',
  },
  {
    icono: '🌎',
    titulo: 'Movilidad académica',
    descripcion: 'Convenios con instituciones nacionales e internacionales para cursar semestres de movilidad y ampliar perspectivas profesionales.',
  },
  {
    icono: '💼',
    titulo: 'Empleabilidad en Casanare',
    descripcion: 'Vinculación con el sector petrolero, agroindustrial y público de la región para prácticas profesionales y empleabilidad temprana.',
  },
];

export default function Diferenciales() {
  return (
    <div className="diferenciales">
      <h2 id="dif-heading" className="section-heading">¿Por qué estudiar Ingeniería de Sistemas en UNISANGIL Yopal?</h2>
      <p className="section-sub">5 razones verificables para elegir nuestro programa.</p>
      <ul className="dif-grid" role="list">
        {DIFERENCIALES.map((d, i) => (
          <li key={i} className="dif-card">
            <span className="dif-icono" aria-hidden="true">{d.icono}</span>
            <h3 className="dif-titulo">{d.titulo}</h3>
            <p className="dif-desc">{d.descripcion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
