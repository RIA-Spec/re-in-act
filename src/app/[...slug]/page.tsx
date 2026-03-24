import { notFound } from "next/navigation";
import { getDocBySlug, getAllDocSlugs } from "@/lib/mdx";
import { getResolvedNav, findTabForSlug } from "@/lib/navigation";
import { SITE_NAME } from "@/lib/constants";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { mdxComponents } from "@/components/mdx/MdxComponents";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);
  if (!doc) return { title: "Not Found" };
  return {
    title: `${doc.meta.title} — ${SITE_NAME}`,
    description: doc.meta.description,
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
          <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-[var(--code-bg)] prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[var(--foreground)] prose-code:font-mono prose-code:text-[0.875em] prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[var(--pre-bg)] prose-pre:border prose-pre:border-[var(--border)] prose-pre:font-mono">
            {doc.content}
          </article>
        </main>
      </div>
    </div>
  );
}
