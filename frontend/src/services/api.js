// Módulo de acceso a la API del backend
const API_BASE = '/api';

async function fetchJSON(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`Error ${res.status} al obtener ${path}`);
  return res.json();
}

export const api = {
  /** CA1: ficha con SNIES, duración, créditos, costo, vigencia */
  getFicha: () => fetchJSON('/programa/ficha'),
  /** RF-04, RF-05: plan de estudios por semestre */
  getPlan: () => fetchJSON('/programa/plan'),
  /** RF-06: datos de admisión */
  getAdmision: () => fetchJSON('/admision'),
  /** RF-10: contacto */
  getContacto: () => fetchJSON('/contacto'),
  /** RF-07: solicitud de información */
  postSolicitud: (data) =>
    fetch(`${API_BASE}/contacto/solicitud`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
};
