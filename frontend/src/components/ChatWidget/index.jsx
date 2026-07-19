/**
 * ChatWidget — Asistente de admisiones flotante
 * Esquina inferior derecha, colores y tipografía de tokens.css
 */
import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';

const PREGUNTAS_RAPIDAS = [
  '¿Cuáles son los requisitos para inscribirme?',
  '¿Cuánto cuesta el semestre?',
  '¿Qué materias se ven en el programa?',
  '¿Puedo homologar materias de otra universidad?',
  '¿Cuáles son los horarios y dónde queda la sede?',
];

const API_URL = '/api/asistente';

export default function ChatWidget() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([
    {
      rol: 'asistente',
      texto:
        '¡Hola! Soy el asistente de admisiones de Ingeniería de Sistemas — UNISANGIL Yopal. ¿En qué puedo ayudarte?',
      fuentes: [],
    },
  ]);
  const [inputValor, setInputValor] = useState('');
  const [cargando, setCargando] = useState(false);
  const [chipsVisibles, setChipsVisibles] = useState(true);
  const mensajesEndRef = useRef(null);
  const inputRef = useRef(null);

  /* Scroll automático al último mensaje */
  useEffect(() => {
    if (abierto) {
      mensajesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mensajes, abierto]);

  /* Foco en input al abrir */
  useEffect(() => {
    if (abierto) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [abierto]);

  async function enviarPregunta(pregunta) {
    const preguntaLimpia = pregunta.trim();
    if (!preguntaLimpia || cargando) return;

    setChipsVisibles(false);
    setMensajes(prev => [
      ...prev,
      { rol: 'usuario', texto: preguntaLimpia, fuentes: [] },
    ]);
    setInputValor('');
    setCargando(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta: preguntaLimpia }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error del servidor');
      }

      setMensajes(prev => [
        ...prev,
        {
          rol: 'asistente',
          texto: data.respuesta,
          fuentes: data.fuentes || [],
        },
      ]);
    } catch (err) {
      setMensajes(prev => [
        ...prev,
        {
          rol: 'asistente',
          texto:
            'Lo siento, no pude procesar tu pregunta en este momento. Por favor escribe a admisionesyopal@unisangil.edu.co',
          fuentes: [],
        },
      ]);
    } finally {
      setCargando(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  function manejarEnvio(e) {
    e.preventDefault();
    enviarPregunta(inputValor);
  }

  function manejarChip(pregunta) {
    enviarPregunta(pregunta);
  }

  function reiniciarChat() {
    setMensajes([
      {
        rol: 'asistente',
        texto:
          '¡Hola! Soy el asistente de admisiones de Ingeniería de Sistemas — UNISANGIL Yopal. ¿En qué puedo ayudarte?',
        fuentes: [],
      },
    ]);
    setChipsVisibles(true);
    setInputValor('');
    setCargando(false);
  }

  return (
    <div className="chat-widget" aria-label="Asistente de admisiones">
      {/* ── Panel de chat ─────────────────────────────────── */}
      <div
        className={`chat-panel${abierto ? ' chat-panel--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Chat con el asistente de admisiones"
      >
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" fill="currentColor" opacity="0.9" />
                <path
                  d="M4 20c0-4 3.582-7 8-7s8 3 8 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p className="chat-header-title">Asistente UNISANGIL</p>
              <p className="chat-header-subtitle">Admisiones · Ing. de Sistemas</p>
            </div>
          </div>
          <div className="chat-header-actions">
            <button
              className="chat-icon-btn"
              onClick={reiniciarChat}
              title="Nueva conversación"
              aria-label="Nueva conversación"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
            <button
              className="chat-icon-btn"
              onClick={() => setAbierto(false)}
              title="Cerrar"
              aria-label="Cerrar asistente"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Área de mensajes */}
        <div className="chat-messages" role="log" aria-live="polite" aria-label="Conversación">
          {mensajes.map((msg, i) => (
            <div key={i} className={`chat-bubble-wrap chat-bubble-wrap--${msg.rol}`}>
              {msg.rol === 'asistente' && (
                <div className="chat-bubble-avatar" aria-hidden="true">U</div>
              )}
              <div className={`chat-bubble chat-bubble--${msg.rol}`}>
                <p className="chat-bubble-text">{msg.texto}</p>
                {msg.fuentes && msg.fuentes.length > 0 && (
                  <p className="chat-bubble-source" aria-label={`Fuente: ${msg.fuentes.join(', ')}`}>
                    📄 {msg.fuentes.join(' · ')}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Indicador de carga */}
          {cargando && (
            <div className="chat-bubble-wrap chat-bubble-wrap--asistente">
              <div className="chat-bubble-avatar" aria-hidden="true">U</div>
              <div className="chat-bubble chat-bubble--asistente chat-bubble--typing" aria-label="El asistente está escribiendo">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}

          <div ref={mensajesEndRef} />
        </div>

        {/* Chips de preguntas rápidas */}
        {chipsVisibles && (
          <div className="chat-chips" aria-label="Preguntas frecuentes">
            <p className="chat-chips-label">Preguntas frecuentes:</p>
            <div className="chat-chips-list">
              {PREGUNTAS_RAPIDAS.map((p, i) => (
                <button
                  key={i}
                  className="chat-chip"
                  onClick={() => manejarChip(p)}
                  disabled={cargando}
                  id={`chat-chip-${i}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form className="chat-form" onSubmit={manejarEnvio} noValidate>
          <input
            ref={inputRef}
            id="chat-input"
            className="chat-input"
            type="text"
            value={inputValor}
            onChange={e => setInputValor(e.target.value)}
            placeholder="Escribe tu pregunta..."
            disabled={cargando}
            maxLength={500}
            aria-label="Escribe tu pregunta al asistente"
            autoComplete="off"
          />
          <button
            id="chat-send-btn"
            className="chat-send-btn"
            type="submit"
            disabled={cargando || !inputValor.trim()}
            aria-label="Enviar pregunta"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>

        <p className="chat-disclaimer">
          Respuestas basadas en documentos oficiales del programa · SNIES 7915
        </p>
      </div>

      {/* ── Botón FAB ─────────────────────────────────────── */}
      <button
        id="chat-fab"
        className={`chat-fab${abierto ? ' chat-fab--open' : ''}`}
        onClick={() => setAbierto(v => !v)}
        aria-label={abierto ? 'Cerrar asistente de admisiones' : 'Abrir asistente de admisiones'}
        aria-expanded={abierto}
        title="Asistente de admisiones"
      >
        {/* Icono chat cuando está cerrado */}
        <svg
          className="chat-fab-icon chat-fab-icon--chat"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {/* Icono X cuando está abierto */}
        <svg
          className="chat-fab-icon chat-fab-icon--close"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        {/* Badge animado cuando cerrado */}
        {!abierto && (
          <span className="chat-fab-badge" aria-hidden="true">?</span>
        )}
      </button>
    </div>
  );
}
