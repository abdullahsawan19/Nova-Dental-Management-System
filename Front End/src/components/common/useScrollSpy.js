import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollSpy = () => {
  const location = useLocation();
  const [currentHash, setCurrentHash] = useState(location.hash);

  useEffect(() => {
    setCurrentHash(location.hash);
  }, [location]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setCurrentHash("");
      return;
    }

    const timer = setTimeout(() => {
      const sections = document.querySelectorAll("#services, #reviews");
      const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -40% 0px",
        threshold: 0,
      };

      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newHash = `#${entry.target.id}`;
            setCurrentHash(newHash);
            window.history.replaceState(null, "", newHash);
          }
        });
      };

      const observer = new IntersectionObserver(
        observerCallback,
        observerOptions,
      );
      sections.forEach((sec) => observer.observe(sec));

      return () => {
        sections.forEach((sec) => observer.unobserve(sec));
        observer.disconnect();
      };
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return currentHash;
};
