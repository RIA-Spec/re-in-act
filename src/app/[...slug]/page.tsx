import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDocBySlug, getAllDocSlugs } from "@/lib/mdx";
import { getResolvedNav, findTabForSlug } from "@/lib/navigation";
import { OG_IMAGE_ALT, OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { mdxComponents } from "@/components/mdx/MdxComponents";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);
  if (!doc) {
    return {
      title: "Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pathname = `/${slug.join("/")}`;
  const description = doc.meta.description || SITE_DESCRIPTION;
  const activeTab = findTabForSlug(slug.join("/")) || "Documentation";

  return {
    title: {
      absolute: `${doc.meta.title} | ${activeTab} | ${SITE_NAME}`,
    },
    description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: doc.meta.title,
      description,
      url: pathname,
      siteName: SITE_NAME,
      type: "article",
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.meta.title,
      description,
      images: [OG_IMAGE_PATH],
    },
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getDocBySlug(slug, mdxComponents);
  if (!doc) notFound();

  const slugStr = slug.join("/");
  const tabs = getResolvedNav();
  const activeTab = findTabForSlug(slugStr) || tabs[0]?.tab || "Documentation";

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <Header />
      <div className="mx-auto flex max-w-7xl px-6">
        <Sidebar tabs={tabs} activeTab={activeTab} />
        <main className="min-w-0 flex-1 py-10 pl-0 lg:pl-10">
          {/* Page title */}
          <header className="mb-8">
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: "var(--foreground)" }}
            >
              {doc.meta.title}
            </h1>
            {doc.meta.description && (
              <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {doc.meta.description}
              </p>
            )}
          </header>

          {/* MDX content */}
          <article className="prose max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-[var(--foreground)] prose-p:text-[var(--foreground)] prose-p:leading-7 prose-strong:text-[var(--foreground)] prose-li:text-[var(--foreground)] prose-ol:text-[var(--foreground)] prose-ul:text-[var(--foreground)] prose-blockquote:text-[var(--muted)] prose-blockquote:border-l-[var(--border)] prose-hr:border-[var(--border)] prose-th:text-[var(--foreground)] prose-td:text-[var(--foreground)] prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-[var(--code-bg)] prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[var(--foreground)] prose-code:font-mono prose-code:text-[0.875em] prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[var(--pre-bg)] prose-pre:border prose-pre:border-[var(--border)] prose-pre:text-[var(--foreground)] prose-pre:font-mono prose-pre:shadow-none">
            {doc.content}
          </article>
        </main>
      </div>
    </div>
  );
}
