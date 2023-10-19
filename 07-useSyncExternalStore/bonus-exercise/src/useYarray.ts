import { useCallback, useRef, useSyncExternalStore } from "react";
import * as Yjs from "yjs";

export const useYArray = (yArray: Yjs.Array<string>) => {
  const a = useRef<string[]>(yArray.toArray());

  const subscribe = useCallback(
    (listener: () => void) => {
      yArray.observe(listener);
      return () => yArray.unobserve(listener);
    },
    [yArray]
  );

  const getSnapshot = useCallback(() => {
    if (!(JSON.stringify(a.current) === JSON.stringify(yArray.toArray()))) {
      a.current = yArray.toArray();
    }
    return a.current;
  }, [yArray]);

  return useSyncExternalStore(subscribe, getSnapshot);
};
