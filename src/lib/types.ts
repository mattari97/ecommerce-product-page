interface ProductImage {
  full: string;
  thumbnail: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  reduction?: number;
  images: ProductImage[];
}

export interface CartProduct extends Pick<Product, "id" | "name"> {
  price: number;
  quantity: number;
  thumbnail: string;
}

export interface AppStore {
  mobileMenuOpen: boolean;
  cartOpen: boolean;
  cart: {
    products: CartProduct[];
    totalQuantity: number;
    totalPrice: number;
  };
}

const localStorageHash = "553d2d4d-edc3-441a-b570-22af983bf768";
const localStorageKeys = [`${localStorageHash}-cart`] as const;
export type LocalStorageKey = typeof localStorageKeys[number];
