import { products } from "$lib/json";
import type { Product } from "$lib/types";

export function getProductById(id: string) {
  let product;
  for (let i = 0; i < products.length; i++) {
    const item = products[i];
    if (item.id !== id) continue;
    product = item;
    break;
  }
  return product as Product;
}
