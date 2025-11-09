import React, { useEffect, useRef } from "react";

const FlameCanvas = ({ numberOfParticles = 300 }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // --- Particle Class ---
    class FlameParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 50;

        this.radius = Math.random() * 6 + 2;
        this.initialRadius = this.radius;

        this.speedY = Math.random() * 2 + 1;
        this.life = Math.random() * 300 + 200;
        this.maxLife = this.life;

        const hue = Math.random() * 30 + 10;
        this.color = `hsl(${hue}, 100%, 50%)`;

        this.waver = Math.random() * 2 - 1;
        this.waverSpeed = Math.random() * 0.05 + 0.01;
      }

      update() {
        this.life--;
        this.y -= this.speedY;

        this.waver += this.waverSpeed;
        this.x += Math.sin(this.waver) * 1.0;

        this.radius = this.initialRadius * (this.life / this.maxLife);

        if (this.life <= 0 || this.radius <= 0.1) {
          this.reset();
        }
      }

      draw() {
        const opacity = this.life / this.maxLife;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;

        // fix HSLA color parsing
        ctx.fillStyle = `hsla(${this.color.match(/\d+/)[0]}, 100%, 50%, ${
          opacity * 0.7
        })`;
        ctx.fill();

        ctx.shadowBlur = 0;
      }
    }

    // --- Initialization ---
    const initParticles = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particlesRef.current = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesRef.current.push(new FlameParticle());
      }
    };

    // --- Animation Loop ---
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particlesRef.current) {
        p.update();
        p.draw();
      }
      requestAnimationFrame(animate);
    };

    // --- Start ---
    initParticles();
    animate();

    // --- Handle Resize ---
    const handleResize = () => initParticles();
    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [numberOfParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // behind content
        background: "#000",
      }}
    />
  );
};

export default FlameCanvas;
