// Generador 3D fotorrealista (PBR Normal-Mapped + Ray-Stepped Soft Shadows) de una Máscara Veneciana
// de Porcelana y Pan de Oro Champagne (Kintsugi), con proporciones femeninas clásicas de galería.
import { createCanvas } from "@napi-rs/canvas";

const W = 560, H = 680;

function clamp(v, a = 0, b = 1) { return v < a ? a : v > b ? b : v; }
function smoothstep(e0, e1, x) { const t = clamp((x - e0) / (e1 - e0)); return t * t * (3 - 2 * t); }
function mix(a, b, t) { return a + (b - a) * t; }
function gauss(x, s) { const q = x / s; return Math.exp(-q * q); }
function gauss2(x, y, sx, sy) { const qx = x / sx, qy = y / sy; return Math.exp(-(qx * qx + qy * qy)); }

function hash2(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}
function noise2(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy), b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1), d = hash2(ix + 1, iy + 1);
  return mix(mix(a, b, ux), mix(c, d, ux), uy);
}
function fbm(x, y, oct = 4) {
  let v = 0, amp = 0.5, f = 1;
  for (let i = 0; i < oct; i++) {
    v += amp * noise2(x * f, y * f);
    f *= 2.02;
    amp *= 0.5;
  }
  return v;
}

// Geometría 3D C^2 continua con proporciones femeninas clásicas (canon griego/veneciano)
function maskSculpt(u, v) {
  const au = Math.abs(u);

  // Silueta ovalada femenina armónica:
  // Parte superior redondeada (cráneo/frente), pómulos suaves y mandíbula delicada hacia el mentón
  const ry = 0.76;
  const vy = v / ry;
  if (Math.abs(vy) >= 1.05) return { h: 0, sil: 0, eyeHole: 0, eyeRim: 0, ornament: 0, ell: 2 };

  // Ancho horizontal que se estrecha suavemente desde las sienes hacia la barbilla sin protuberancias artificiales
  const jawCurve = vy > -0.15
    ? 1.0 - 0.31 * Math.pow(clamp((vy + 0.15) / 1.15), 1.65)
    : 1.0 - 0.04 * Math.pow(clamp((-0.15 - vy) / 0.85), 2.0);
  const softCheek = 0.016 * gauss(vy - 0.04, 0.28);
  const rx = 0.61 * jawCurve + softCheek;

  const ell = (u * u) / (rx * rx) + (vy * vy);
  const sil = 1 - smoothstep(0.93, 1.00, ell);
  if (sil <= 0) return { h: 0, sil: 0, eyeHole: 0, eyeRim: 0, ornament: 0, ell: 2 };

  // Cúpula tridimensional base de la máscara
  const dome = Math.sqrt(Math.max(0.0001, 1 - clamp(ell * 0.96, 0, 0.9999)));
  let h = dome * 0.74;

  // 1. Frente serena y redondeada
  h += 0.085 * gauss2(u, v + 0.36, 0.42, 0.25);

  // 2. Cuencas oculares profundas (sombra natural bajo la ceja)
  const ex = 0.225, ey = -0.085;
  const socket = gauss2(au - ex, v - ey, 0.165, 0.105);
  h -= 0.155 * socket;

  // 3. Arco superciliar (ceja femenina arqueada y limpia que fluye hacia el tabique nasal)
  const browArchY = -0.192 - 0.028 * Math.sin(clamp((au - 0.04) / 0.34) * Math.PI);
  const brow = gauss(v - browArchY, 0.026) * gauss(au - 0.22, 0.165);
  h += 0.072 * brow;

  // 4. Ojos almendrados recortados en la porcelana con bisel en relieve
  const dxE = (au - ex) / 0.122;
  const eyeTilt = -0.09 * (au - ex);
  const dyE = v - (ey + eyeTilt);
  const almondEnv = Math.cos(clamp(dxE, -1, 1) * Math.PI * 0.5);

  // Volumen de los párpados superior e inferior alrededor del recorte
  h += 0.068 * gauss2(au - ex, dyE, 0.13, 0.062);
  // Pliegue tarsal del párpado superior
  const foldY = ey + eyeTilt - 0.048 * almondEnv - 0.010;
  h -= 0.028 * gauss(v - foldY, 0.012) * gauss(au - ex, 0.115);

  // Métrica almendrada exacta para el hueco ocular de la máscara
  const almondMetric = Math.hypot(dxE, dyE / Math.max(0.011, 0.042 * (0.30 + 0.70 * almondEnv)));
  const eyeHole = 1 - smoothstep(0.74, 0.92, almondMetric);
  const eyeRim = gauss(almondMetric - 0.96, 0.14) * gauss(au - ex, 0.155);
  // Bisel de oro en relieve alrededor del ojo
  h += 0.028 * eyeRim;
  // Caída interna del borde de porcelana
  h -= 0.095 * smoothstep(0.65, 0.95, 1 - almondMetric);

  // 5. Pómulos escultóricos y suave caída hacia las mejillas
  h += 0.105 * gauss2(au - 0.31, v - 0.05, 0.17, 0.15);
  h -= 0.038 * gauss2(au - 0.29, v - 0.26, 0.15, 0.13);

  // 6. Nariz clásica refinada (tabique estrecho, punta delicada, aletas naturales)
  const noseProfile = smoothstep(-0.22, -0.10, v) * (1 - smoothstep(0.14, 0.20, v));
  const bridgeW = mix(0.042, 0.062, clamp((v + 0.18) / 0.34));
  const bridgeH = mix(0.11, 0.21, clamp((v + 0.20) / 0.35));
  h += bridgeH * gauss(u, bridgeW) * noseProfile;

  // Punta de la nariz y aletas
  h += 0.142 * gauss2(u, v - 0.138, 0.066, 0.056);
  h += 0.064 * gauss2(au - 0.066, v - 0.158, 0.038, 0.034);
  h -= 0.052 * gauss2(au - 0.044, v - 0.182, 0.022, 0.015);

  // 7. Surco nasolabial (philtrum)
  h -= 0.022 * gauss2(u, v - 0.238, 0.026, 0.038);
  h += 0.015 * gauss2(au - 0.028, v - 0.238, 0.013, 0.038);

  // 8. Labios femeninos esculpidos en porcelana (arco de Cupido definido y comisuras suaves)
  const lipEnv = gauss(u, 0.165);
  const cupidsBow = -0.015 * gauss(u, 0.028) + 0.013 * gauss(au - 0.042, 0.025);
  const upperLipY = 0.308 - cupidsBow + 0.048 * (u * u);
  const lowerLipY = 0.362 - 0.024 * (u * u);
  const partLineY = 0.334 + 0.016 * (u * u);

  const upperLip = gauss(v - upperLipY, 0.022) * gauss(u, 0.145);
  const lowerLip = gauss(v - lowerLipY, 0.030) * gauss(u, 0.128);
  const lipPart = gauss(v - partLineY, 0.0068) * gauss(u, 0.138);
  const cornerIndent = gauss2(au - 0.152, v - 0.342, 0.025, 0.022);

  h += (0.074 * upperLip + 0.090 * lowerLip - 0.062 * lipPart) * lipEnv - 0.025 * cornerIndent;

  // 9. Mentón suave
  h -= 0.032 * gauss2(u, v - 0.418, 0.10, 0.030);
  h += 0.064 * gauss2(u, v - 0.515, 0.135, 0.088);

  // 10. Moldura biselada en todo el perímetro de la máscara
  const rimMold = gauss(ell - 0.88, 0.042);
  h += 0.018 * rimMold;

  return { h: h * sil, sil, eyeHole, eyeRim: clamp(eyeRim + rimMold * 0.85), ornament: 0, ell };
}

export function crackOffsetX(v) {
  return (
    0.016 * Math.sin(v * 7.2 + 0.35) +
    0.009 * Math.cos(v * 15.5 - 0.7) +
    0.004 * Math.sin(v * 28.0 + 1.1)
  );
}

let CACHE = null;

export function obtenerRecursosMascara() {
  if (CACHE) return CACHE;

  const hMap = new Float32Array(W * H);
  const silMap = new Float32Array(W * H);
  const eyeHoleMap = new Float32Array(W * H);
  const eyeRimMap = new Float32Array(W * H);
  const ornMap = new Float32Array(W * H);
  const ellMap = new Float32Array(W * H);

  for (let y = 0; y < H; y++) {
    const v = (y / (H - 1)) * 2 - 1;
    for (let x = 0; x < W; x++) {
      const u = (x / (W - 1)) * 2 - 1;
      const idx = y * W + x;
      const r = maskSculpt(u, v);
      hMap[idx] = r.h;
      silMap[idx] = r.sil;
      eyeHoleMap[idx] = r.eyeHole;
      eyeRimMap[idx] = r.eyeRim;
      ornMap[idx] = r.ornament;
      ellMap[idx] = r.ell;
    }
  }

  const rostroCanvas = createCanvas(W, H);
  const rCtx = rostroCanvas.getContext("2d");
  const rImg = rCtx.createImageData(W, H);
  const rData = rImg.data;

  const mascIzqCanvas = createCanvas(W, H);
  const mICtx = mascIzqCanvas.getContext("2d");
  const mIImg = mICtx.createImageData(W, H);
  const mIData = mIImg.data;

  const mascDerCanvas = createCanvas(W, H);
  const mDCtx = mascDerCanvas.getContext("2d");
  const mDImg = mDCtx.createImageData(W, H);
  const mDData = mDImg.data;

  // Iluminación dramática de estudio (paleta www.hectorhugo.mx)
  const L1x = -0.44, L1y = -0.44, L1z = 0.783;
  const L2x = 0.68, L2y = -0.16, L2z = 0.715;
  const L3x = 0.06, L3y = 0.65, L3z = 0.757;

  const eps = 2.0 / W;

  for (let y = 2; y < H - 2; y++) {
    const v = (y / (H - 1)) * 2 - 1;
    const crackU = crackOffsetX(v);

    for (let x = 2; x < W - 2; x++) {
      const u = (x / (W - 1)) * 2 - 1;
      const au = Math.abs(u);
      const idx = y * W + x;
      const sil = silMap[idx];
      if (sil <= 0.001) continue;

      const pIdx = idx * 4;
      const h = hMap[idx];
      const eyeHole = eyeHoleMap[idx];
      const eyeRim = eyeRimMap[idx];
      const ornament = ornMap[idx];
      const ell = ellMap[idx];

      const dhdu = (hMap[idx + 1] - hMap[idx - 1]) / (2 * eps);
      const dhdv = (hMap[idx + W] - hMap[idx - W]) / (2 * eps);
      const invLen = 1 / Math.hypot(-dhdu, -dhdv, 1);
      const nx = -dhdu * invLen;
      const ny = -dhdv * invLen;
      const nz = invLen;

      // Oclusión ambiental (AO) en cuencas, fosas nasales y comisuras
      const lap = (hMap[idx + 2] + hMap[idx - 2] + hMap[idx + W * 2] + hMap[idx - W * 2] - 4 * h) * 20;
      const ao = clamp(1.0 + Math.min(0, lap) * 0.9, 0.32, 1.0);

      // Sombra proyectada suave (ray-march hacia L1)
      let shadow = 1.0;
      for (let s = 1; s <= 6; s++) {
        const sx = Math.round(x - s * 4.5);
        const sy = Math.round(y - s * 4.5);
        if (sx >= 0 && sx < W && sy >= 0 && sy < H) {
          const sh = hMap[sy * W + sx] - (h + s * 0.016);
          if (sh > 0) shadow -= clamp(sh * 4.4, 0, 0.15);
        }
      }
      shadow = clamp(shadow, 0.28, 1.0);

      const ndotl1 = Math.max(0, nx * L1x + ny * L1y + nz * L1z) * shadow;
      const ndotl2 = Math.max(0, nx * L2x + ny * L2y + nz * L2z);
      const ndotl3 = Math.max(0, nx * L3x + ny * L3y + nz * L3z);

      const H1x = L1x, H1y = L1y, H1z = L1z + 1;
      const H1len = Math.hypot(H1x, H1y, H1z);
      const ndoth1 = Math.max(0, (nx * H1x + ny * H1y + nz * H1z) / H1len);
      const specCoat = Math.pow(ndoth1, 72) * shadow;
      const specBroad = Math.pow(ndoth1, 18) * shadow;

      const H2x = L2x, H2y = L2y, H2z = L2z + 1;
      const H2len = Math.hypot(H2x, H2y, H2z);
      const specRim = Math.pow(Math.max(0, (nx * H2x + ny * H2y + nz * H2z) / H2len), 32);

      const fresnel = Math.pow(1 - Math.max(0, nz), 3.4);

      // 1) ROSTRO INTERIOR CAVIDAD Y ESENCIA (Sombra profunda aubergine en los ojos + núcleo radiante en el centro al abrirse)
      const centerGlow = Math.exp(-Math.pow(u / 0.24, 2) - Math.pow((v - 0.02) / 0.42, 2));
      const sss = Math.pow(clamp(ndotl1 * 0.6 + 0.4), 1.2) * ao;
      // En las cuencas de los ojos, sombra aterciopelada #1A0F2E con reflejo cálido #E8B57A en el centro
      const socketDark = 1 - eyeHole * 0.78;
      const eR = (mix(26, 232, sss * 0.75) + centerGlow * 85 + specBroad * 55) * socketDark + eyeHole * 28;
      const eG = (mix(15, 181, sss * 0.75) + centerGlow * 62 + specBroad * 42) * socketDark + eyeHole * 16;
      const eB = (mix(46, 122, sss * 0.75) + centerGlow * 35 + specBroad * 25) * socketDark + eyeHole * 44;

      rData[pIdx] = clamp(eR, 0, 255);
      rData[pIdx + 1] = clamp(eG, 0, 255);
      rData[pIdx + 2] = clamp(eB, 0, 255);
      rData[pIdx + 3] = clamp(sil * 255, 0, 255);

      // 2) MÁSCARA DE PORCELANA VENECIANA Y KINTSUGI CHAMPAGNE
      const maskAlpha = sil * (1 - eyeHole);
      if (maskAlpha > 0.005) {
        const microGrain = (noise2(u * 110, v * 110) - 0.5) * 3.0;
        // Vetas kintsugi orgánicas
        const vField = Math.sin(u * 7.5 - v * 8.5 + fbm(u * 4.2, v * 4.2, 4) * 4.5);
        const kintsugi = Math.pow(clamp(1 - Math.abs(vField) * 6.5), 4.5);
        // Pequeñas grietas secundarias que nacen de las cuencas oculares
        const vField2 = Math.cos(u * 14 + v * 11 + fbm(u * 6, v * 6, 3) * 3.5);
        const fineCrack = Math.pow(clamp(1 - Math.abs(vField2) * 8.0), 5.0) * gauss2(au - 0.22, v + 0.05, 0.25, 0.25);

        const diff = clamp(ndotl1 * 0.84 + 0.16) * ao;

        // Porcelana marfil/crema (#FAF6F0 / #F4EDE4) con sombras de estudio en berenjena/violeta (#2A1B45 / #4F2D7F)
        let mR = mix(38, 248, diff) + ndotl2 * 46 + ndotl3 * 24 + microGrain;
        let mG = mix(24, 239, diff) + ndotl2 * 34 + ndotl3 * 16 + microGrain;
        let mB = mix(64, 230, diff) + ndotl2 * 62 + ndotl3 * 14 + microGrain;

        // Pigmento coral/rosa empolvado en labios y mejillas (--coral #E89B8C)
        const cheekBlush = gauss2(au - 0.30, v - 0.05, 0.15, 0.13) * 0.20;
        const lipPigment = gauss2(u, v - 0.335, 0.135, 0.038) * 0.52;
        const coralMix = clamp(cheekBlush + lipPigment);
        mR = mix(mR, 232 * (0.40 + 0.60 * diff), coralMix);
        mG = mix(mG, 142 * (0.40 + 0.60 * diff), coralMix);
        mB = mix(mB, 132 * (0.40 + 0.60 * diff), coralMix);

        // Pan de oro Champagne (#E8B57A / #F0CDA0 / #C99355) en:
        // - Reborde biselado de los ojos y perímetro (eyeRim)
        // - Vetas de kintsugi (kintsugi)
        // - Arabescos en relieve (ornament)
        const browGold = gauss(v - (-0.195 - 0.028 * Math.sin(clamp((au - 0.04) / 0.34) * Math.PI)), 0.007) * gauss(au - 0.22, 0.145);
        const goldAmt = clamp(eyeRim * 0.90 + kintsugi * 0.92 + ornament * 0.85 + browGold * 0.82 + fineCrack * 0.65);

        const gR = mix(152, 246, diff) + specCoat * 120 + specBroad * 52;
        const gG = mix(106, 196, diff) + specCoat * 96 + specBroad * 38;
        const gB = mix(52, 132, diff) + specCoat * 58 + specBroad * 18;

        mR = mix(mR, gR, goldAmt);
        mG = mix(mG, gG, goldAmt);
        mB = mix(mB, gB, goldAmt);

        // Esmalte cerámico de alto brillo (specular coat + rim light lavanda #D9C7E8)
        const glaze = specCoat * 125 + specBroad * 26;
        mR += glaze + (fresnel * 44 + specRim * 36) * 0.85;
        mG += glaze * 0.97 + (fresnel * 35 + specRim * 30) * 0.85;
        mB += glaze * 0.94 + (fresnel * 62 + specRim * 50) * 0.85;

        // Sombra de grosor 3D en el corte interior de los ojos
        const cutShadow = gauss(eyeHole - 0.35, 0.28);
        mR *= 1 - cutShadow * 0.42;
        mG *= 1 - cutShadow * 0.45;
        mB *= 1 - cutShadow * 0.38;

        const distCrack = u - crackU;
        const fractureBevel = Math.exp(-Math.pow(distCrack / 0.015, 2));
        const fR = mix(mR, 242, fractureBevel * 0.72);
        const fG = mix(mG, 188, fractureBevel * 0.72);
        const fB = mix(mB, 138, fractureBevel * 0.72);

        if (distCrack <= 0.013) {
          const edgeA = 1 - smoothstep(-0.004, 0.009, distCrack);
          mIData[pIdx] = clamp(fR, 0, 255);
          mIData[pIdx + 1] = clamp(fG, 0, 255);
          mIData[pIdx + 2] = clamp(fB, 0, 255);
          mIData[pIdx + 3] = clamp(maskAlpha * edgeA * 255, 0, 255);
        }

        if (distCrack >= -0.013) {
          const edgeA = smoothstep(-0.009, 0.004, distCrack);
          mDData[pIdx] = clamp(fR, 0, 255);
          mDData[pIdx + 1] = clamp(fG, 0, 255);
          mDData[pIdx + 2] = clamp(fB, 0, 255);
          mDData[pIdx + 3] = clamp(maskAlpha * edgeA * 255, 0, 255);
        }
      }
    }
  }

  rCtx.putImageData(rImg, 0, 0);
  mICtx.putImageData(mIImg, 0, 0);
  mDCtx.putImageData(mDImg, 0, 0);

  CACHE = { W, H, rostroCanvas, mascIzqCanvas, mascDerCanvas };
  return CACHE;
}
