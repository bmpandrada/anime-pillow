import { animate, splitText, stagger } from "animejs";

export function animateTitle(selector) {
  // Delay execution slightly so the element exists
  setTimeout(() => {
    const el = document.querySelector(selector);
    if (!el) return;

    const { chars } = splitText(selector, { words: false, chars: true });

    animate(chars, {
      y: [
        { to: "-2.75rem", ease: "outExpo", duration: 600 },
        { to: 0, ease: "outBounce", duration: 800, delay: 100 },
      ],
      rotate: {
        from: "-1turn",
        delay: 0,
      },
      delay: stagger(50),
      ease: "inOutCirc",
      loopDelay: 700,
      loop: false,
    });
  }, 100); // 👈 small delay (100ms) ensures mount
}
