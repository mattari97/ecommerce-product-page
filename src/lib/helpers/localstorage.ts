import { browser } from "$app/environment";
import type { LocalStorageKey } from "$lib/types";

export const getInitialData = <T>({ defaultValue, key }: { defaultValue: T; key: LocalStorageKey }) => {
  if (!browser) return defaultValue;
  const json = window.localStorage.getItem(key);
  return json === null ? defaultValue : (JSON.parse(json) as T);
};

export const persistData = <T>({ data, key }: { data: T; key: LocalStorageKey }) => {
  if (!browser) return;
  window.localStorage.setItem(key, JSON.stringify(data));
};
