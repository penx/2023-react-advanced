import { useSyncExternalStore } from "react";

const subscribe = (listener: () => void) => {
  window?.addEventListener("scroll", listener);
  return () => {
    window?.addEventListener("scroll", listener);
  };
};
const selector = () => window?.scrollY;
export function useYScroll() {
  return useSyncExternalStore(subscribe, selector);
}
