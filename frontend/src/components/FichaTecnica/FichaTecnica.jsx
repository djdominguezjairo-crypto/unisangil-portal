import React, { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import styles from './FichaTecnica.module.css';

/**
 * FichaTecnica — CA1
 * Muestra duración, créditos, costo, vigencia y SNIES en la ficha.
 * Enlaza al documento curricular oficial (RF-01, RF-05).
 */
export default function FichaTecnica() {
  const [ficha, setFicha] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api
      .getFicha()
      .then(setFicha)
      .catch(() => setError('No se pudo cargar la ficha del programa.'))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return (
      <div className={styles.cargando} role="status" aria-live="polite">
        <span className="sr-only">Cargando ficha del programa…</span>
        <div className={styles.spinner} aria-hidden="true" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error} role="alert">
        <p>{error}</p>
      </div>
    );
  }

  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  return (
    <section
      className={styles.ficha}
      aria-labelledby="ficha-heading"
      data-testid="ficha-tecnica"
    >
      <h2 id="ficha-heading" className={styles.heading}>
        {ficha.titulo}
      </h2>
      <p className={styles.acreditacion}>{ficha.acreditacion}</p>

      <dl className={styles.datos}>
        {/* CA1: SNIES */}
        <div className={styles.dato}>
          <dt>SNIES</dt>
          <dd>{ficha.snies}</dd>
        </div>
        {/* CA1: Modalidad */}
        <div className={styles.dato}>
          <dt>Modalidad</dt>
          <dd>{ficha.modalidad}</dd>
        </div>
        {/* CA1: Duración */}
        <div className={styles.dato}>
          <dt>Duración</dt>
          <dd>{ficha.duracion}</dd>
        </div>
        {/* CA1: Créditos */}
        <div className={styles.dato}>
          <dt>Créditos totales</dt>
          <dd>{ficha.creditosTotales}</dd>
        </div>
        {/* CA1: Costo */}
        <div className={styles.dato}>
          <dt>Matrícula primer ingreso</dt>
          <dd>
            {formatter.format(ficha.costos.matriculaPrimerIngreso)}
            <span className={styles.fuente}> · {ficha.costos.fuente}</span>
          </dd>
        </div>
        {/* CA1: Vigencia */}
        <div className={styles.dato}>
          <dt>Vigencia de datos</dt>
          <dd>{ficha.vigencia}</dd>
        </div>
      </dl>

      {/* RF-08: destino externo claramente indicado */}
      <div className={styles.acciones}>
        <a
          href="#solicitar-informacion"
          className={styles.btnPrimary}
          id="ficha-solicitar-info"
        >
          Solicitar información
        </a>
        <a
          href="https://www.unisangil.edu.co"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btnSecondary}
          id="ficha-inscribirme"
          aria-label="Inscribirme — abre el portal UNISANGIL en una nueva pestaña"
        >
          Inscribirme
          <span className={styles.externalIcon} aria-hidden="true">↗</span>
        </a>
        {/* RF-05: enlace al documento normativo */}
        <a
          href="https://www.unisangil.edu.co"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkDoc}
          id="ficha-ver-pep"
          aria-label="Ver Proyecto Educativo del Programa — PDF en portal UNISANGIL (documento externo)"
        >
          Ver PEP oficial
          <span aria-hidden="true"> (PDF · portal UNISANGIL) ↗</span>
        </a>
      </div>
    </section>
  );
}
