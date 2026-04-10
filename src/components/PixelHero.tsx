import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

gsap.registerPlugin(ScrollTrigger);

// Constants for the pixelated look
const PIXEL_SCALE = 4; // How much we downscale to get the pixel effect
const LEAF_COLORS = [0x8B0000, 0xA52A2A, 0xB22222, 0xDC143C, 0x800000, 0xD2691E];

interface LeafParticle {
  sprite: PIXI.Graphics;
  vx: number;
  vy: number;
  rotationSpeed: number;
  isStuck: boolean;
}

export default function PixelHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pixiContainerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const leavesRef = useRef<LeafParticle[]>([]);
  const pileRef = useRef<PIXI.Graphics | null>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    let app: PIXI.Application | null = null;
    let isUnmounted = false;

    const handleResize = () => {
      if (app && app.renderer && !isUnmounted) {
        app.renderer.resize(window.innerWidth, window.innerHeight);
      }
    };

    const initPixi = async () => {
      if (!pixiContainerRef.current) return;

      app = new PIXI.Application();
      
      try {
        await app.init({
          backgroundColor: 0xF5F5DC, // Parchment
          antialias: false,
          resolution: 1 / PIXEL_SCALE, // Low res for pixel effect
          autoDensity: true,
          width: window.innerWidth,
          height: window.innerHeight,
        });

        if (isUnmounted) {
          if (app.renderer) app.destroy(true, { children: true, texture: true });
          return;
        }

        appRef.current = app;
        pixiContainerRef.current?.appendChild(app.canvas);
        app.canvas.style.imageRendering = 'pixelated';
        app.canvas.style.width = '100%';
        app.canvas.style.height = '100%';

        window.addEventListener('resize', handleResize);

        // 1. Create Background Texture (Slightly pixelated parchment)
        const bg = new PIXI.Graphics()
          .rect(0, 0, app.screen.width, app.screen.height)
          .fill(0xF5F5DC);
        app.stage.addChild(bg);

        // 2. Load and Pixelate Bonsai
        const bonsaiTexture = await PIXI.Assets.load('https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=2070&auto=format&fit=crop');
        
        if (isUnmounted) {
          if (app.renderer) app.destroy(true, { children: true, texture: true });
          return;
        }

        const bonsai = new PIXI.Sprite(bonsaiTexture);
        bonsai.anchor.set(0.5);
        bonsai.x = app.screen.width * 0.75;
        bonsai.y = app.screen.height * 0.5;
        
        // Scale to fit while maintaining pixelated look
        const scale = (app.screen.height * 0.7) / bonsai.height;
        bonsai.scale.set(scale);
        
        // Add a subtle "breathing" animation
        gsap.to(bonsai.scale, {
          x: scale * 1.02,
          y: scale * 1.02,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        app.stage.addChild(bonsai);

        // 3. Create Leaf Pile (Static at bottom right)
        const pile = new PIXI.Graphics();
        pileRef.current = pile;
        app.stage.addChild(pile);

        // 4. Particle System for Leaves
        const createLeaf = () => {
          if (!app) return null;
          const size = Math.floor(Math.random() * 3) + 2;
          const color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
          
          const g = new PIXI.Graphics()
            .rect(-size / 2, -size / 2, size, size)
            .fill(color);
          
          g.x = Math.random() * app.screen.width;
          g.y = -20;
          g.rotation = Math.random() * Math.PI * 2;
          
          app.stage.addChild(g);
          
          return {
            sprite: g,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 + 1,
            rotationSpeed: Math.random() * 0.1 - 0.05,
            isStuck: false
          };
        };

        // 5. Update Loop
        app.ticker.add((ticker) => {
          if (!app) return;
          const delta = ticker.deltaTime;
          
          // Spawn leaves based on scroll
          const spawnRate = 0.1 + (scrollProgress.current * 0.5);
          if (Math.random() < spawnRate) {
            const newLeaf = createLeaf();
            if (newLeaf) leavesRef.current.push(newLeaf);
          }

          // Update Pile Height based on scroll
          const basePileHeight = app.screen.height * 0.1;
          const extraPileHeight = app.screen.height * 0.2 * scrollProgress.current;
          const currentPileY = app.screen.height - (basePileHeight + extraPileHeight);

          // Draw Pile
          pile.clear();
          pile.moveTo(app.screen.width * 0.5, app.screen.height);
          pile.quadraticCurveTo(
            app.screen.width * 0.75, 
            currentPileY, 
            app.screen.width, 
            app.screen.height
          );
          pile.fill(0x8B0000);

          // Update Leaves
          leavesRef.current.forEach((leaf, index) => {
            if (leaf.isStuck) return;

            leaf.sprite.x += leaf.vx;
            leaf.sprite.y += leaf.vy;
            leaf.sprite.rotation += leaf.rotationSpeed;

            // Collision Detection with Pile
            const collisionY = currentPileY + (Math.random() * 20);
            
            if (leaf.sprite.y > collisionY && leaf.sprite.x > app.screen.width * 0.5) {
              leaf.isStuck = true;
              gsap.to(leaf.sprite, { alpha: 0, duration: 2, onComplete: () => {
                if (app) app.stage.removeChild(leaf.sprite);
                leavesRef.current.splice(index, 1);
              }});
            }

            // Remove if off screen
            if (leaf.sprite.y > app.screen.height + 50) {
              if (app) app.stage.removeChild(leaf.sprite);
              leavesRef.current.splice(index, 1);
            }
          });
        });

        // 6. GSAP ScrollTrigger
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          }
        });
      } catch (error) {
        console.error("PixiJS Init Error:", error);
      }
    };

    initPixi();

    return () => {
      isUnmounted = true;
      window.removeEventListener('resize', handleResize);
      if (app && app.renderer) {
        app.destroy(true, { children: true, texture: true });
      }
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full">
      {/* Pixi Canvas Container - Sticky */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" ref={pixiContainerRef}>
        {/* Sharp UI Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center px-10 md:px-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            className="max-w-2xl"
          >
            <span className="font-serif-zh text-xl md:text-2xl text-forest-light mb-4 block tracking-[0.2em]">
              树聆之语
            </span>
            <h1 className="text-7xl md:text-9xl font-display font-light text-forest-deep leading-[0.8] mb-10 tracking-tight">
              Whisper <br />
              <span className="text-gold italic font-light">of Age</span>
            </h1>
            <p className="text-xl md:text-2xl text-forest-deep/70 max-w-md font-display italic leading-relaxed tracking-wide">
              Solace in Plants. Silent Listener. <br />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-60 block mt-4 not-italic">
                Roots of the Past, Leaves of the Future
              </span>
            </p>
          </motion.div>
        </div>

        {/* Decorative Misty Overlay (Sharp) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-parchment/30 pointer-events-none z-20" />
      </div>

      {/* Spacer to allow scrolling */}
      <div className="h-screen" />
    </div>
  );
}
