import { NextResponse } from "next/server";

type RawStory = {
  objectID: string;
  title: string | null;
  url: string | null;
  author: string;
  created_at: string;
  points: number;
};

type Story = {
  id: string;
  title: string;
  url: string;
  author: string;
  publishedAt: string;
  points: number;
  summary: string;
};

const HN_ENDPOINT =
  "https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=14&numericFilters=points>80";

export const revalidate = 600;

const summarizeHeadline = (title: string) => {
  const cleaned = title.replace(/\s+/g, " ").trim();
  const lower = cleaned.toLowerCase();

  if (lower.includes("openai") || lower.includes("llm") || lower.includes("model")) {
    return "New AI/LLM development impacting model capabilities and deployment workflows.";
  }
  if (lower.includes("kubernetes") || lower.includes("docker") || lower.includes("cloud")) {
    return "Cloud and infrastructure update with implications for scalability and operations.";
  }
  if (lower.includes("security") || lower.includes("vulnerability") || lower.includes("cve")) {
    return "Security-focused update highlighting risks, fixes, or defensive engineering changes.";
  }
  if (lower.includes("chip") || lower.includes("gpu") || lower.includes("nvidia") || lower.includes("amd")) {
    return "Hardware ecosystem news affecting compute performance and AI workload throughput.";
  }
  if (lower.includes("startup") || lower.includes("funding") || lower.includes("acquire")) {
    return "Business and ecosystem movement shaping product direction and market competition.";
  }

  if (cleaned.length <= 96) {
    return cleaned;
  }

  return `${cleaned.slice(0, 93)}...`;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get("force") === "1";

    const response = await fetch(
      HN_ENDPOINT,
      forceRefresh ? { cache: "no-store" } : { next: { revalidate: 300 } },
    );
    if (!response.ok) {
      return NextResponse.json({ error: "Unable to fetch tech news" }, { status: 500 });
    }

    const data = await response.json();
    const hits: RawStory[] = Array.isArray(data?.hits) ? data.hits : [];

    const stories: Story[] = hits
      .filter((story) => story.title && story.url)
      .slice(0, 8)
      .map((story) => ({
        id: story.objectID,
        title: story.title as string,
        url: story.url as string,
        author: story.author,
        publishedAt: story.created_at,
        points: story.points,
        summary: "",
      }));

    const enriched = stories.map((story, idx) => ({
      ...story,
      summary: summarizeHeadline(story.title),
    }));

    return NextResponse.json(
      {
        source: "Hacker News API",
        summarizedBy: "Local heuristic summarizer (free)",
        lastUpdated: new Date().toISOString(),
        articles: enriched,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ error: "Unexpected error while loading news" }, { status: 500 });
  }
}
