import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { ArrowRight, Droplets, Sun, Sprout, Star, Users, MapPin, Gift, Heart, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import TreeOfProducts from '@/src/components/TreeOfProducts';
import PixelHero from '@/src/components/PixelHero';

// --- Section 2: Emotional Hook ---
function EmotionalHook() {
  return (
    <section className="py-32 px-6 bg-parchment relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-forest-deep mb-10 leading-tight">
            In a world that never stops — <br />
            <span className="text-gold italic">plants do.</span>
          </h2>
          <div className="space-y-6 text-xl md:text-2xl text-forest-deep/70 font-medium leading-relaxed">
            <p>
              We believe plants are more than decoration. They're listeners, healers, and quiet companions.
            </p>
            <p>
              Whisper of Age exists to bring that solace into your everyday life through nature therapy and mindful growth.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
const offerings = [
  { title: 'Retail Plants', desc: 'Indoor & outdoor plants for your space', icon: Sprout, color: 'bg-forest-light' },
  { title: 'Pop-Up Store', desc: 'Find us at events near you', icon: MapPin, color: 'bg-terracotta' },
  { title: 'Workshop', desc: 'Learn to grow, create, and heal', icon: Users, color: 'bg-sage' },
  { title: 'Birthday Gift Box', desc: 'Curated plant gifts for loved ones', icon: Gift, color: 'bg-forest-deep' },
  { title: 'Event & Door Gifts', desc: 'Eco-friendly, memorable favors', icon: Heart, color: 'bg-terracotta' },
  { title: 'Wedding Favors', desc: 'Living tokens of celebration', icon: Sparkles, color: 'bg-forest-light' },
];

function Offerings() {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-forest-deep mb-4">What we offer</h2>
          <p className="text-forest-light font-mono uppercase tracking-widest text-sm">Experiences rooted in nature</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, rotate: i % 2 === 0 ? 1 : -1 }}
              className="group relative p-10 rounded-[2rem] bg-cream border border-forest-light/10 overflow-hidden cursor-pointer"
            >
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 transition-transform group-hover:scale-110", item.color)}>
                <item.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-forest-deep mb-4">{item.title}</h3>
              <p className="text-forest-deep/60 mb-8 leading-relaxed">{item.desc}</p>
              <div className="flex items-center gap-2 text-terracotta font-bold text-sm uppercase tracking-widest">
                Learn More <ChevronRight size={16} />
              </div>

              {/* Organic Shape Background */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-forest-light/5 rounded-full blur-3xl group-hover:bg-terracotta/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Section 3: Offerings ---
function SocialProof() {
  return (
    <section className="py-32 px-6 bg-forest-deep text-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              You're joining a <span className="text-sage italic">community.</span>
            </h2>
            <p className="text-xl opacity-70 mb-12 leading-relaxed">
              Beyond plants, we are a collective of souls finding solace. Join our "植物电台" (Plant Radio) where we share stories of growth and tranquility.
            </p>

            <div className="grid grid-cols-3 gap-8">
              {[
                { label: 'Happy Parents', val: '500+' },
                { label: 'Workshops', val: '20+' },
                { label: 'Years Growing', val: '3' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-black text-terracotta mb-1">{stat.val}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest opacity-50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="space-y-4">
                <img src="https://picsum.photos/seed/c1/300/400" className="rounded-3xl w-full aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
                <img src="https://picsum.photos/seed/c2/300/300" className="rounded-3xl w-full aspect-square object-cover" referrerPolicy="no-referrer" />
              </motion.div>
              <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="space-y-4 pt-12">
                <img src="https://picsum.photos/seed/c3/300/300" className="rounded-3xl w-full aspect-square object-cover" referrerPolicy="no-referrer" />
                <img src="https://picsum.photos/seed/c4/300/400" className="rounded-3xl w-full aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
              </motion.div>
            </div>
            {/* Testimonial Overlay */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl max-w-xs text-forest-deep"
            >
              <div className="flex text-terracotta mb-4">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill="currentColor" />)}
              </div>
              <p className="italic font-medium mb-4">"The workshop was a meditative experience. I never knew soil could feel so healing."</p>
              <div className="font-bold">— Sarah L., Workshop Parent</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Section 8: Gift Finder ---
function GiftFinder() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({ for: '', budget: '', vibe: '' });

  const questions = [
    { key: 'for', label: 'Who is this for?', options: ['Myself', 'A Friend', 'A Colleague', 'A Wedding'] },
    { key: 'budget', label: "What's your budget?", options: ['Under RM50', 'RM50–RM150', 'RM150+'] },
    { key: 'vibe', label: 'What vibe?', options: ['Calming', 'Festive', 'Whimsical', 'Elegant'] },
  ];

  const handleSelect = (val: string) => {
    setSelections({ ...selections, [questions[step].key]: val });
    if (step < questions.length - 1) setStep(step + 1);
    else setStep(3); // Result state
  };

  return (
    <section className="py-32 px-6 bg-sage/20">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 shadow-xl text-center">
        <h2 className="text-4xl md:text-5xl font-black text-forest-deep mb-12">Not sure what to gift?</h2>

        {step < 3 ? (
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="font-mono text-xs uppercase tracking-widest text-forest-light mb-8">Step {step + 1} of 3</p>
            <h3 className="text-2xl font-bold text-forest-deep mb-10">{questions[step].label}</h3>
            <div className="grid grid-cols-2 gap-4">
              {questions[step].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className="py-4 px-6 rounded-2xl border-2 border-forest-light/20 text-forest-deep font-bold hover:border-terracotta hover:text-terracotta transition-all"
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Sparkles className="mx-auto text-terracotta mb-6" size={48} />
            <h3 className="text-3xl font-bold text-forest-deep mb-6">We found your perfect match!</h3>
            <div className="bg-cream p-8 rounded-3xl mb-10 flex items-center gap-6 text-left">
              <img src="https://picsum.photos/seed/gift/200/200" className="w-24 h-24 rounded-2xl object-cover" referrerPolicy="no-referrer" />
              <div>
                <h4 className="font-bold text-xl text-forest-deep">The Tranquility Box</h4>
                <p className="text-forest-deep/60 text-sm">Perfect for {selections.for} with a {selections.vibe} vibe.</p>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-4 bg-terracotta text-white rounded-full font-bold shadow-lg">Get This Gift</button>
              <button onClick={() => setStep(0)} className="px-8 py-4 border-2 border-forest-deep text-forest-deep rounded-full font-bold">Start Over</button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// --- Section 9: Newsletter ---
function Newsletter() {
  return (
    <section className="py-32 px-6 bg-cream">
      <div className="max-w-5xl mx-auto relative bg-forest-deep rounded-[3rem] p-12 md:p-20 overflow-hidden text-center text-cream">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">Get plant wisdom in your inbox.</h2>
          <p className="text-lg opacity-70 mb-12 max-w-2xl mx-auto">
            Care tips, new arrivals, upcoming workshops, and the occasional reminder that you deserve a little green in your life.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-cream placeholder:text-white/40 focus:outline-none focus:border-terracotta transition-colors"
            />
            <button className="px-10 py-4 bg-terracotta text-white rounded-full font-bold hover:bg-white hover:text-forest-deep transition-all shadow-xl shadow-terracotta/20">
              Join the Garden
            </button>
          </form>

          <p className="font-mono text-[10px] uppercase tracking-widest opacity-50">
            Join 1,200+ plant lovers who get our weekly whispers.
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-terracotta/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-sage/10 rounded-full blur-[100px]" />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="bg-parchment">
      <PixelHero />
      <EmotionalHook />
      <Offerings />
      <TreeOfProducts />
      <SocialProof />

      {/* Workshop Experience */}
      <section className="relative py-40 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://picsum.photos/seed/workshop/1920/1080" className="w-full h-full object-cover opacity-20" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-cream" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black text-forest-deep mb-8 leading-tight">Grow Something. <br /> Feel Something.</h2>
          <p className="text-xl text-forest-deep/70 mb-12 leading-relaxed">
            From beginners to plant lovers, our workshops teach gardening, DIY plant art, and the quiet joy of getting your hands in soil.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-forest-light/10 flex-1 min-w-[280px]">
              <h3 className="text-2xl font-bold text-forest-deep mb-2">Public Workshops</h3>
              <p className="text-sm text-forest-deep/60 mb-6">Join our monthly community sessions.</p>
              <Link to="/workshops" className="text-terracotta font-bold flex items-center justify-center gap-2">View Dates <ArrowRight size={16} /></Link>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-forest-light/10 flex-1 min-w-[280px]">
              <h3 className="text-2xl font-bold text-forest-deep mb-2">Private Sessions</h3>
              <p className="text-sm text-forest-deep/60 mb-6">Curated for teams, birthdays, or weddings.</p>
              <Link to="/contact" className="text-terracotta font-bold flex items-center justify-center gap-2">Enquire Now <ArrowRight size={16} /></Link>
            </div>
          </div>
          <Link to="/workshops" className="inline-block mt-12 px-12 py-5 bg-terracotta text-white rounded-full font-display font-bold text-lg shadow-2xl shadow-terracotta/30 hover:scale-105 transition-transform">
            Book Your Spot
          </Link>
        </div>
      </section>

      {/* Nursery Farm */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-forest-deep mb-8">Rooted in quality. <br /> Grown with care.</h2>
              <p className="text-lg text-forest-deep/60 leading-relaxed mb-10">
                Our plants come from a dedicated nursery farm partner — ensuring every plant you receive is healthy, ethically sourced, and ready to thrive in your home.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center text-forest-deep">
                  <Heart size={24} />
                </div>
                <span className="font-bold text-forest-deep">Ethically Sourced & Hand-Picked</span>
              </div>
            </div>
            <div className="flex gap-4">
              <img src="https://picsum.photos/seed/farm1/400/600" className="w-1/2 rounded-[3rem] object-cover aspect-[2/3]" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/farm2/400/600" className="w-1/2 rounded-[3rem] object-cover aspect-[2/3] mt-12" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      <GiftFinder />
      <Newsletter />
    </main>
  );
}
