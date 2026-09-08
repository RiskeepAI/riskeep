import type { NextConfig } from "next";

// CSP con 'unsafe-inline' en script/style: el sitio usa el snippet estático
// de GTM (inline, sin input de usuario) en app/layout.tsx y estilos inline
// (style={{}}) en varios componentes — no hay contenido de usuario que se
// renderice sin escapar en ningún sitio, así que el riesgo real que evita
// una CSP más estricta (con nonces) es marginal frente a la complejidad de
// añadirlos. Lo que sí importa aquí es frame-ancestors (clickjacking),
// connect-src (a qué orígenes puede llamar el JS) y object-src/base-uri.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

// React usa eval() en modo desarrollo para Fast Refresh / reconstruir
// call stacks — nunca en producción (confirmado por su propio mensaje de
// error), así que 'unsafe-eval' solo se permite fuera de production.
const isDev = process.env.NODE_ENV !== "production";

const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ""}https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com",
  `connect-src 'self' ${SUPABASE_URL} https://api.stripe.com https://www.google-analytics.com https://www.googletagmanager.com`,
  "font-src 'self' data:",
  "frame-src 'self' https://js.stripe.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
