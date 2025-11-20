import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ children, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setPrevEnabled(emblaApi.canScrollPrev());
      setNextEnabled(emblaApi.canScrollNext());
    };

    emblaApi.on("select", update);
    update();
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>

      <button
        disabled={!prevEnabled}
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full p-2 shadow bg-white"
        onClick={() => emblaApi && emblaApi.scrollPrev()}
      >
        <ChevronLeft />
      </button>

      <button
        disabled={!nextEnabled}
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-2 shadow bg-white"
        onClick={() => emblaApi && emblaApi.scrollNext()}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export { Carousel };
