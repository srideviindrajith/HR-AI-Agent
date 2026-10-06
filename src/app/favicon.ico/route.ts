const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#2d2a26"/><path d="m34 9-5 18-17 5 17 5 5 18 5-18 17-5-17-5-5-18Z" fill="#d97d54"/></svg>`;

export const dynamic = 'force-static';

export function GET() {
  return new Response(favicon, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}