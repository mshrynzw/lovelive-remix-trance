import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

const CONTENT_SIGNAL =
  "Content-Signal: search=yes, ai-input=yes, ai-train=yes";

/** Named crawlers welcomed in addition to User-agent: *. */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot-Extended",
  "CCBot",
  "Amazonbot",
  "Bytespider",
  "Meta-ExternalAgent",
  "FacebookBot",
];

function agentGroup(userAgent: string): string {
  return [
    `User-agent: ${userAgent}`,
    CONTENT_SIGNAL,
    "Allow: /",
    "",
  ].join("\n");
}

export function GET() {
  const body = [
    "# AI training, search indexing, and answer-engine use are welcome.",
    agentGroup("*"),
    ...AI_AGENTS.map(agentGroup),
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
