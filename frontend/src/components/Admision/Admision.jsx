import React, { useEffect, useState } from 'react';
import './Admision.css';

export default function Admision() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('/api/admision')
      .then(r => r.json())
      .then(setDatos)
      .catch(() => {})
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <div className="adm-loading" role="status" aria-live="polite">Cargando información de admisión…</div>;
  if (!datos) return null;

  return (
    <div className="admision">
      <h2 id="admision-heading" className="section-heading">Proceso de Admisión</h2>
      <p className="section-sub">Simple, directo y sin puntaje mínimo en Saber 11.</p>

      <div className="adm-grid">
        {/* Pasos */}
        <div className="adm-pasos-wrap">
          <h3 className="adm-subtitle">Pasos para ingresar</h3>
          <ol className="adm-pasos" aria-label="Pasos del proceso de admisión">
            {datos.pasos.map(p => (
              <li key={p.numero} className="adm-paso">
                <span className="adm-num" aria-label={`Paso ${p.numero}`}>{p.numero}</span>
                <div>
                  <strong className="adm-paso-titulo">{p.titulo}</strong>
                  <p className="adm-paso-desc">{p.descripcion}</p>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="adm-link">
                      {p.destino} ↗
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Requisitos + Fechas */}
        <div className="adm-sidebar">
          <div className="adm-card">
            <h3 className="adm-card-title">📋 Documentos requeridos</h3>
            <ul className="adm-req-list" role="list">
              {datos.requisitos.map((r, i) => (
                <li key={i} className="adm-req-item">
                  <span aria-hidden="true">✔</span> {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="adm-card adm-card-yellow">
            <h3 className="adm-card-title">📅 Fechas 2026 — Semestre II</h3>
            <ul className="adm-fechas" role="list">
              <li><strong>Solicitud de admisión:</strong><br />{datos.fechas2026.semestre2.solicitudAdmision}</li>
              <li><strong>Matrícula pronto pago:</strong><br />{datos.fechas2026.semestre2.matriculaProntoPago}</li>
              <li><strong>Matrícula plena:</strong><br />{datos.fechas2026.semestre2.matriculaPlena}</li>
              <li><strong>Inscripción asignaturas:</strong><br />{datos.fechas2026.semestre2.inscripcionAsignaturas}</li>
            </ul>
          </div>

          <div className="adm-card">
            <h3 className="adm-card-title">💳 Financiación</h3>
            <ul role="list" className="adm-req-list">
              {datos.financiacion.map((f, i) => (
                <li key={i} className="adm-req-item"><span aria-hidden="true">✔</span> {f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
