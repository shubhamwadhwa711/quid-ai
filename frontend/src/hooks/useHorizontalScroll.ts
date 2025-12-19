import { useEffect, useRef } from "react";

export function useHorizontalScroll<T extends HTMLElement>() {
  const scrollRef = useRef<T>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      // Only handle horizontal scroll if there's horizontal scrollable content
      if (element.scrollWidth > element.clientWidth) {
        // Prevent vertical scroll
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          // Scroll horizontally using vertical wheel movement
          element.scrollLeft += e.deltaY;
        }
      }
    };

    // Mouse drag scroll
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      element.style.cursor = "grabbing";
      startX = e.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      element.style.cursor = "grab";
    };

    const handleMouseUp = () => {
      isDown = false;
      element.style.cursor = "grab";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      element.scrollLeft = scrollLeft - walk;
    };

    element.style.cursor = "grab";
    element.addEventListener("wheel", handleWheel, { passive: false });
    element.addEventListener("mousedown", handleMouseDown);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mouseup", handleMouseUp);
    element.addEventListener("mousemove", handleMouseMove);

    return () => {
      element.removeEventListener("wheel", handleWheel);
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mouseup", handleMouseUp);
      element.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return scrollRef;
}
