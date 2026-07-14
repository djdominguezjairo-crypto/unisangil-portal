import React, { useState } from 'react';
import './Perfiles.css';

const PERFILES = {
  aspirante: {
    titulo: 'Perfil del Aspirante',
    descripcion: 'El aspirante a Ingeniería de Sistemas en UNISANGIL Yopal es una persona con:',
    items: [
      'Interés por la tecnología, la programación y la resolución de problemas mediante el pensamiento lógico.',
      'Habilidades matemáticas y analíticas, con disposición para el aprendizaje constante.',
      'Creatividad para diseñar soluciones innovadoras en contextos reales.',
      'Trabajo en equipo, comunicación efectiva y compromiso ético.',
      'Bachiller de cualquier modalidad (no se exige puntaje mínimo en Saber 11).',
    ],
  },
  egresado: {
    titulo: 'Perfil del Egresado',
    descripcion: 'El Ingeniero de Sistemas graduado en UNISANGIL Yopal estará en capacidad de:',
    items: [
      'Diseñar, desarrollar e implementar sistemas de información, software y redes de computadores.',
      'Gestionar proyectos tecnológicos aplicando metodologías ágiles e ingeniería de software.',
      'Analizar datos y construir soluciones basadas en inteligencia artificial y ciencia de datos.',
      'Administrar infraestructura tecnológica con énfasis en seguridad informática y computación en la nube.',
      'Emprender e innovar con responsabilidad social en el contexto regional del Casanare.',
    ],
  },
  ocupacional: {
    titulo: 'Perfil Ocupacional',
    descripcion: 'Los graduados se desempeñan en roles como:',
    items: [
      'Desarrollador de software (frontend, backend, móvil).',
      'Administrador de bases de datos y sistemas de información.',
      'Analista de seguridad informática y ciberseguridad.',
      'Arquitecto de soluciones en la nube (cloud architect).',
      'Gerente o coordinador de proyectos de TI.',
      'Emprendedor tecnológico o consultor independiente.',
      'Docente e investigador en instituciones académicas.',
    ],
  },
};

export default function Perfiles() {
  const [tab, setTab] = useState('aspirante');
  const perfil = PERFILES[tab];

  return (
    <div className="perfiles">
      <h2 id="perfiles-heading" className="section-heading">Perfiles</h2>
      <p className="section-sub">Conoce a quién va dirigido el programa y el futuro profesional que te espera.</p>

      <div
        role="tablist"
        aria-label="Perfiles del programa"
        className="perfiles-tabs"
      >
        {Object.entries(PERFILES).map(([key, p]) => (
          <button
            key={key}
            role="tab"
            id={`tab-${key}`}
            aria-selected={tab === key}
            aria-controls={`panel-${key}`}
            className={`perfiles-tab${tab === key ? ' is-active' : ''}`}
            onClick={() => setTab(key)}
          >
            {p.titulo}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        className="perfiles-panel"
      >
        <p className="perfiles-desc">{perfil.descripcion}</p>
        <ul className="perfiles-list" role="list">
          {perfil.items.map((item, i) => (
            <li key={i} className="perfiles-item">
              <span className="perfiles-bullet" aria-hidden="true">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
