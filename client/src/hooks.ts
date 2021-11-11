import { useEffect, useRef } from 'react';

export const useDidMountEffect = (func: () => void, deps: unknown[]) => {
  const didMount = useRef(false);

    useEffect(() => {
      didMount.current 
        ? func()
        : didMount.current = true;
    }, deps);
};