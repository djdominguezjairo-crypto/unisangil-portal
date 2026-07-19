import React, { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import './Contacto.css';

export default function Contacto() {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    api
      .getContacto()
      .then(setDatos)
      .catch(() => {});
  }, []);

  if (!datos) return null;

  return (
    <div className="contacto">
      <h2 id="contacto-heading" className="section-heading">Canales de Atención</h2>
      <p className="section-sub">Estamos para ayudarte. Respuesta en máximo {datos.tiempoRespuesta.toLowerCase()}.</p>

      <div className="contacto-grid">
        <div className="contacto-card">
          <span className="contacto-icon" aria-hidden="true">📞</span>
          <h3 className="contacto-titulo">Teléfonos</h3>
          <p className="contacto-main">{datos.telefono}</p>
          <p className="contacto-detail">Extensiones: {datos.extensiones.join(' · ')}</p>
          <div className="contacto-cels">
            {datos.celulares.map(c => (
              <a key={c} href={`tel:+57${c.replace(/\s/g,'')}`} className="contacto-link">{c}</a>
            ))}
          </div>
        </div>

        <div className="contacto-card">
          <span className="contacto-icon" aria-hidden="true">✉️</span>
          <h3 className="contacto-titulo">Correos electrónicos</h3>
          <ul className="contacto-emails" role="list">
            <li><span className="contacto-label">Programa:</span><a href={`mailto:${datos.correoPrograma}`} className="contacto-link">{datos.correoPrograma}</a></li>
            <li><span className="contacto-label">Admisiones:</span><a href={`mailto:${datos.correoAdmisiones}`} className="contacto-link">{datos.correoAdmisiones}</a></li>
            <li><span className="contacto-label">Registro:</span><a href={`mailto:${datos.correoRegistro}`} className="contacto-link">{datos.correoRegistro}</a></li>
          </ul>
        </div>

        <div className="contacto-card">
          <span className="contacto-icon" aria-hidden="true">📍</span>
          <h3 className="contacto-titulo">Ubicación</h3>
          <p className="contacto-main">{datos.direccion}</p>
          <p className="contacto-detail">Horario: {datos.horarioAtencion}</p>
          <a
            href="https://maps.google.com/?q=UNISANGIL+Sede+Yopal"
            target="_blank"
            rel="noopener noreferrer"
            className="contacto-maps"
            aria-label="Ver en Google Maps (abre en nueva pestaña)"
          >
            Ver en Google Maps ↗
          </a>
        </div>
      </div>
    </div>
  );
}
