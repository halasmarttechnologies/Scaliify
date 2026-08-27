"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CrowdCanvasProps {
  src?: string;
  rows?: number;
  cols?: number;
  className?: string;
  theme?: "light-on-dark" | "dark-on-light" | "original";
}

export const CrowdCanvas: React.FC<CrowdCanvasProps> = ({
  src = "/images/peeps/all-peeps.png",
  rows = 10,
  cols = 6,
  className = "absolute bottom-0 h-full w-full pointer-events-none",
  theme = "light-on-dark",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = {
      src,
      rows,
      cols,
    };

    // UTILS
    const randomRange = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const randomIndex = (array: any[]) => randomRange(0, array.length) | 0;
    const removeFromArray = (array: any[], i: number) => array.splice(i, 1)[0];
    const removeItemFromArray = (array: any[], item: any) =>
      removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array: any[]) =>
      removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array: any[]) => array[randomIndex(array) | 0];

    // TWEEN FACTORIES
    const resetPeep = ({ stage, peep }: { stage: any; peep: any }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = 40 - 180 * gsap.parseEase("power2.in")(Math.random());
      const startY = stage.height - peep.height + offsetY;
      let startX: number;
      let endX: number;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width + peep.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = -peep.width;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return {
        startX,
        startY,
        endX,
      };
    };

    const normalWalk = ({ peep, props }: { peep: any; props: any }) => {
      const { startX, startY, endX } = props;
      const xDuration = randomRange(8, 16);
      const yDuration = 0.22;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.7, 1.3));
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: "none",
        },
        0
      );
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: Math.floor(xDuration / yDuration),
          yoyo: true,
          y: startY - 8,
        },
        0
      );

      return tl;
    };

    const walks = [normalWalk];

    // TYPES
    type Peep = {
      image: HTMLCanvasElement | HTMLImageElement;
      rect: number[];
      width: number;
      height: number;
      drawArgs: any[];
      x: number;
      y: number;
      anchorY: number;
      scaleX: number;
      walk: any;
      setRect: (rect: number[]) => void;
      render: (ctx: CanvasRenderingContext2D) => void;
    };

    // FACTORY FUNCTIONS
    const createPeep = ({
      image,
      rect,
    }: {
      image: HTMLCanvasElement | HTMLImageElement;
      rect: number[];
    }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        drawArgs: [],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect: (rect: number[]) => {
          peep.rect = rect;
          peep.width = rect[2];
          peep.height = rect[3];
          peep.drawArgs = [peep.image, ...rect, 0, 0, peep.width, peep.height];
        },
        render: (targetCtx: CanvasRenderingContext2D) => {
          targetCtx.save();
          targetCtx.translate(peep.x, peep.y);
          targetCtx.scale(peep.scaleX, 1);
          targetCtx.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height
          );
          targetCtx.restore();
        },
      };

      peep.setRect(rect);
      return peep;
    };

    // MAIN
    const rawImg = document.createElement("img");
    let processedCanvas: HTMLCanvasElement | HTMLImageElement = rawImg;

    const stage = {
      width: 0,
      height: 0,
    };

    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const createPeeps = () => {
      const { rows: numCols, cols: numRows } = config;
      const width = rawImg.naturalWidth;
      const height = rawImg.naturalHeight;
      const total = numCols * numRows;
      const rectWidth = width / numCols;
      const rectHeight = height / numRows;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: processedCanvas,
            rect: [
              (i % numCols) * rectWidth,
              Math.floor(i / numCols) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          })
        );
      }
    };

    const initCrowd = () => {
      while (availablePeeps.length) {
        addPeepToCrowd().walk.progress(Math.random());
      }
    };

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage,
        }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;

      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      ctx.scale(dpr, dpr);

      crowd.forEach((peep) => {
        peep.render(ctx);
      });

      ctx.restore();
    };

    const resize = () => {
      if (!canvas) return;
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * dpr;
      canvas.height = stage.height * dpr;

      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    };

    const init = () => {
      // Process transparency & theme styling onto offscreen canvas
      const offscreen = document.createElement("canvas");
      offscreen.width = rawImg.naturalWidth;
      offscreen.height = rawImg.naturalHeight;
      const octx = offscreen.getContext("2d");

      if (octx) {
        octx.drawImage(rawImg, 0, 0);
        try {
          const imgData = octx.getImageData(0, 0, offscreen.width, offscreen.height);
          const data = imgData.data;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            // If near white, make transparent
            if (r > 220 && g > 220 && b > 220) {
              data[i + 3] = 0;
            } else if (theme === "light-on-dark") {
              // Convert dark ink to clean crisp white/mint for dark footer
              data[i] = 235;
              data[i + 1] = 250;
              data[i + 2] = 245;
              data[i + 3] = 210;
            }
          }
          octx.putImageData(imgData, 0, 0);
          processedCanvas = offscreen;
        } catch {
          processedCanvas = rawImg;
        }
      }

      createPeeps();
      resize();
      gsap.ticker.add(render);
    };

    rawImg.onload = init;
    rawImg.src = config.src;

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, [src, rows, cols, theme]);

  return <canvas ref={canvasRef} className={className} />;
};

export default CrowdCanvas;
