import { writable } from "svelte/store";
import type { AppStore } from "$lib/types";
import products from "../../products.json";

export const appStore = writable<AppStore>({
  mobileMenuOpen: false,
  cartOpen: false,
  cart: {
    products: [
      {
        id: products[0].id,
        name: products[0].name,
        price: products[0].price * products[0].reduction,
        quantity: 3,
        thumbnail: products[0].images[0].thumbnail,
      },
    ],
    totalPrice: 375,
    totalQuantity: 3,
  },
});
export const toggleMobileMenu = () => appStore.update((prev) => ({ ...prev, mobileMenuOpen: !prev.mobileMenuOpen }));
export const toggleCart = () => appStore.update((prev) => ({ ...prev, cartOpen: !prev.cartOpen }));
export const removeFromCart = (id: string) =>
  appStore.update((prev) => {
    const products = prev.cart.products.filter((product) => product.id !== id);
    let totalQuantity: number = 0,
      totalPrice: number = 0;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      totalQuantity += product.quantity;
      totalPrice += product.price * product.quantity;
    }
    return { ...prev, cart: { totalPrice, totalQuantity, products } };
  });
