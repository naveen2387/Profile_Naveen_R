"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const NODE_COLORS = ["246,219,192", "216,155,187", "231,195,185"];
const MOUSE_RADIUS = 180;

/**
 * Animated neural-network field: drifting nodes connected by fading lines, with a gentle
 * pull toward the cursor. Pauses when off-screen and renders a single still frame when
 * the user prefers reduced motion.
 */
export function NeuralCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frameId = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(90, Math.max(28, Math.floor((width * height) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.9,
        color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
      }));
    };

    const step = () => {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const linkDistance = Math.min(150, Math.max(110, width / 7));

      context.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < linkDistance) {
            context.strokeStyle = `rgba(246,219,192,${(1 - distance / linkDistance) * 0.32})`;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      for (const node of nodes) {
        const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
        if (distance < MOUSE_RADIUS) {
          context.strokeStyle = `rgba(216,155,187,${(1 - distance / MOUSE_RADIUS) * 0.5})`;
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(pointer.x, pointer.y);
          context.stroke();
        }
      }

      for (const node of nodes) {
        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${node.color},0.95)`;
        context.fill();
      }
    };

    const loop = () => {
      if (!visible) {
        frameId = 0;
        return;
      }
      step();
      draw();
      frameId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduceMotion) {
        draw();
        return;
      }
      if (!frameId && visible) frameId = requestAnimationFrame(loop);
    };

    build();
    draw();
    start();

    const resizeObserver = new ResizeObserver(() => {
      build();
      if (reduceMotion) draw();
    });
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    intersection.observe(canvas);

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerLeave, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerLeave);
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("pointer-events-none block", className)} />;
}
