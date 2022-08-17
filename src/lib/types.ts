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
