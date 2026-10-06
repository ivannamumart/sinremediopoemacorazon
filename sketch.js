/* =========================================================
   SIN REMEDIO — Paisaje de poemas
   sketch.js : paisaje + palpitación + audio + tinte de color + ambiente p5.js
   ========================================================= */

/* -------- 1. CONFIGURACIÓN DEL PAISAJE -------- */

const ESPACIADO = 820;
const MARGEN_INICIAL = 400;
const MARGEN_FINAL = 500;

const ILUSTRACIONES = [
  { id: "sol",             x: 0,  y: 0.28, tamaño: 520, ritmo: 0.7, giro: 1.2 },
  { id: "recien-nacido",   x: 1,  y: 0.60, tamaño: 480, ritmo: 1.1, giro: 0.6 },
  { id: "espejo",          x: 2,  y: 0.32, tamaño: 540, ritmo: 0.5, giro: 0.8 },
  { id: "mujer-dormida",   x: 3,  y: 0.62, tamaño: 580, ritmo: 0.6, giro: 0.4 },
  { id: "mujer-sombrilla", x: 4,  y: 0.28, tamaño: 500, ritmo: 0.9, giro: 1.0 },
  { id: "partenon",        x: 5,  y: 0.58, tamaño: 600, ritmo: 0.4, giro: 0.3 },
  { id: "monserrate",      x: 6,  y: 0.30, tamaño: 480, ritmo: 0.8, giro: 0.7 },
  { id: "calavera",        x: 7,  y: 0.60, tamaño: 500, ritmo: 0.5, giro: 0.9 },
  { id: "pajaros-hierro",  x: 8,  y: 0.26, tamaño: 560, ritmo: 1.3, giro: 1.5 },
  { id: "bogota",          x: 9,  y: 0.58, tamaño: 620, ritmo: 0.3, giro: 0.2 },
  { id: "ojos-barcos",     x: 10, y: 0.30, tamaño: 520, ritmo: 0.9, giro: 1.1 },
  { id: "pajaro-red",      x: 11, y: 0.60, tamaño: 540, ritmo: 1.0, giro: 1.3 },
  { id: "cuerpo-amado",    x: 12, y: 0.32, tamaño: 520, ritmo: 0.6, giro: 0.5 },
  { id: "mano-corazon",    x: 13, y: 0.60, tamaño: 500, ritmo: 1.2, giro: 1.4 },
  { id: "bolerista",       x: 14, y: 0.30, tamaño: 500, ritmo: 0.8, giro: 1.0 }
];

/* -------- 2. CONSTRUCCIÓN DEL DOM -------- */
function construirPaisaje() {
  const paisaje = document.getElementById("paisaje");

  const lienzo = document.createElement("div");
  lienzo.className = "lienzo";
  const anchoTotal = MARGEN_INICIAL + MARGEN_FINAL + ESPACIADO * (ILUSTRACIONES.length - 1);
  lienzo.style.width = anchoTotal + "px";
  paisaje.appendChild(lienzo);

  ILUSTRACIONES.forEach((cfg) => {
    const nodo = document.createElement("div");
    nodo.className = "ilustracion";
    nodo.dataset.id = cfg.id;

    const px = MARGEN_INICIAL + cfg.x * ESPACIADO;
    nodo.style.left = (px - cfg.tamaño / 2) + "px";
    nodo.style.top  = `calc(${cfg.y * 100}% - ${cfg.tamaño / 2}px)`;
    nodo.style.width  = cfg.tamaño + "px";
    nodo.style.height = cfg.tamaño + "px";

    nodo._faseRitmo = Math.random() * Math.PI * 2;
    nodo._faseGiro  = Math.random() * Math.PI * 2;
    nodo._cfg = cfg;

    const img = document.createElement("img");
    img.src = `images/${cfg.id}.svg`;
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";
    img.draggable = false;
    img.addEventListener("error", () => {
      nodo.style.outline = "2px dashed rgba(0,0,0,0.1)";
      nodo.style.outlineOffset = "4px";
      nodo.innerHTML = `<div style="color:#aaa;font-style:italic;text-align:center;padding:1rem;font-size:0.85rem">
        imagen no encontrada:<br><code>images/${cfg.id}.svg</code>
      </div>`;
    });
    nodo.appendChild(img);

    nodo.addEventListener("mouseenter", () => mostrarPoema(cfg.id, nodo));
    nodo.addEventListener("mouseleave", () => programarCerrarPoema());
    nodo.addEventListener("click",      () => mostrarPoema(cfg.id, nodo));

    lienzo.appendChild(nodo);
  });
}

/* -------- 3. ANIMACIÓN AMBIENTE DE LAS ILUSTRACIONES -------- */
function animarIlustraciones() {
  const nodos = document.querySelectorAll(".ilustracion");
  let t0 = performance.now();

  function tick(now) {
    const t = (now - t0) / 1000;
    nodos.forEach(nodo => {
      const cfg = nodo._cfg;
      const sc = 1 + 0.012 * Math.sin(t * cfg.ritmo + nodo._faseRitmo);
      const rg = cfg.giro * Math.sin(t * 0.35 * cfg.ritmo + nodo._faseGiro);
      const dy = 4 * Math.sin(t * 0.45 * cfg.ritmo + nodo._faseGiro);
      nodo.style.setProperty("transform",
        `translateY(${dy}px) rotate(${rg}deg) scale(${sc})`);
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* -------- 4. OVERLAY DEL POEMA + PALPITACIÓN + TINTE + AUDIO -------- */
const overlay    = document.getElementById("poema-overlay");
const tituloEl   = overlay.querySelector(".poema-titulo");
const autorEl    = overlay.querySelector(".poema-autor");
const datosEl    = overlay.querySelector(".poema-datos");
const textoEl    = overlay.querySelector(".poema-texto");
const contEl     = overlay.querySelector(".poema-contenido");

let nodoActivo = null;
let cerrarTimeout = null;

function escapar(txt) {
  const div = document.createElement("div");
  div.textContent = txt;
  return div.innerHTML;
}

function mostrarPoema(id, nodo) {
  const p = POEMAS[id];
  if (!p) return;

  if (cerrarTimeout) { clearTimeout(cerrarTimeout); cerrarTimeout = null; }

  if (nodoActivo && nodoActivo !== nodo) {
    nodoActivo.classList.remove("activa");
  }
  nodo.classList.add("activa");
  nodoActivo = nodo;

  tituloEl.textContent = p.subtitulo ? `${p.titulo} — ${p.subtitulo}` : p.titulo;
  autorEl.textContent  = p.autor || "";

  datosEl.innerHTML = `
    <span><em>${p.emocion}</em></span>
    <span>${p.numeroVersos} versos</span>
    <span><span class="punto-bpm"></span>${p.bpm} bpm</span>
  `;

  // === RENDER DEL TEXTO POR ESTROFAS ===
  // Cada estrofa es un bloque indivisible (break-inside: avoid).
  // Las columnas se llenan verticalmente y pasan a la siguiente horizontalmente,
  // así los poemas largos muestran todo su contenido.
  const estrofas = p.texto.split(/\n\s*\n/).map(s => s.trim()).filter(s => s);
  textoEl.innerHTML = estrofas
    .map(e => `<div class="estrofa">${escapar(e)}</div>`)
    .join("");

  // Columnas: poemas de 10 versos o menos = 1 sola columna centrada
  const esCorto = p.numeroVersos <= 10;
  contEl.classList.toggle("corto", esCorto);

  // Variables CSS para pulso y color
  const duracionPulso = (60 / p.bpm);
  document.documentElement.style.setProperty("--color-poema", p.color);
  document.documentElement.style.setProperty("--duracion-pulso", duracionPulso + "s");

  textoEl.classList.remove("pulsando");
  void textoEl.offsetWidth;  // reinicia la animación
  textoEl.classList.add("pulsando");

  document.body.classList.add("poema-activo");
  overlay.classList.remove("oculto");

  iniciarLatido(p.bpm);
}

function programarCerrarPoema() {
  if (cerrarTimeout) clearTimeout(cerrarTimeout);
  cerrarTimeout = setTimeout(ocultarPoema, 180);
}

function ocultarPoema() {
  cerrarTimeout = null;
  document.body.classList.remove("poema-activo");
  overlay.classList.add("oculto");
  textoEl.classList.remove("pulsando");
  if (nodoActivo) {
    nodoActivo.classList.remove("activa");
    nodoActivo = null;
  }
  detenerLatido();
}

/* -------- 5. AUDIO: LATIDO SINTETIZADO -------- */

let audioCtx = null;
let latidoInterval = null;
let bpmActual = null;

function initAudio() {
  if (!audioCtx) {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AC();
    } catch (e) {
      console.warn("Web Audio API no disponible en este navegador");
      return false;
    }
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return true;
}

["click", "touchstart", "mousemove", "keydown"].forEach(ev => {
  document.addEventListener(ev, initAudio, { once: true, passive: true });
});

function golpe(frecuencia, volumen, cuando) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filt = audioCtx.createBiquadFilter();

  osc.type = "sine";
  osc.frequency.setValueAtTime(frecuencia * 2, cuando);
  osc.frequency.exponentialRampToValueAtTime(frecuencia, cuando + 0.04);

  filt.type = "lowpass";
  filt.frequency.value = frecuencia * 4;
  filt.Q.value = 2;

  gain.gain.setValueAtTime(0.0001, cuando);
  gain.gain.exponentialRampToValueAtTime(volumen, cuando + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, cuando + 0.14);

  osc.connect(filt);
  filt.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(cuando);
  osc.stop(cuando + 0.2);
}

function tocarLatido() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  const distanciaLubDub = Math.min(0.18, (60 / (bpmActual || 70)) * 0.22);
  golpe(55, 0.22, t);
  golpe(75, 0.17, t + distanciaLubDub);
}

function iniciarLatido(bpm) {
  if (!initAudio()) return;
  detenerLatido();
  bpmActual = bpm;
  const intervaloMs = (60 / bpm) * 1000;
  tocarLatido();
  latidoInterval = setInterval(tocarLatido, intervaloMs);
}

function detenerLatido() {
  if (latidoInterval) {
    clearInterval(latidoInterval);
    latidoInterval = null;
  }
  bpmActual = null;
}

/* -------- 6. UI: SCROLL + BOTONES + TABLA EN SOBRE EL PROYECTO -------- */
function configurarUI() {
  const indicador = document.getElementById("indicador-scroll");
  const paisaje   = document.getElementById("paisaje");

  let yaInteractuó = false;
  paisaje.addEventListener("scroll", () => {
    if (!yaInteractuó && paisaje.scrollLeft > 40) {
      indicador.classList.add("oculto");
      yaInteractuó = true;
    }
  });

  paisaje.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      paisaje.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") paisaje.scrollLeft += 160;
    if (e.key === "ArrowLeft")  paisaje.scrollLeft -= 160;
    if (e.key === "Escape") {
      ocultarPoema();
      document.getElementById("sobre-overlay").classList.add("oculto");
    }
  });

  const btnSobre  = document.getElementById("btn-sobre");
  const sobreOver = document.getElementById("sobre-overlay");
  const cerrarBtn = sobreOver.querySelector(".cerrar");

  btnSobre.addEventListener("click", () => sobreOver.classList.remove("oculto"));
  cerrarBtn.addEventListener("click", () => sobreOver.classList.add("oculto"));
  sobreOver.addEventListener("click", (e) => {
    if (e.target === sobreOver) sobreOver.classList.add("oculto");
  });

  // === CONSTRUIR LA TABLA DINÁMICAMENTE DENTRO DEL "SOBRE EL PROYECTO" ===
  const tabla = document.getElementById("tabla-dinamica");
  if (tabla && typeof POEMAS !== "undefined") {
    const tbody = tabla.querySelector("tbody");
    Object.keys(POEMAS).forEach(id => {
      const p = POEMAS[id];
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="num">${p.orden}</td>
        <td>
          <div class="tbl-titulo">${p.titulo}</div>
          <div class="tbl-autor">${p.autor}</div>
        </td>
        <td class="tbl-cap">${p.capitulo}</td>
        <td class="num">${p.numeroVersos}</td>
        <td class="tbl-emocion">${p.emocion}</td>
        <td>
          <div class="tbl-color">
            <span class="tbl-swatch" style="background:${p.color}"></span>
            <span class="tbl-hex">${p.color}</span>
          </div>
        </td>
        <td class="num tbl-bpm">${p.bpm}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

/* -------- 7. P5.JS: NIEBLA Y TINTA EN EL FONDO -------- */
let nebulas = [];
let trazos  = [];

function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("fondo");
  noStroke();

  for (let i = 0; i < 10; i++) {
    nebulas.push({
      x: random(width),
      y: random(height),
      r: random(200, 360),
      alpha: random(3, 6),
      vx: random(-0.05, 0.05),
      vy: random(-0.025, 0.025),
      offset: random(1000)
    });
  }

  for (let i = 0; i < 3; i++) {
    trazos.push(nuevoTrazo());
  }
}

function nuevoTrazo() {
  return {
    x: random(width),
    y: random(height),
    long: random(80, 220),
    angulo: random(TWO_PI),
    grosor: random(0.4, 1.0),
    vida: 0,
    vidaMax: random(260, 500),
    seed: random(10000)
  };
}

function draw() {
  clear();

  for (let n of nebulas) {
    const dx = noise(n.offset + frameCount * 0.0015) - 0.5;
    const dy = noise(n.offset + 500 + frameCount * 0.0012) - 0.5;
    n.x += n.vx + dx * 0.25;
    n.y += n.vy + dy * 0.18;

    if (n.x < -n.r) n.x = width + n.r;
    if (n.x > width + n.r) n.x = -n.r;
    if (n.y < -n.r) n.y = height + n.r;
    if (n.y > height + n.r) n.y = -n.r;

    for (let k = 3; k >= 1; k--) {
      fill(180, 180, 190, n.alpha * (k / 3));
      ellipse(n.x, n.y, n.r * (k / 3) * 2);
    }
  }

  for (let i = trazos.length - 1; i >= 0; i--) {
    const t = trazos[i];
    t.vida++;

    const frac = t.vida / t.vidaMax;
    const envolvente = Math.sin(frac * Math.PI);
    const alpha = envolvente * 20;

    push();
    translate(t.x, t.y);
    rotate(t.angulo + noise(t.seed + frameCount * 0.002) * 0.6);
    noFill();
    stroke(40, 40, 40, alpha);
    strokeWeight(t.grosor);

    beginShape();
    for (let s = 0; s <= 20; s++) {
      const f = s / 20;
      const px = f * t.long - t.long / 2;
      const py = (noise(t.seed + f * 2) - 0.5) * 16;
      curveVertex(px, py);
    }
    endShape();
    pop();

    if (t.vida >= t.vidaMax) trazos.splice(i, 1);
  }

  if (frameCount % 110 === 0 && trazos.length < 4) {
    trazos.push(nuevoTrazo());
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/* -------- 8. ARRANQUE -------- */
window.addEventListener("DOMContentLoaded", () => {
  construirPaisaje();
  animarIlustraciones();
  configurarUI();
});
