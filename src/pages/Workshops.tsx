import { motion } from 'motion/react';
import { useState } from 'react';
import { Search, Filter, Heart, ShoppingBag, Droplets, Sun } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const plants = [
  { id: 1, name: 'Clivia', cnName: '君子兰', price: 85, category: 'Indoor', meaning: 'Harmony', img: 'https://picsum.photos/seed/p1/600/800' },
  { id: 2, name: 'Pachira Aquatica', cnName: '发财树', price: 120, category: 'Indoor', meaning: 'Wealth', img: 'https://picsum.photos/seed/p2/600/800' },
  { id: 3, name: 'Aglonema Merah', cnName: '粗肋草', price: 65, category: 'Low Light', meaning: 'Festive', img: 'https://picsum.photos/seed/p3/600/800' },
  { id: 4, name: 'Monstera Deliciosa', cnName: '龟背竹', price: 150, category: 'Indoor', meaning: 'Longevity', img: 'https://picsum.photos/seed/p4/600/800' },
  { id: 5, name: 'Snake Plant', cnName: '虎尾兰', price: 45, category: 'Low Light', meaning: 'Protection', img: 'https://picsum.photos/seed/p5/600/800' },
  { id: 6, name: 'Peace Lily', cnName: '白掌', price: 55, category: 'Indoor', meaning: 'Peace', img: 'https://picsum.photos/seed/p6/600/800' },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Indoor', 'Low Light', 'Outdoor', 'Gifts'];

  const filteredPlants = activeCategory === 'All'
    ? plants
    : plants.filter(p => p.category === activeCategory);

  return (
    <main className="pt-32 pb-20 px-6 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-forest-deep mb-6">The Plant Shop</h1>
          <p className="text-xl text-forest-deep/60 max-w-2xl">Find the silent listener that speaks to your soul. Each plant is hand-picked for its health and symbolic meaning.</p>
        </header>

        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all",
                  activeCategory === cat
                    ? "bg-forest-deep text-cream"
                    : "bg-white text-forest-deep hover:bg-forest-light/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative flex-1 w-full md:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-light" size={18} />
            <input
              type="text"
              placeholder="Search plants..."
              className="w-full pl-12 pr-6 py-3 rounded-full bg-white border-none focus:ring-2 focus:ring-terracotta transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPlants.map((plant, i) => (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-white shadow-xl shadow-forest-deep/5">
                <img
                  src={plant.img}
                  alt={plant.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-forest-deep hover:text-terracotta transition-colors">
                    <Heart size={18} />
                  </button>
                  <button className="w-10 h-10 bg-terracotta text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <ShoppingBag size={18} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 bg-forest-deep/90 backdrop-blur-md text-cream px-4 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest">
                  {plant.meaning}
                </div>
              </div>

              <div className="flex justify-between items-start px-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-forest-deep">{plant.name}</h3>
                    <span className="font-mono text-[10px] text-forest-light">{plant.cnName}</span>
                  </div>
                  <div className="flex gap-3 text-forest-light">
                    <Droplets size={14} />
                    <Sun size={14} />
                  </div>
                </div>
                <div className="text-xl font-black text-terracotta">RM{plant.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
