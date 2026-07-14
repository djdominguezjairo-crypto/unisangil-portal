# Especificación funcional

## Portal de Ingeniería de Sistemas — Sede Yopal

**Institución:** UNISANGIL  
**Propósito:** mejorar la información para aspirantes, facilitar su decisión y reducir la fricción hacia la solicitud de información o la inscripción.

## Objetivos medibles

1. Publicar el 100 % de la información crítica para decidir: duración, créditos, costo, admisión, perfil de ingreso, perfil ocupacional y plan vigente.
2. Garantizar que el 100 % de las sesiones pueda acceder a la solicitud de información o inscripción en máximo un clic desde la ficha del programa.
3. Alcanzar conformidad con WCAG 2.1 nivel AA en las pantallas y flujos del portal del programa.

## Trazabilidad de hallazgos

| ID | Hallazgo |
| --- | --- |
| H1 | Inconsistencias entre la página del programa y el PEP en información curricular. |
| H2 | La sección “¿Por qué estudiar?” no desarrolla sus diferenciales. |
| H3 | La ficha no presenta información completa y visible de admisión. |
| H4 | La jerarquía de encabezados es incorrecta. |
| H5 | Existen controles con etiquetas accesibles en inglés en una página en español. |
| H6 | La metadescripción no corresponde al programa. |
| H7 | Los llamados a la acción no anticipan claramente algunos destinos. |
| B1 | UNAB y Unillanos capturan interesados desde la ficha del programa. |
| B2 | Nacional, UNAB y Unillanos presentan el currículo con mayor detalle y contexto. |
| B3 | Nacional y UNAB hacen visibles experiencias, espacios y resultados profesionales. |

## Requisitos funcionales

| ID | Requisito | Trazabilidad |
| --- | --- | --- |
| RF-01 | El portal debe mostrar una ficha única y vigente con título, SNIES, acreditación, modalidad, duración, créditos totales, costos y fecha de vigencia. | H1 |
| RF-02 | El portal debe presentar una sección “¿Por qué estudiar Ingeniería de Sistemas en UNISANGIL Yopal?” con mínimo cinco diferenciales verificables del programa. | H2, B3 |
| RF-03 | El portal debe explicar el perfil del aspirante, perfil del egresado, perfil ocupacional y cargos o sectores posibles. | B2, B3 |
| RF-04 | El portal debe publicar el plan de estudios vigente por semestre, con asignaturas, créditos, total acumulado, requisitos, electivas y modalidad de grado. | H1, B2 |
| RF-05 | El portal debe identificar la versión, fecha de vigencia y documento normativo del plan de estudios, y mantenerlos consistentes con los documentos enlazados. | H1, B2 |
| RF-06 | El portal debe mostrar un módulo de admisión con fechas, requisitos, documentos, pasos, costos asociados, criterios de selección y contacto de admisiones. | H3 |
| RF-07 | El portal debe permitir que un aspirante solicite información desde la ficha, registrando datos de contacto, programa de interés y autorización de tratamiento de datos. | B1 |
| RF-08 | El portal debe informar explícitamente cuando un enlace lleva a inscripción, formulario externo o documento, indicando el tipo de destino y, para documentos, el formato. | H7 |
| RF-09 | El portal debe mostrar evidencia verificable de la experiencia formativa: laboratorios, investigación, semilleros, proyectos, prácticas o aliados, cuando aplique. | B3 |
| RF-10 | El portal debe ofrecer canales de contacto del programa y de admisiones, con responsable, horario de atención y tiempo esperado de respuesta. | H3, B1 |
| RF-11 | El portal debe usar títulos y etiquetas en español, con un único título principal del programa y subsecciones ordenadas jerárquicamente. | H4, H5 |
| RF-12 | El portal debe publicar título y descripción institucionales coherentes con Ingeniería de Sistemas — Yopal para resultados de búsqueda y previsualizaciones. | H6 |

## Requisitos no funcionales

| ID | Requisito |
| --- | --- |
| RNF-01 | La interfaz debe respetar la marca UNISANGIL: identidad visual, tono y uso autorizado de logos, colores e imágenes. |
| RNF-02 | La tipografía principal debe ser Poppins, con tamaños y espaciados legibles. |
| RNF-03 | El portal debe ser responsive y conservar funcionalidad completa en anchos de 320 px, 375 px, 768 px y escritorio. |
| RNF-04 | El portal debe cumplir WCAG 2.1 nivel AA, incluyendo contraste, foco visible, navegación por teclado, etiquetas accesibles, jerarquía semántica y textos alternativos pertinentes. |
| RNF-05 | El contenido académico, económico y de admisión debe indicar vigencia y responsable de actualización. |
| RNF-06 | El lenguaje debe ser español claro, consistente y orientado a aspirantes. |

## Criterios de aceptación

1. Un usuario encuentra duración, créditos, costo, vigencia y SNIES en la ficha; los datos coinciden con el documento curricular enlazado.
2. Desde cualquiera de los anchos definidos, el usuario llega a “Solicitar información” o “Inscribirme” en máximo un clic desde la ficha del programa.
3. El plan muestra ocho semestres con materias y créditos, total de créditos, electivas, requisitos y modalidad de grado; cada dato indica su vigencia.
4. Un aspirante puede identificar requisitos, documentos, fechas y pasos de admisión sin salir de la ficha del programa.
5. Una auditoría WCAG 2.1 AA no reporta fallos de contraste, teclado, foco, encabezados, nombres accesibles o idioma de controles en el flujo principal.

## Fuera de alcance

- Cambiar el plan de estudios, costos, procesos de admisión, acreditación o normativa académica.
- Crear laboratorios, convenios, becas, prácticas, semilleros o contenidos sin evidencia institucional.
- Rediseñar el sitio institucional completo, los portales de otras sedes o el Vortal.
- Definir o implementar tecnologías, integraciones, analítica, automatizaciones o campañas publicitarias.
- Gestionar CRM, pauta o la operación posterior de atención a aspirantes.

