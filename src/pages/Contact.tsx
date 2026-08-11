import { FormEvent, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, CheckCircle2, MapPin, Mail, Phone } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pt-24 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left Col - Info */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <h1 className="reveal-item text-5xl md:text-7xl font-medium tracking-tight leading-tight">
              Start Your <br /><span className="text-white/40">Legacy.</span>
            </h1>
            <p className="reveal-item text-xl text-text-muted leading-relaxed max-w-md">
              Initiate a conversation with our advisory team to discuss your portfolio, goals, and wealth architecture.
            </p>
          </div>

          <div className="reveal-item flex flex-col gap-8 mt-12 border-t border-white/10 pt-12">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-white/40 mt-1 shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-mono uppercase tracking-widest text-text-muted mb-2">Headquarters</span>
                <span className="text-white">OneCapital Financial Center</span>
                <span className="text-white/70">Suite 4500, Financial District</span>
                <span className="text-white/70">Mumbai, India</span>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-white/40 mt-1 shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-mono uppercase tracking-widest text-text-muted mb-2">Direct Inquiry</span>
                <a href="mailto:advisory@onecapital.com" className="text-white hover:text-white/70 transition-colors">advisory@onecapital.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-white/40 mt-1 shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-mono uppercase tracking-widest text-text-muted mb-2">Private Desk</span>
                <a href="tel:+912200000000" className="text-white hover:text-white/70 transition-colors">+91 22 0000 0000</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col - Form */}
        <div className="reveal-item glass-panel p-8 md:p-12 rounded-[2rem]">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
              <CheckCircle2 className="w-12 h-12 text-white/70" strokeWidth={1} />
              <h2 className="text-2xl font-medium tracking-tight">Request received</h2>
              <p className="text-text-muted max-w-sm text-balance">
                Thank you. Our advisory team will review your brief and respond within one business day.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-medium tracking-tight mb-8">Request a Consultation</h2>
              
              <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-xs uppercase tracking-widest text-text-muted font-mono">Full Name</label>
                  <input 
                    id="fullName"
                    name="fullName"
                    type="text" 
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-text-muted font-mono">Professional Email</label>
                    <input 
                      id="email"
                      name="email"
                      type="email" 
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-xs uppercase tracking-widest text-text-muted font-mono">Phone</label>
                    <input 
                      id="phone"
                      name="phone"
                      type="tel" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="interest" className="text-xs uppercase tracking-widest text-text-muted font-mono">Primary Interest</label>
                  <select
                    id="interest"
                    name="interest"
                    required
                    defaultValue=""
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                  >
                    <option value="" disabled>Select an interest</option>
                    <option value="wealth-management">Wealth Management</option>
                    <option value="pms">Portfolio Management Services (PMS)</option>
                    <option value="mutual-funds">Mutual Funds</option>
                    <option value="aif">Alternative Investments (AIF)</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-text-muted font-mono">Message / Portfolio Brief</label>
                  <textarea 
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder="Briefly describe your current portfolio structure or advisory needs..."
                  />
                </div>

                <button type="submit" className="mt-4 w-full bg-white text-black px-8 py-4 rounded-xl text-sm uppercase tracking-widest font-medium hover:bg-white/90 transition-all flex items-center justify-center gap-3 group">
                  Submit Request
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="text-[10px] text-text-muted text-center uppercase tracking-wider font-mono mt-2">
                  All communications are strictly confidential.
                </p>
              </form>
            </>
          )}
        </div>
        
      </div>
    </div>
  );
}
