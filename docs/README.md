# 🌐 Portafolio web ARVI17

Sitio web estático en español, con diseño **Neon Tech Premium**, navegación adaptable, modo claro/oscuro, catálogo interactivo de proyectos, filtros y búsqueda. Las estadísticas públicas (repositorios, estrellas, seguidores y últimas actualizaciones) se consultan **en el navegador** mediante la API pública de GitHub y muestran mensajes claros si hay limitación de tasa o falta de conectividad.

## Cómo activar GitHub Pages

1. Abre [Settings → Pages](https://github.com/ARVI17/ARVI17/settings/pages) del repositorio \`ARVI17/ARVI17\`.
2. En **Build and deployment → Source**, selecciona **Deploy from a branch**.
3. En **Branch**, selecciona \`main\` y carpeta **\`/docs\`**.
4. Pulsa **Save** y comprueba el estado del despliegue en la misma página de Pages.
5. Una vez publicado, la dirección habitual del proyecto es **https://arvi17.github.io/ARVI17/**. No se considera publicado hasta que GitHub Pages confirme el despliegue y la URL funcione.

> No cambies la fuente a \`/(root)\`: la página principal está en \`docs/index.html\`.

## Estructura

- \`docs/index.html\` — estructura y contenido accesibles.
- \`docs/styles.css\` — diseño responsive, animaciones suaves y tema claro/oscuro.
- \`docs/app.js\` — filtros, búsqueda, estadísticas y actividad pública.
- \`docs/favicon.svg\` — icono local.

## Personalización

Los proyectos se organizan en el arreglo \`PROJECTS\` de \`docs/app.js\`. Edita nombre, descripción, tecnologías y enlaces para actualizar las tarjetas, sin modificar secretos ni conectarte con cuentas privadas.

Las métricas de GitHub muestran únicamente información **pública**. No agregues contraseñas, tokens ni claves de acceso a estos archivos públicos.

## Probar localmente

Puedes abrir \`docs/index.html\` en un navegador moderno. Para probarlo con un servidor local, desde la raíz del repositorio:

\`\`\`bash
python -m http.server 8000 -d docs
\`\`\`

Abre http://localhost:8000. Los datos dinámicos requieren conexión a internet; el resto de la página permanece disponible sin la API.

## Fijar repositorios en tu perfil

GitHub permite fijar hasta 6 elementos en la sección **Pinned** de tu perfil. Pulsa **Customize your pins**, marca los repositorios que quieres destacar y guarda. Esta personalización no se puede ejecutar desde el conector utilizado para preparar este portafolio.
