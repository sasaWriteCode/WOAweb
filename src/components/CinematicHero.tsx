import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Leaf {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  blur: number;
  z: number; // 0 for background, 1 for mid, 2 for foreground
}

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let leaves: Leaf[] = [];
    const leafCount = 80;
    const colors = ['#8B0000', '#A52A2A', '#B22222', '#DC143C', '#800000', '#D2691E'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    const createLeaf = (isInitial = false): Leaf => {
      const z = Math.floor(Math.random() * 3);
      return {
        x: Math.random() * canvas.width,
        y: isInitial ? Math.random() * canvas.height : -20,
        size: Math.random() * 12 + 4 + (z * 4),
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 1 + 0.5 + (z * 0.5),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.02 - 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.2,
        blur: z === 2 ? Math.random() * 3 + 1 : 0,
        z
      };
    };

    for (let i = 0; i < leafCount; i++) {
      leaves.push(createLeaf(true));
    }

    const drawLeaf = (leaf: Leaf) => {
      if (!ctx) return;
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      ctx.globalAlpha = leaf.opacity;
      if (leaf.blur > 0) {
        ctx.filter = `blur(${leaf.blur}px)`;
      }
      
      ctx.fillStyle = leaf.color;
      ctx.beginPath();
      ctx.moveTo(0, -leaf.size);
      ctx.quadraticCurveTo(leaf.size / 2, 0, 0, leaf.size);
      ctx.quadraticCurveTo(-leaf.size / 2, 0, 0, -leaf.size);
      ctx.fill();
      
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const sortedLeaves = [...leaves].sort((a, b) => a.z - b.z);

      sortedLeaves.forEach(leaf => {
        // Mouse Interaction (Wind Effect)
        const dx = leaf.x - mouseRef.current.x;
        const dy = leaf.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 5;
          leaf.x += (dx / dist) * force;
          leaf.y += (dy / dist) * force;
        }

        // Update physics
        leaf.y += leaf.speedY;
        leaf.x += leaf.speedX + Math.sin(leaf.y / 50) * 0.5;
        leaf.rotation += leaf.rotationSpeed;

        if (leaf.y > canvas.height + 20) {
          Object.assign(leaf, createLeaf());
        }

        drawLeaf(leaf);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    setIsLoaded(true);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    tl.to('.hero-content', { x: -100, opacity: 0, duration: 1 })
      .to('.spirit-tree', { scale: 1.1, x: 50, opacity: 0, duration: 1 }, 0)
      .to('.leaf-pile', { 
        height: '100vh', 
        backgroundColor: '#4A6741',
        borderRadius: '0%',
        duration: 1.5,
        ease: 'power2.inOut'
      }, 0);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#F5F5DC]">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-parchment/40 pointer-events-none z-10" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 pointer-events-none"
      />

      {/* Real Autumn Bonsai Image */}
      <motion.div
        className="spirit-tree absolute right-[5%] top-1/2 -translate-y-1/2 w-[50%] h-[70%] z-10 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=2070&auto=format&fit=crop"
          alt="Autumn Bonsai"
          className="w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]"
          referrerPolicy="no-referrer"
          animate={{ 
            rotate: [0, 0.5, -0.5, 0],
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </motion.div>

      {/* Typography Overlay - Repositioned to Left and Smaller */}
      <div className="hero-content relative z-30 h-full flex flex-col justify-center px-10 md:px-24 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <span className="font-serif-zh text-xl md:text-2xl text-forest-light mb-4 block tracking-[0.2em]">
            树聆之语
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-light text-forest-deep leading-[0.9] mb-8 tracking-tight">
            Whisper <br />
            <span className="text-gold italic font-light">of Age</span>
          </h1>
          <p className="text-lg md:text-xl text-forest-deep/70 max-w-md font-display italic leading-relaxed tracking-wide">
            Solace in Plants. Silent Listener. <br />
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] opacity-60 block mt-4 not-italic">
              Roots of the Past, Leaves of the Future
            </span>
          </p>
        </motion.div>
      </div>

      <div className="leaf-pile absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-[#8B0000]/30 to-transparent z-40 pointer-events-none rounded-t-[100%] transition-all duration-300" />
      
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
