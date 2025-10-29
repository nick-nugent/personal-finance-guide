import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MDXPage, mdxComponents } from "@/components/mdx/MDXPage";
import type { SourceId } from "@/data/sources";
import type { MDXContent } from "mdx/types";

type TopicFrontmatter = {
  title: string;
  lastReviewed: string;
  sources: SourceId[];
  description?: string;
};

type TopicModule = {
  default: MDXContent;
  frontmatter: TopicFrontmatter;
};

type TopicConfig = {
  slug: string;
  description: string;
  load: () => Promise<TopicModule>;
};

const TOPICS: TopicConfig[] = [
  {
    slug: "start-here",
    description: "Get oriented on cash flow, automation, and the priorities every plan should cover first.",
    load: () => import("@/content/start-here.mdx") as Promise<TopicModule>
  },
  {
    slug: "investing-basics",
    description: "Understand the account order, contribution targets, and habits for long-term investing.",
    load: () => import("@/content/investing-basics.mdx") as Promise<TopicModule>
  },
  {
    slug: "debt-basics",
    description: "Learn how to prioritize balances, stay current, and keep momentum while paying down debt.",
    load: () => import("@/content/debt-basics.mdx") as Promise<TopicModule>
  }
];

const TOPIC_MAP = new Map(TOPICS.map((topic) => [topic.slug, topic]));

async function resolveTopic(slug: string) {
  const topic = TOPIC_MAP.get(slug);
  if (!topic) {
    return null;
  }
  const module = await topic.load();
  return { config: topic, module };
}

export async function generateStaticParams() {
  return TOPICS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const result = await resolveTopic(params.slug);
  if (!result) {
    return {};
  }

  const {
    module: {
      frontmatter: { title, description }
    },
    config
  } = result;

  return {
    title: `${title} | Personal Finance Guide`,
    description: description ?? config.description
  };
}

export default async function TopicPage({ params }: { params: { slug: string } }) {
  const result = await resolveTopic(params.slug);

  if (!result) {
    notFound();
  }

  const {
    module: { default: Content, frontmatter }
  } = result;

  return (
    <MDXPage title={frontmatter.title} lastReviewed={frontmatter.lastReviewed} sourceIds={frontmatter.sources}>
      <Content components={mdxComponents} />
    </MDXPage>
  );
}
