import { motion } from 'motion/react';
import { Gift, Heart, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const giftCategories = [
  {
    title: 'Birthday Gift Box',
    desc: 'A curated selection of plants and wellness items to celebrate another year of growth.',
    price: 'From RM88',
    img: 'https://picsum.photos/seed/g1/800/600'
  },
  {
    title: 'Wedding Favors',
    desc: 'Living tokens of love for your guests. Sustainable and meaningful.',
    price: 'Enquire for Price',
    img: 'https://picsum.photos/seed/g2/800/600'
  },
  {
    title: 'Corporate Door Gifts',
    desc: 'Eco-friendly favors that leave a lasting impression of tranquility.',
    price: 'Enquire for Price',
    img: 'https://picsum.photos/seed/g3/800/600'
  }
];

export default function Gifts() {
  return (
    <main className="bg-cream min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-20">
          <h1 className="text-5xl md:text-8xl font-black text-forest-deep mb-6">Gifts that Grow.</h1>
          <p className="text-xl text-forest-deep/60 max-w-2xl mx-auto">
            Give the gift of solace. Our curated plant boxes and favors are designed to bring joy and tranquility to any occasion.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          {giftCategories.map((gift, i) => (
            <motion.div
              key={gift.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-forest-deep/5 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={gift.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-bold text-forest-deep mb-4">{gift.title}</h3>
                <p className="text-forest-deep/60 mb-8 leading-relaxed">{gift.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-xl text-terracotta">{gift.price}</span>
                  <button className="w-12 h-12 bg-forest-deep text-cream rounded-full flex items-center justify-center hover:bg-terracotta transition-all">
                    <ShoppingBag size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Gifts */}
        <section className="bg-forest-deep rounded-[3rem] p-12 md:p-20 text-cream text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-8">Need something unique?</h2>
            <p className="text-xl opacity-70 mb-12 max-w-2xl mx-auto">
              We specialize in custom gift curation for weddings, corporate events, and special celebrations. Let us help you create a living memory.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-terracotta text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-terracotta/30">
              Custom Enquiry <ArrowRight size={20} />
            </Link>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-terracotta/10 rounded-full blur-3xl" />
        </section>
      </div>
    </main>
  );
}
