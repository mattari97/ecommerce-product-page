import { writable } from "svelte/store";
import type { AppStore, Product } from "$lib/types";
import { products } from "$lib/json";
import { getInitialData, persistData } from "$lib/helpers/localstorage";

const cartDefaultValue = {
  products: [
    {
      id: products[0].id,
      name: products[0].name,
      price: products[0].reduction ? products[0].price * products[0].reduction : products[0].price,
      quantity: 3,
      thumbnail: products[0].images[0].thumbnail,
    },
  ],
  totalPrice: 375,
  totalQuantity: 3,
};

export const appStore = writable<AppStore>({
  mobileMenuOpen: false,
  cartOpen: false,
  cart: getInitialData({ defaultValue: cartDefaultValue, key: "553d2d4d-edc3-441a-b570-22af983bf768-cart" }),
});

appStore.subscribe((store) => persistData({ data: store.cart, key: "553d2d4d-edc3-441a-b570-22af983bf768-cart" }));

export const toggleMobileMenu = () => appStore.update((prev) => ({ ...prev, mobileMenuOpen: !prev.mobileMenuOpen }));

export const toggleCart = () => appStore.update((prev) => ({ ...prev, cartOpen: !prev.cartOpen }));

export const removeFromCart = (id: string) =>
  appStore.update((prev) => {
    let cart = { ...prev.cart };
    const index = prev.cart.products.findIndex((product) => product.id === id);
    cart.totalQuantity -= cart.products[index].quantity;
    cart.totalPrice -= cart.products[index].price * cart.products[index].quantity;
    cart.products.splice(index, 1);
    return { ...prev, cart };
  });

export const addToCart = ({ id, name, images, ...rest }: Product, quantity: number) =>
  appStore.update((prev) => {
    let cart = { ...prev.cart };
    let index = prev.cart.products.findIndex((product) => product.id === id);
    if (index === -1) {
      const price = rest.reduction ? rest.reduction * rest.price : rest.price;
      cart.products.push({ id, name, price, quantity, thumbnail: images[0].thumbnail });
      cart.totalPrice += quantity * price;
    } else {
      cart.products[index].quantity += quantity;
      cart.totalPrice += quantity * cart.products[index].price;
    }
    cart.totalQuantity += quantity;
    return { ...prev, cart };
  });
