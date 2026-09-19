/// <reference types="vite/client" />

declare namespace google {
  namespace maps {
    namespace places {
      class Autocomplete {
        constructor(input: HTMLInputElement, opts?: { types?: string[] });
        addListener(event: string, callback: () => void): void;
        getPlace(): PlaceResult | null;
      }
      interface AddressComponent {
        long_name: string;
        short_name: string;
        types: string[];
      }
      interface PlaceResult {
        address_components?: AddressComponent[];
        geometry?: {
          location?: {
            lat(): number;
            lng(): number;
          };
        };
        url?: string;
        name?: string;
      }
    }
  }
}
