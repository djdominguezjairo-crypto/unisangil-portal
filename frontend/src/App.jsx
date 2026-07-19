import React, { useState } from 'react';
import FichaTecnica from './components/FichaTecnica/index.js';
import PlanEstudios from './components/PlanEstudios/index.js';
import Diferenciales from './components/Diferenciales/index.js';
import Perfiles from './components/Perfiles/index.js';
import Admision from './components/Admision/index.js';
import FormularioContacto from './components/FormularioContacto/index.js';
import Contacto from './components/Contacto/index.js';
import ChatWidget from './components/ChatWidget/index.jsx';
import './styles/app.css';

export default function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <>
      <a href="#contenido-principal" className="skip-link">
        Ir al contenido principal
      </a>

      {/* ── NAVEGACIÓN ───────────────────────────── */}
      <header className="site-header" role="banner">
        <nav className="nav-bar" aria-label="Navegación principal">
          <div className="container nav-inner">
            <a href="#inicio" className="nav-logo" aria-label="Portal UNISANGIL Ingeniería de Sistemas">
              <span className="nav-logo-primary">UNISANGIL</span>
              <span className="nav-logo-sep"> · </span>
              <span className="nav-logo-secondary">Ing. Sistemas — Yopal</span>
            </a>

            <button
              className={`nav-hamburger${menuAbierto ? ' is-open' : ''}`}
              aria-expanded={menuAbierto}
              aria-controls="nav-links"
              aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setMenuAbierto(v => !v)}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>

            <ul
              id="nav-links"
              className={`nav-links${menuAbierto ? ' is-open' : ''}`}
              role="list"
            >
              {[
                ['#programa', 'El Programa'],
                ['#plan', 'Plan de Estudios'],
                ['#admision', 'Admisión'],
                ['#contacto', 'Contacto'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="nav-link" onClick={cerrarMenu}>{label}</a>
                </li>
              ))}
              <li>
                <a href="#solicitar-informacion" className="nav-cta" onClick={cerrarMenu}>
                  Solicitar información
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* ── HERO ─────────────────────────────────── */}
      <section id="inicio" className="hero" aria-labelledby="hero-heading">
        <div className="container hero-inner">
          <div className="hero-badge">SNIES 7915 · Acreditado en Alta Calidad</div>
          <h1 id="hero-heading" className="hero-heading">
            Ingeniería de Sistemas<br />
            <span className="hero-heading-accent">en UNISANGIL Yopal</span>
          </h1>
          <p className="hero-sub">
            Forma tu futuro en la capital del Casanare. Programa acreditado en Alta Calidad,
            8 semestres, enfoque práctico y vinculación con la industria regional.
          </p>
          <div className="hero-actions">
            <a href="#solicitar-informacion" className="btn-primary" id="hero-solicitar">
              Solicitar información
            </a>
            <a
              href="https://www.unisangil.edu.co"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              id="hero-inscribirse"
              aria-label="Inscribirme — abre el portal UNISANGIL en una nueva pestaña"
            >
              Inscribirme ↗
            </a>
          </div>
          <div className="hero-stats" aria-label="Datos rápidos del programa">
            <div className="hero-stat"><span className="hero-stat-value">8</span><span className="hero-stat-label">Semestres</span></div>
            <div className="hero-stat-sep" aria-hidden="true" />
            <div className="hero-stat"><span className="hero-stat-value">137</span><span className="hero-stat-label">Créditos</span></div>
            <div className="hero-stat-sep" aria-hidden="true" />
            <div className="hero-stat"><span className="hero-stat-value">2023</span><span className="hero-stat-label">Acreditación</span></div>
          </div>
        </div>
      </section>

      {/* ── CONTENIDO PRINCIPAL ───────────────────── */}
      <main id="contenido-principal" tabIndex={-1}>

        {/* Ficha técnica */}
        <section id="programa" className="section section-alt" aria-labelledby="ficha-section-heading">
          <div className="container">
            <h2 id="ficha-section-heading" className="section-heading">El Programa</h2>
            <p className="section-sub">Toda la información que necesitas para decidir.</p>
            <div className="ficha-wrapper">
              <FichaTecnica />
            </div>
          </div>
        </section>

        {/* Diferenciales */}
        <section id="diferenciales" className="section" aria-labelledby="dif-heading">
          <div className="container">
            <Diferenciales />
          </div>
        </section>

        {/* Perfiles */}
        <section id="perfiles" className="section section-alt" aria-labelledby="perfiles-heading">
          <div className="container">
            <Perfiles />
          </div>
        </section>

        {/* Plan de estudios */}
        <section id="plan" className="section" aria-labelledby="plan-heading">
          <div className="container">
            <PlanEstudios />
          </div>
        </section>

        {/* Admisión */}
        <section id="admision" className="section section-alt" aria-labelledby="admision-heading">
          <div className="container">
            <Admision />
          </div>
        </section>

        {/* Formulario */}
        <section id="solicitar-informacion" className="section" aria-labelledby="form-heading">
          <div className="container">
            <FormularioContacto />
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="section section-alt" aria-labelledby="contacto-heading">
          <div className="container">
            <Contacto />
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="site-footer" role="contentinfo">
        <div className="container footer-inner">
          <p className="footer-copy">
            © 2026 UNISANGIL · Sede Yopal · Ingeniería de Sistemas · SNIES 7915
          </p>
          <p className="footer-legal">
            Información vigente 2026 · Circular REC-2025-003 ·{' '}
            <a
              href="https://www.unisangil.edu.co"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portal institucional ↗
            </a>
          </p>
        </div>
      </footer>

      {/* ── ASISTENTE DE ADMISIONES (widget flotante) ── */}
      <ChatWidget />
    </>
  );
}
