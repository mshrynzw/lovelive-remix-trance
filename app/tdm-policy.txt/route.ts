import { tdmPolicyTxt } from "@/lib/llm-content";

export const dynamic = "force-static";

export function GET() {
  return new Response(tdmPolicyTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
