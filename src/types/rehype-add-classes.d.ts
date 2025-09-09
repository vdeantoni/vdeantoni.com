declare module 'rehype-add-classes' {
  interface ClassMap {
    [selector: string]: string;
  }
  
  function rehypeAddClasses(classes: ClassMap): any;
  export = rehypeAddClasses;
}