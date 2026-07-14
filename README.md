# Portal de Ingeniería de Sistemas — UNISANGIL Yopal

## Estructura del proyecto

```
portal-unisangil-yopal/
├── package.json          # Raíz — concurrently para dev unificado
├── backend/
│   ├── package.json
│   └── src/
│       ├── index.js                    # Servidor Express
│       ├── data/programa.data.js       # Fuente única de verdad (RF-01..RF-10)
│       └── routes/
│           ├── programa.js             # GET /api/programa/ficha  /plan  /semestre/:n
│           ├── admision.js             # GET /api/admision
│           └── contacto.js             # GET /api/contacto · POST /api/contacto/solicitud
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── styles/
        │   ├── tokens.css              # Colores marca, tipografía, espaciado, sombras
        │   └── global.css              # Reset y base global
        ├── services/api.js             # Cliente HTTP (proxy → backend)
        └── components/
            └── FichaTecnica/           # CA1: SNIES, duración, créditos, costo, vigencia
```

## Prerrequisito

**Node.js ≥ 18** debe estar instalado. Descarga desde https://nodejs.org

## Inicio rápido

```bash
# 1. Instalar todas las dependencias (solo la primera vez)
npm run install:all

# 2. Arrancar backend + frontend simultáneamente
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api/health

## Arranque individual

```bash
# Solo backend
npm run dev:backend

# Solo frontend
npm run dev:frontend
```

## Criterio CA1 — verificación

Con ambos servidores corriendo, navega a http://localhost:5173  
La **Ficha Técnica** debe mostrar:

| Campo | Valor esperado |
|-------|---------------|
| SNIES | 7915 |
| Modalidad | Presencial |
| Duración | 8 semestres |
| Créditos totales | 137 |
| Matrícula primer ingreso | $5.924.024 COP |
| Vigencia | 2026 |
| Fuente | Circular REC-2025-003 |

Los botones **"Solicitar información"** e **"Inscribirme"** deben estar accesibles en ≤ 1 clic desde la ficha (CA2).

## Colores de marca (Manual UNISANGIL 2024)

| Color | Hex | Pantone |
|-------|-----|---------|
| Azul institucional | `#154E80` | 301 C |
| Amarillo institucional | `#F1BE2C` | 142 C |
