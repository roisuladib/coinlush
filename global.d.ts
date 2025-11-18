export {};

declare global {
  interface Window {
    adsbygoogle: {
      [key: stribg]: unknown;
    }[];
  }
  type Children = {
    children: React.ReactNode;
  };
  type ClassName = {
    className?: string;
  };
}
