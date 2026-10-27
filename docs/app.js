/* ARVI17 · Portfolio interactions · Public data only */
"use strict";

const OWNER = "ARVI17";
const GITHUB = "https://github.com/" + OWNER;
const RAW = "https://raw.githubusercontent.com/" + OWNER + "/";
const PROJECTS = [
  {
    id:"fc",title:"FC Club Lab",
    subtitle:"Asistente local para plantillas y DCP/SBC",
    category:"IA · Automatización",groups:["ia","web"],
    description:"Inventario de cartas, optimización de desafíos, OCR y asistencia local con FastAPI, React, PostgreSQL y Ollama. Proyecto no oficial en desarrollo.",
    tags:["Python","FastAPI","React","Ollama","Docker"],
    repo:"emuladordcp26",
    cover:RAW+"emuladordcp26/main/assets/hero-neon.svg",
    variant:"blue",monogram:"FC",status:"En desarrollo"
  },
  {
    id:"palominito",title:"Asistente Palominito",
    subtitle:"Asistente de orientación educativa",
    category:"Educación · Aplicación local",groups:["educacion","web","ia"],
    description:"Interfaz conversacional que orienta mediante documentos institucionales. Funciona localmente en el navegador, sin necesidad de servidor.",
    tags:["HTML5","JavaScript","CSS3"],
    repo:"Asistente_Palominito_v4_Conversacional",
    cover:RAW+"Asistente_Palominito_v4_Conversacional/main/assets/hero-neon.svg",
    variant:"green",monogram:"IA",status:"Versión 4.0"
  },
  {
    id:"finance",title:"Finance Lab",
    subtitle:"Evaluación de viabilidad financiera",
    category:"Datos · Finanzas",groups:["datos","web"],
    description:"Herramienta web para proyecciones a cinco años, flujo de caja, VPN, TIR, ROI y análisis de sensibilidad.",
    tags:["HTML5","JavaScript","Finanzas"],
    repo:"Herramienta-de-viabilidad-financiera-vers4.0",
    cover:RAW+"Herramienta-de-viabilidad-financiera-vers4.0/main/assets/hero-neon.svg",
    variant:"green",monogram:"FX",status:"Herramienta web"
  },
  {
    id:"saber11",title:"Plataforma académica",
    subtitle:"Backend Saber 11 y gestión documental",
    category:"Educación · APIs",groups:["educacion","web"],
    description:"Servicios para exámenes, intentos, reportes y gestión de archivos con versionado, usando Express, TypeScript y Prisma.",
    tags:["TypeScript","Express","Prisma","PostgreSQL"],
    repo:"examen",cover:null,
    variant:"purple",monogram:"EDU",status:"Backend"
  },
  {
    id:"citamatic",title:"CitaMatic",
    subtitle:"Gestión de citas y comunicaciones",
    category:"Desarrollo web · Gestión",groups:["web"],
    description:"Aplicación de gestión de citas con frontend React, backend Flask, autenticación y soporte para envío de SMS.",
    tags:["Python","Flask","React","PostgreSQL"],
    repo:"KIBA",cover:null,
    variant:"pink",monogram:"CM",status:"Full stack"
  },
  {
    id:"ml",title:"Predicción de fútbol con ML",
    subtitle:"Proyecto educativo de machine learning",
    category:"IA · Datos deportivos",groups:["ia","datos"],
    description:"Hoja de ruta de análisis de datos y modelos de clasificación victoria/empate/derrota, con FastAPI y Docker.",
    tags:["Python","scikit-learn","FastAPI","Docker"],
    repo:"Modelo-de-Machine-Learning-para-predecir-el-resultado-de-un-partido-de-f-tbol-win-draw-loss-",
    cover:null,variant:"orange",monogram:"ML",status:"En desarrollo"
  }
];

const byId = id => document.getElementById(id);
const newEl = (tag, className, content) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content !== undefined) element.textContent = content;
  return element;
};
const normalize = value => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
let selectedFilter = "todos";

function createProjectCard(project) {
  const card = newEl("article","project-card");
  const cover = newEl("div","project-cover variant-"+project.variant);
  const coverLink = newEl("a");
  coverLink.href = GITHUB+"/"+project.repo;
  coverLink.target = "_blank";
  coverLink.rel = "noopener noreferrer";
  coverLink.setAttribute("aria-label","Ver proyecto " + project.title + " en GitHub");
  coverLink.style.cssText = "display:block;width:100%;height:100%;";
  const monogram = () => {
    coverLink.replaceChildren(newEl("div","project-monogram",project.monogram));
    coverLink.firstChild.style.cssText = "display:grid;place-items:center;width:100%;height:100%;";
  };
  if (project.cover) {
    const image = document.createElement("img");
    image.src = project.cover;
    image.alt = "Imagen de portada de " + project.title;
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error",monogram,{once:true});
    coverLink.appendChild(image);
  } else monogram();
  cover.appendChild(coverLink);
  cover.appendChild(newEl("span","cover-overline",project.status));
  card.appendChild(cover);

  const body = newEl("div","project-info");
  body.appendChild(newEl("span","project-category",project.category));
  body.appendChild(newEl("h3","",project.title));
  body.appendChild(newEl("p","",project.description));
  const tags = newEl("div","project-tags");
  project.tags.forEach(tag => tags.appendChild(newEl("span","",tag)));
  body.appendChild(tags);
  const link = newEl("a","project-link","Explorar repositorio ↗");
  link.href = GITHUB+"/"+project.repo;
  link.target = "_blank"; link.rel = "noopener noreferrer";
  body.appendChild(link);
  card.appendChild(body);
  return card;
}

function renderProjects() {
  const query = normalize(byId("project-search").value.trim());
  const filtered = PROJECTS.filter(item => {
    const categoryMatch = selectedFilter === "todos" || item.groups.includes(selectedFilter);
    const searchMatch = normalize([item.title,item.subtitle,item.category,item.description,item.tags.join(" ")].join(" ")).includes(query);
    return categoryMatch && searchMatch;
  });
  const grid = byId("project-grid");
  grid.replaceChildren();
  if (!filtered.length) grid.appendChild(newEl("p","no-results","No encontré proyectos con ese filtro. Prueba con otra tecnología o selecciona «Todos»."));
  else filtered.forEach(project => grid.appendChild(createProjectCard(project)));
  byId("project-count").textContent = filtered.length+" "+(filtered.length===1?"proyecto disponible":"proyectos disponibles")+" · repositorios públicos";
}

function setupFilters() {
  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click",() => {
      selectedFilter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach(item => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      renderProjects();
    });
  });
  byId("project-search").addEventListener("input",renderProjects);
}

function setupTheme() {
  const toggle = byId("theme-toggle");
  let saved = null;
  try { saved = localStorage.getItem("arvi17-theme"); } catch(e) { /* almacenamiento opcional */ }
  const apply = theme => {
    document.body.dataset.theme = theme;
    toggle.setAttribute("aria-label",theme==="dark"?"Cambiar a tema claro":"Cambiar a tema oscuro");
    toggle.setAttribute("title",theme==="dark"?"Cambiar a tema claro":"Cambiar a tema oscuro");
    toggle.querySelector(".theme-glyph").textContent = theme==="dark"?"☀":"☾";
  };
  apply(saved==="light"?"light":"dark");
  toggle.addEventListener("click",() => {
    const next = document.body.dataset.theme==="dark"?"light":"dark";
    apply(next);
    try { localStorage.setItem("arvi17-theme",next); } catch(e) { /* almacenamiento opcional */ }
  });
}

async function githubJSON(path, timeoutMs) {
  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), timeoutMs || 7500);
  try {
    const response = await fetch("https://api.github.com"+path, {
      headers:{"Accept":"application/vnd.github+json"},
      signal:abort.signal
    });
    if (!response.ok) throw new Error("GitHub respondió con " + response.status);
    return await response.json();
  } finally { clearTimeout(timer); }
}

function setStat(name,value,title) {
  const el=document.querySelector('[data-stat="'+name+'"]');
  if (!el) return;
  el.textContent = value;
  if(title) el.title = title;
}

function dateText(date, options) {
  if(!date || Number.isNaN(Date.parse(date))) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-CO",options||{day:"2-digit",month:"short",year:"numeric"}).format(new Date(date));
}

function createActivityItem(repo) {
  const item = newEl("div","activity-item");
  item.appendChild(newEl("span","activity-bullet","↗"));
  const info = newEl("div","activity-info");
  const link = newEl("a","",repo.name);
  link.href = repo.html_url; link.target="_blank"; link.rel="noopener noreferrer";
  info.appendChild(link);
  info.appendChild(newEl("p","",repo.description || "Repositorio público · consulta código y documentación"));
  item.appendChild(info);
  const date = newEl("span","activity-when",dateText(repo.pushed_at,{day:"2-digit",month:"short",year:"numeric"}));
  if(repo.pushed_at) date.title = "Última actualización pública: "+dateText(repo.pushed_at);
  item.appendChild(date);
  return item;
}

function renderActivity(repositories) {
  const list = byId("activity-list");
  list.replaceChildren();
  const items = repositories
    .filter(repo => !repo.archived && repo.name !== OWNER)
    .sort((a,b) => Date.parse(b.pushed_at||0)-Date.parse(a.pushed_at||0))
    .slice(0,4);
  if(!items.length) {
    list.appendChild(newEl("p","muted","No se encontraron actualizaciones públicas para mostrar."));
    return;
  }
  items.forEach(repo => list.appendChild(createActivityItem(repo)));
}

function activityFallback() {
  const list = byId("activity-list"); list.replaceChildren();
  const message=newEl("p","muted","Las fechas no están disponibles temporalmente. Puedes consultar la actividad directamente en GitHub.");
  list.appendChild(message);
  const link=newEl("a","text-link","Ver repositorios en GitHub ↗");
  link.href=GITHUB+"?tab=repositories";link.target="_blank";link.rel="noopener noreferrer";
  list.appendChild(link);
}

async function loadPublicStats() {
  const status = byId("stats-status");
  try {
    const response = await Promise.all([
      githubJSON("/users/"+OWNER,8000),
      githubJSON("/users/"+OWNER+"/repos?per_page=100&type=owner&sort=pushed",8000)
    ]);
    const user = response[0];
    const repos = response[1].filter(item=>!item.private);
    setStat("repos",new Intl.NumberFormat("es-CO").format(user.public_repos),"Cantidad actual de repositorios públicos");
    setStat("stars",new Intl.NumberFormat("es-CO").format(repos.reduce((sum,item)=>sum+(Number(item.stargazers_count)||0),0)),"Total de estrellas recibidas en los repositorios públicos devueltos por GitHub");
    setStat("followers",new Intl.NumberFormat("es-CO").format(user.followers),"Seguidores públicos");
    const pushed = repos.map(item=>item.pushed_at).filter(Boolean).sort().reverse()[0];
    if(pushed) setStat("updated",dateText(pushed,{day:"2-digit",month:"short"}),dateText(pushed));
    status.textContent="Datos públicos en tiempo real de GitHub · No incluyen repositorios privados ni garantizan el total de contribuciones.";
    renderActivity(repos);
    byId("activity-note").textContent="Fechas de última actualización pública de repositorios; no equivalen a un historial exhaustivo de commits.";
  } catch(error) {
    // Fecha fija de revisión: distinguir expresamente datos históricos de datos actuales.
    setStat("repos","12*","Dato verificado el 27 de octubre de 2026, sin actualización en vivo");
    status.textContent="*12 repositorios públicos verificados el 27/10/2026. La API no respondió; las demás métricas se consultan directamente en GitHub.";
    byId("activity-note").textContent="No se pudo actualizar la lista desde la API pública de GitHub. Consulta el perfil para información actual.";
    activityFallback();
  }
}

function setupCopy() {
  const feedback=byId("copy-feedback");
  byId("copy-profile").addEventListener("click",async () => {
    try {
      if(!navigator.clipboard || !navigator.clipboard.writeText) throw new Error("Clipboard API no disponible");
      await navigator.clipboard.writeText(GITHUB);
      feedback.textContent="✓ Enlace copiado al portapapeles";
    } catch(e) {
      feedback.textContent="Enlace: "+GITHUB;
    }
  });
}

setupFilters();
setupTheme();
setupCopy();
renderProjects();
loadPublicStats();