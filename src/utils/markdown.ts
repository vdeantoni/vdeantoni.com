import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import matter from "gray-matter";

export async function markdownToHtml(markdown: string): Promise<string> {
  // Parse frontmatter if it exists
  const { content } = matter(markdown);

  // Process markdown with remark
  const result = await remark()
    .use(remarkGfm) // GitHub Flavored Markdown support
    .use(remarkToc, { heading: "contents", tight: true })
    .use(remarkHtml, {
      sanitize: false, // Allow HTML in markdown
    })
    .process(content);

  let html = result.toString();

  // Add Tailwind classes to the generated HTML
  html = html
    // Headers
    .replace(/<h1>/g, '<h1 class="text-3xl font-bold mt-8 mb-6 text-primary">')
    .replace(/<h2>/g, '<h2 class="text-2xl font-bold mt-8 mb-6 text-primary">')
    .replace(
      /<h3>/g,
      '<h3 class="text-xl font-semibold mt-6 mb-4 text-primary">',
    )

    // Paragraphs
    .replace(/<p>/g, '<p class="mb-4 leading-relaxed">')

    // Links
    .replace(
      /<a href/g,
      '<a class="text-primary hover:text-primary-hover underline transition-colors duration-200" href',
    )

    // Code blocks
    .replace(
      /<pre><code>/g,
      '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">',
    )

    // Inline code
    .replace(
      /<code>/g,
      '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">',
    )

    // Lists
    .replace(/<ul>/g, '<ul class="list-disc list-outside my-4 space-y-2 ml-6">')
    .replace(
      /<ol>/g,
      '<ol class="list-decimal list-outside my-4 space-y-2 ml-6">',
    )
    .replace(/<li>/g, '<li class="mb-2">')

    // Horizontal rules
    .replace(/<hr>/g, '<hr class="border-border my-8">')

    // Blockquotes
    .replace(
      /<blockquote>/g,
      '<blockquote class="border-l-4 border-primary pl-4 italic my-4 text-text opacity-80">',
    )

    // Images
    .replace(/<img/g, '<img class="max-w-full h-auto rounded-lg my-4"')

    // Tables
    .replace(
      /<table>/g,
      '<table class="min-w-full border-collapse border border-border my-4">',
    )
    .replace(
      /<th>/g,
      '<th class="border border-border px-4 py-2 bg-background-accent font-semibold">',
    )
    .replace(/<td>/g, '<td class="border border-border px-4 py-2">');

  return html;
}
