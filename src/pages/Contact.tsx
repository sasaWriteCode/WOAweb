import { motion } from 'motion/react';
import { MessageCircle, Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <main className="bg-cream min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-forest-deep mb-8 leading-tight">
              Let's <span className="text-terracotta italic">Connect.</span>
            </h1>
            <p className="text-xl text-forest-deep/60 mb-12 leading-relaxed">
              Have a question about plant care? Want to book a private workshop? Or just want to say hi? We'd love to hear from you.
            </p>

            <div className="space-y-8">
              <a href="https://wa.me/yournumber" className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-[#25D366] text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep">WhatsApp</h4>
                  <p className="text-forest-deep/60">Fastest way to reach us</p>
                </div>
              </a>
              <a href="mailto:hello@whisperofage.com" className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-forest-deep text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep">Email</h4>
                  <p className="text-forest-deep/60">hello@whisperofage.com</p>
                </div>
              </a>
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-sage text-forest-deep rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-forest-deep">Location</h4>
                  <p className="text-forest-deep/60">Selangor / KL Pop-Ups</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl shadow-forest-deep/5">
            <h3 className="text-3xl font-bold text-forest-deep mb-10">Send an Enquiry</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-forest-light">Name</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-none focus:ring-2 focus:ring-terracotta transition-all" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-forest-light">Email</label>
                  <input type="email" className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-none focus:ring-2 focus:ring-terracotta transition-all" placeholder="Your email" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-forest-light">Subject</label>
                <select className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-none focus:ring-2 focus:ring-terracotta transition-all">
                  <option>General Enquiry</option>
                  <option>Workshop Booking</option>
                  <option>Custom Gift Enquiry</option>
                  <option>Plant Care Question</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-forest-light">Message</label>
                <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-none focus:ring-2 focus:ring-terracotta transition-all" placeholder="How can we help?"></textarea>
              </div>
              <button className="w-full py-5 bg-forest-deep text-cream rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-terracotta transition-all shadow-xl shadow-forest-deep/20">
                Send Message <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
