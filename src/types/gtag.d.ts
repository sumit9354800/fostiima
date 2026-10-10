export {};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: string,
      targetOrDate: string | Date,
      config?: Record<string, unknown>,
    ) => void;
  }
}