import { motion } from 'motion/react';
import { Heart, Sprout, Users, MapPin } from 'lucide-react';

export default function About() {
  return (
    <main className="bg-cream min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-forest-light mb-6 block">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-black text-forest-deep mb-8 leading-tight">
              We believe plants <br /> <span className="text-terracotta italic">listen.</span>
            </h1>
            <div className="space-y-6 text-xl text-forest-deep/70 leading-relaxed">
              <p>
                Whisper of Age (树聆之语) was born from a simple realization: in the noise of modern life, we often forget to breathe.
              </p>
              <p>
                We started as a small collective of plant lovers in Malaysia who found solace in the quiet growth of our green companions. Today, we are a brand dedicated to sharing that tranquility with you.
              </p>
              <p>
                Our mission is to bridge the gap between urban living and nature, promoting emotional well-being through nature therapy and eco-conscious experiences.
              </p>
            </div>
          </div>
          <div className="relative">
            <img src="https://picsum.photos/seed/about1/800/1000" className="rounded-[3rem] shadow-2xl" referrerPolicy="no-referrer" />
            <div className="absolute -bottom-10 -left-10 bg-sage p-10 rounded-3xl shadow-2xl max-w-xs text-forest-deep">
              <p className="font-display font-black text-4xl mb-2">3+</p>
              <p className="font-bold">Years of growing together with our community.</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {[
            { icon: Heart, title: 'Nature Therapy', desc: 'Every plant we sell is chosen for its ability to promote peace and positivity.' },
            { icon: Sprout, title: 'Eco-Conscious', desc: 'We prioritize sustainable practices, from our nursery partners to our packaging.' },
            { icon: Users, title: 'Community', desc: 'We are more than a shop; we are a space for connection and shared growth.' }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-terracotta mx-auto mb-8 shadow-xl shadow-forest-deep/5">
                <item.icon size={40} />
              </div>
              <h3 className="text-2xl font-bold text-forest-deep mb-4">{item.title}</h3>
              <p className="text-forest-deep/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-[3rem] p-12 md:p-20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <img src="https://picsum.photos/seed/farm-about/800/600" className="rounded-[2rem] shadow-xl" referrerPolicy="no-referrer" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-black text-forest-deep mb-8">Rooted in Quality.</h2>
              <p className="text-lg text-forest-deep/60 leading-relaxed mb-8">
                Our plants are nurtured in our partner nursery farm in Selangor, where they receive the best care before finding their way to your home. We ensure every leaf is healthy and every root is strong.
              </p>
              <div className="flex items-center gap-3 text-terracotta font-bold">
                <MapPin size={20} />
                <span>Selangor, Malaysia</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
