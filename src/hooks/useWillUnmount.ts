import { useEffect, useRef } from 'react';

const useWillUnmount = (fn: Function) => {
  const fnRef = useRef(fn);

  fnRef.current = fn;

  useEffect(() => {
    return () => {
      if (fnRef.current) {
        fnRef.current();
      }
    };
  }, []);
};

export default useWillUnmount;
