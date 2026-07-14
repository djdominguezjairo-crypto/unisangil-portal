import React, { useEffect, useState } from 'react';
import './PlanEstudios.css';

export default function PlanEstudios() {
  const [plan, setPlan] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [abiertos, setAbiertos] = useState(new Set([1]));
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetch('/api/plan')
      .then(r => r.json())
      .then(setPlan)
      .catch(() => setError('No se pudo cargar el plan de estudios.'))
      .finally(() => setCargando(false));
  }, []);

  const toggleSemestre = n =>
    setAbiertos(prev => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });

  const q = busqueda.toLowerCase().trim();

  if (cargando) return <div className="plan-loading" role="status" aria-live="polite"><div className="spinner-sm" aria-hidden="true" />Cargando plan de estudios…</div>;
  if (error) return <div className="plan-error" role="alert">{error}</div>;

  const semestresVisibles = q
    ? plan.semestres.filter(s => s.asignaturas.some(a => a.nombre.toLowerCase().includes(q)))
    : plan.semestres;

  return (
    <div className="plan-estudios">
      <h2 id="plan-heading" className="section-heading">Plan de Estudios</h2>
      <p className="section-sub">
        {plan.meta.version} · {plan.meta.totalCreditos} créditos · {plan.meta.totalSemestres} semestres · Vigencia {plan.meta.vigencia}
      </p>

      {/* Buscador */}
      <div className="plan-search-wrap">
        <label htmlFor="plan-search" className="sr-only">Buscar asignatura</label>
        <input
          id="plan-search"
          type="search"
          placeholder="Buscar asignatura…"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="plan-search"
          aria-label="Buscar asignatura en el plan de estudios"
        />
      </div>

      {/* Acordeones por semestre */}
      <div className="plan-semestres" role="list">
        {semestresVisibles.map(sem => {
          const asignFiltradas = q
            ? sem.asignaturas.filter(a => a.nombre.toLowerCase().includes(q))
            : sem.asignaturas;
          const isOpen = abiertos.has(sem.nivel) || q.length > 0;

          return (
            <div key={sem.nivel} className="sem-card" role="listitem">
              <button
                className={`sem-header${isOpen ? ' is-open' : ''}`}
                onClick={() => toggleSemestre(sem.nivel)}
                aria-expanded={isOpen}
                aria-controls={`sem-body-${sem.nivel}`}
                id={`sem-btn-${sem.nivel}`}
              >
                <span className="sem-numero">Semestre {sem.nivel}</span>
                <span className="sem-nombre">{sem.nombre}</span>
                <span className="sem-creditos">{sem.creditosSemestre} créditos</span>
                <span className="sem-acum">({sem.creditosAcumulados} acumulados)</span>
                <span className="sem-chevron" aria-hidden="true">{isOpen ? '▲' : '▼'}</span>
              </button>

              {isOpen && (
                <div
                  id={`sem-body-${sem.nivel}`}
                  className="sem-body"
                  role="region"
                  aria-labelledby={`sem-btn-${sem.nivel}`}
                >
                  {sem.prerequisitoNivel && (
                    <p className="sem-prereq">
                      <strong>Prerrequisito:</strong> {sem.prerequisitoNivel}
                    </p>
                  )}
                  <table className="sem-tabla" aria-label={`Asignaturas semestre ${sem.nivel}`}>
                    <thead>
                      <tr>
                        <th scope="col">Asignatura</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Créditos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {asignFiltradas.map(a => (
                        <tr key={a.id} className={a.esElectiva ? 'row-electiva' : ''}>
                          <td>
                            {a.nombre}
                            {a.esElectiva && <span className="tag-electiva">Electiva</span>}
                          </td>
                          <td>{a.tipo}</td>
                          <td className="td-creditos">{a.creditos}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {sem.nota && <p className="sem-nota">{sem.nota}</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Metadatos y leyenda */}
      <div className="plan-meta">
        <p><strong>Modalidad de grado:</strong> {plan.meta.modalidadGrado}</p>
        <p><strong>Requisito de idioma:</strong> {plan.meta.requisitoIdioma}</p>
        <p><strong>Electivas:</strong> {plan.meta.notaElectivas}</p>
        <p className="plan-fuente">Fuente: {plan.meta.fuente} · Vigencia {plan.meta.vigencia}</p>
      </div>
    </div>
  );
}
