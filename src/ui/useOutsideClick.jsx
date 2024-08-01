import { useEffect, useRef } from "react";

// Custom hook to detect clicks outside of the specified element
function useOutsideClick(callback, listenCapture = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener("click", handleClickOutside, listenCapture);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
        listenCapture
      );
    };
  }, [callback, listenCapture]);

  return ref;
}

export default useOutsideClick;
