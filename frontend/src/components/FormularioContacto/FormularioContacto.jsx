import React, { useState, useId } from 'react';
import './FormularioContacto.css';

const PROGRAMAS = [
  'Ingeniería de Sistemas',
  'Otro programa UNISANGIL',
];

const ESTADO_INICIAL = {
  nombre: '',
  correo: '',
  telefono: '',
  programaInteres: 'Ingeniería de Sistemas',
  mensaje: '',
  autorizaDatos: false,
};

export default function FormularioContacto() {
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(null);
  const [errorEnvio, setErrorEnvio] = useState(null);

  const uid = useId();
  const id = (campo) => `${uid}-${campo}`;

  const set = (campo) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [campo]: val }));
    setErrores(er => ({ ...er, [campo]: null }));
  };

  const validar = () => {
    const er = {};
    if (!form.nombre.trim()) er.nombre = 'El nombre es obligatorio.';
    if (!form.correo.trim()) {
      er.correo = 'El correo es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo.trim())) {
      er.correo = 'Ingresa un correo válido.';
    }
    if (!form.programaInteres) er.programaInteres = 'Selecciona el programa de interés.';
    if (!form.autorizaDatos) er.autorizaDatos = 'Debes autorizar el tratamiento de tus datos para continuar (Ley 1581/2012).';
    return er;
  };

  const enviar = async (e) => {
    e.preventDefault();
    const er = validar();
    if (Object.keys(er).length > 0) {
      setErrores(er);
      const primerCampoError = Object.keys(er)[0];
      document.getElementById(id(primerCampoError))?.focus();
      return;
    }

    setEnviando(true);
    setErrorEnvio(null);
    setExito(null);

    try {
      const resp = await fetch('/api/preinscripcion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          correo: form.correo.trim(),
          telefono: form.telefono.trim() || undefined,
          programaInteres: form.programaInteres,
          mensaje: form.mensaje.trim() || undefined,
          autorizaDatos: form.autorizaDatos,
        }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        setErrorEnvio(data.error || 'No se pudo enviar tu solicitud. Intenta nuevamente.');
      } else {
        setExito(data);
        setForm(ESTADO_INICIAL);
        setErrores({});
      }
    } catch {
      setErrorEnvio('Error de conexión. Verifica tu red e intenta nuevamente.');
    } finally {
      setEnviando(false);
    }
  };

  if (exito) {
    return (
      <div className="form-exito" role="alert" aria-live="polite">
        <span className="form-exito-icon" aria-hidden="true">✅</span>
        <h3 className="form-exito-titulo">¡Solicitud enviada con éxito!</h3>
        <p>{exito.mensaje}</p>
        <p className="form-exito-id">Número de radicado: <strong>{exito.id}</strong></p>
        <button className="form-btn-nuevo" onClick={() => setExito(null)}>
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <div className="formulario-wrapper">
      <h2 id="form-heading" className="section-heading">Solicitar información</h2>
      <p className="section-sub">Completa el formulario y te contactamos en máximo 2 días hábiles.</p>

      <form
        id="form-preinscripcion"
        className="formulario"
        onSubmit={enviar}
        noValidate
        aria-label="Formulario de solicitud de información"
      >
        {/* Nombre */}
        <div className={`form-group${errores.nombre ? ' has-error' : ''}`}>
          <label htmlFor={id('nombre')} className="form-label">
            Nombre completo <span aria-hidden="true">*</span>
          </label>
          <input
            id={id('nombre')}
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={set('nombre')}
            placeholder="Ej. Ana García López"
            aria-required="true"
            aria-describedby={errores.nombre ? id('nombre-err') : undefined}
            aria-invalid={!!errores.nombre}
            autoComplete="name"
            className="form-input"
          />
          {errores.nombre && (
            <p id={id('nombre-err')} className="form-error" role="alert">{errores.nombre}</p>
          )}
        </div>

        {/* Correo */}
        <div className={`form-group${errores.correo ? ' has-error' : ''}`}>
          <label htmlFor={id('correo')} className="form-label">
            Correo electrónico <span aria-hidden="true">*</span>
          </label>
          <input
            id={id('correo')}
            type="email"
            name="correo"
            value={form.correo}
            onChange={set('correo')}
            placeholder="tucorreo@ejemplo.com"
            aria-required="true"
            aria-describedby={errores.correo ? id('correo-err') : undefined}
            aria-invalid={!!errores.correo}
            autoComplete="email"
            className="form-input"
          />
          {errores.correo && (
            <p id={id('correo-err')} className="form-error" role="alert">{errores.correo}</p>
          )}
        </div>

        {/* Teléfono */}
        <div className="form-group">
          <label htmlFor={id('telefono')} className="form-label">Teléfono / celular</label>
          <input
            id={id('telefono')}
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={set('telefono')}
            placeholder="3001234567 (opcional)"
            autoComplete="tel"
            className="form-input"
          />
        </div>

        {/* Programa */}
        <div className={`form-group${errores.programaInteres ? ' has-error' : ''}`}>
          <label htmlFor={id('programaInteres')} className="form-label">
            Programa de interés <span aria-hidden="true">*</span>
          </label>
          <select
            id={id('programaInteres')}
            name="programaInteres"
            value={form.programaInteres}
            onChange={set('programaInteres')}
            aria-required="true"
            aria-describedby={errores.programaInteres ? id('prog-err') : undefined}
            aria-invalid={!!errores.programaInteres}
            className="form-select"
          >
            {PROGRAMAS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          {errores.programaInteres && (
            <p id={id('prog-err')} className="form-error" role="alert">{errores.programaInteres}</p>
          )}
        </div>

        {/* Mensaje */}
        <div className="form-group form-group-full">
          <label htmlFor={id('mensaje')} className="form-label">¿Tienes alguna pregunta? (opcional)</label>
          <textarea
            id={id('mensaje')}
            name="mensaje"
            value={form.mensaje}
            onChange={set('mensaje')}
            rows={4}
            placeholder="Escribe aquí tu pregunta o comentario…"
            className="form-textarea"
          />
        </div>

        {/* Autorización */}
        <div className={`form-group form-group-full form-group-check${errores.autorizaDatos ? ' has-error' : ''}`}>
          <label className="form-check-label" htmlFor={id('autorizaDatos')}>
            <input
              id={id('autorizaDatos')}
              type="checkbox"
              name="autorizaDatos"
              checked={form.autorizaDatos}
              onChange={set('autorizaDatos')}
              aria-required="true"
              aria-describedby={errores.autorizaDatos ? id('auth-err') : undefined}
              aria-invalid={!!errores.autorizaDatos}
              className="form-checkbox"
            />
            <span>
              Autorizo el tratamiento de mis datos personales conforme a la{' '}
              <a
                href="https://www.unisangil.edu.co"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidad de UNISANGIL
              </a>{' '}
              (Ley 1581/2012). <span aria-hidden="true">*</span>
            </span>
          </label>
          {errores.autorizaDatos && (
            <p id={id('auth-err')} className="form-error" role="alert">{errores.autorizaDatos}</p>
          )}
        </div>

        {/* Error de envío */}
        {errorEnvio && (
          <div className="form-group form-group-full">
            <p className="form-error-envio" role="alert">{errorEnvio}</p>
          </div>
        )}

        <div className="form-group form-group-full">
          <button
            type="submit"
            id="btn-submit-solicitud"
            className="form-submit"
            aria-label="Enviar solicitud de información"
            disabled={enviando}
          >
            {enviando ? 'Enviando…' : 'Enviar solicitud'}
          </button>
        </div>
      </form>
    </div>
  );
}
