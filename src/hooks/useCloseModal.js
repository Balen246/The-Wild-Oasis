import { useEffect, useRef } from "react";

export function useCloseModal(handler) {
  const ref = useRef();

  useEffect(
    function () {
      function handleCloseModal(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }

      document.addEventListener("click", handleCloseModal, true);

      return () =>
        document.removeEventListener("click", handleCloseModal, true);
    },
    [handler]
  );

  return ref;
}
