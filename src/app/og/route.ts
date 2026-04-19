import { renderOpenGraphSvg } from "@/lib/og-image";

export const runtime = "nodejs";
export const dynamic = "force-static";

export function GET() {
  return new Response(renderOpenGraphSvg(), {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=31536000, immutable",
    },
  });
}
