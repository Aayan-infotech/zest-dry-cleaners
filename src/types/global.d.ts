/// <reference types="react" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "place-autocomplete": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        placeholder?: string;
        id?: string;
      };
    }
  }
}

export {};
