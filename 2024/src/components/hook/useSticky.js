"use client";
import { useEffect, useState } from "react";

const useSticky = () => {
  const [sticky, setSticky] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  useEffect(() => {
    const headerElement = document.getElementById("header");
    const headerHeight = headerElement?.offsetHeight || 0;

    const handleScroll = () => {
      const windowTop = window.scrollY;

      if (windowTop >= headerHeight) {
        setSticky(true);
      } else {
        setSticky(false);
        setIsStickyVisible(false);
      }

      if (sticky) {
        if (windowTop < lastScrollTop) {
          setIsStickyVisible(true);
        } else {
          setIsStickyVisible(false);
        }
      }

      lastScrollTop = windowTop;
    };

    let lastScrollTop = 0;
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sticky]);

  return {
    sticky,
    isStickyVisible,
  };
};

export default useSticky;
