import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeAddClasses from "rehype-add-classes";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";
import { visit } from "unist-util-visit";

// Custom rehype plugin to handle code blocks properly
function rehypeCodeBlocks() {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre' && node.children[0]?.tagName === 'code') {
        // This is a code block, add classes to pre but let rehype-highlight handle code
        node.properties = {
          ...node.properties,
          className: `${node.properties?.className || ''} bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4`.trim()
        };
        // Let rehype-highlight handle the code element classes
      } else if (node.tagName === 'code' && node.parent?.tagName !== 'pre') {
        // This is inline code, add inline styling
        node.properties = {
          ...node.properties,
          className: 'bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm'
        };
      }
    });
  };
}

export async function markdownToHtml(markdown: string): Promise<string> {
  // Parse frontmatter if it exists
  const { content } = matter(markdown);

  // Process markdown with remark → rehype → html pipeline
  const result = await remark()
    .use(remarkGfm) // GitHub Flavored Markdown support
    .use(remarkToc, { heading: "contents", tight: true })
    .use(remarkRehype, { allowDangerousHtml: true }) // Convert to rehype
    .use(rehypeSlug) // Add IDs to headings
    .use(rehypeHighlight) // Add syntax highlighting
    .use(rehypeAddClasses, {
      // Headers
      h1: "text-3xl font-bold mt-8 mb-6 text-primary",
      h2: "text-2xl font-bold mt-8 mb-6 text-primary", 
      h3: "text-xl font-semibold mt-6 mb-4 text-primary",
      // Paragraphs
      p: "mb-4 leading-relaxed",
      // Links
      a: "text-primary hover:text-primary-hover underline transition-colors duration-200",
      // Lists
      ul: "list-disc list-outside my-4 space-y-2 ml-6",
      ol: "list-decimal list-outside my-4 space-y-2 ml-6",
      li: "mb-2",
      // Horizontal rules
      hr: "border-border my-8",
      // Blockquotes
      blockquote: "border-l-4 border-primary pl-4 italic my-4 text-text opacity-80",
      // Images
      img: "max-w-full h-auto rounded-lg my-4",
      // Tables
      table: "min-w-full border-collapse border border-border my-4",
      th: "border border-border px-4 py-2 bg-background-accent font-semibold",
      td: "border border-border px-4 py-2"
    })
    .use(rehypeCodeBlocks) // Handle code blocks properly
    .use(rehypeStringify, { allowDangerousHtml: true }) // Convert to HTML
    .process(content);

  return result.toString();
}
