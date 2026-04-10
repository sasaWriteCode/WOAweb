import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: 1, name: 'Clivia', cnName: '君子兰', side: 'left', y: '85%', img: 'https://picsum.photos/seed/clivia/300/300' },
  { id: 2, name: 'Pachira Aquatica', cnName: '发财树', side: 'right', y: '70%', img: 'https://picsum.photos/seed/pachira/300/300' },
  { id: 3, name: 'Aglonema Merah', cnName: '粗肋草', side: 'left', y: '55%', img: 'https://picsum.photos/seed/aglonema/300/300' },
  { id: 4, name: 'Monstera Deliciosa', cnName: '龟背竹', side: 'right', y: '40%', img: 'https://picsum.photos/seed/monstera/300/300' },
  { id: 5, name: 'Snake Plant', cnName: '虎尾兰', side: 'left', y: '25%', img: 'https://picsum.photos/seed/snake/300/300' },
  { id: 6, name: 'Peace Lily', cnName: '白掌', side: 'right', y: '10%', img: 'https://picsum.photos/seed/peace/300/300' },
];

export default function TreeOfProducts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const paths = svgRef.current.querySelectorAll('path');
    const productNodes = containerRef.current.querySelectorAll('.product-node');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    // Animate each path segment and its corresponding product
    paths.forEach((path, index) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      // Animate the path
      tl.to(path, {
        strokeDashoffset: 0,
        duration: 1,
        ease: 'none',
      }, index === 0 ? 0 : '>-0.2');

      // If it's a branch (index > 0), animate the corresponding product
      if (index > 0) {
        const productNode = productNodes[index - 1];
        if (productNode) {
          tl.fromTo(productNode, 
            { scale: 0, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              duration: 0.5, 
              ease: 'back.out(1.7)',
              immediateRender: false 
            },
            '>-0.1' // Start just before the branch finishes
          );
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-[300vh] bg-parchment overflow-hidden pt-20">
      {/* Hero Header for this section */}
      <div className="sticky top-32 z-10 text-center px-6 pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-display font-black text-forest-deep mb-4"
        >
          Whisper of Age
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-gold"
        >
          Roots of the Past, Leaves of the Future
        </motion.p>
      </div>

      {/* The Tree SVG */}
      <div className="absolute inset-0 flex justify-center">
        <svg
          ref={svgRef}
          viewBox="0 0 400 1000"
          className="h-full w-auto max-w-4xl opacity-80"
          preserveAspectRatio="xMidYMin meet"
        >
          {/* Trunk */}
          <path
            d="M200 1000 Q200 800 200 600 Q200 400 200 0"
            fill="none"
            stroke="#4A6741"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Branch 1 - Left (Clivia) */}
          <path d="M200 850 Q150 850 100 850" fill="none" stroke="#4A6741" strokeWidth="4" strokeLinecap="round" />
          {/* Branch 2 - Right (Pachira) */}
          <path d="M200 700 Q250 700 300 700" fill="none" stroke="#4A6741" strokeWidth="4" strokeLinecap="round" />
          {/* Branch 3 - Left (Aglonema) */}
          <path d="M200 550 Q150 550 100 550" fill="none" stroke="#4A6741" strokeWidth="4" strokeLinecap="round" />
          {/* Branch 4 - Right (Monstera) */}
          <path d="M200 400 Q250 400 300 400" fill="none" stroke="#4A6741" strokeWidth="4" strokeLinecap="round" />
          {/* Branch 5 - Left (Snake) */}
          <path d="M200 250 Q150 250 100 250" fill="none" stroke="#4A6741" strokeWidth="4" strokeLinecap="round" />
          {/* Branch 6 - Right (Peace) */}
          <path d="M200 100 Q250 100 300 100" fill="none" stroke="#4A6741" strokeWidth="4" strokeLinecap="round" />
        </svg>

        {/* Product Nodes */}
        {products.map((product, i) => (
          <div
            key={product.id}
            className={cn(
              "product-node absolute flex items-center group",
              product.side === 'left' ? "flex-row-reverse" : "flex-row"
            )}
            style={{
              top: product.y,
              left: product.side === 'left' ? 'calc(50% - 100px)' : 'calc(50% + 100px)',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* The Leaf (Product Image) */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gold bg-white overflow-hidden shadow-2xl cursor-pointer z-20 relative"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Tooltip */}
              <div className={cn(
                "absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30",
                product.side === 'left' ? "right-full mr-6" : "left-full ml-6"
              )}>
                <div className="bg-forest-deep text-cream p-6 rounded-2xl shadow-2xl min-w-[200px] border border-gold/30">
                  <h4 className="font-display text-xl font-bold mb-1">{product.name}</h4>
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-4">{product.cnName}</p>
                  <button className="w-full py-2 bg-gold text-forest-deep font-bold text-xs rounded-full pointer-events-auto hover:bg-cream transition-colors">
                    View Detail
                  </button>
                </div>
              </div>
            </div>

            {/* Branch Connector (Visual only, SVG handles the path) */}
            <div className={cn(
              "w-12 h-1 bg-forest-deep/20",
              product.side === 'left' ? "mr-[-1px]" : "ml-[-1px]"
            )} />
          </div>
        ))}
      </div>

      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]" />
    </div>
  );
}
