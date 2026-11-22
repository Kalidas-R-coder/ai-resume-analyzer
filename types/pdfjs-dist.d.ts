declare module "pdfjs-dist/build/pdf.mjs" {
  export const getDocument: typeof import("pdfjs-dist/types/src/pdf").getDocument;
  export const GlobalWorkerOptions: typeof import("pdfjs-dist/types/src/pdf").GlobalWorkerOptions;
  export * from "pdfjs-dist/types/src/pdf";
}

declare module "pdfjs-dist/build/pdf.worker.min.mjs" {
  // Worker module has no named exports needed at runtime;
  // it's imported only to satisfy Vite bundling.
  export {};
}
