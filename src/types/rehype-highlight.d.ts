declare module 'rehype-highlight' {
  interface HighlightOptions {
    detect?: boolean;
    subset?: string[] | boolean;
    ignoreMissing?: boolean;
    plainText?: string[];
    aliases?: Record<string, string | string[]>;
    languages?: Record<string, any>;
  }
  
  function rehypeHighlight(options?: HighlightOptions): any;
  export = rehypeHighlight;
}