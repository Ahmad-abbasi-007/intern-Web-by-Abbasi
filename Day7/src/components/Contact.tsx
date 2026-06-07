import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, Clock, Loader2, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Contact() {
  // Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Form handling states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);
  const [isSentSuccessfully, setIsSentSuccessfully] = useState(false);

  // Simple client-side validation
  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = 'Full name is required';
    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please provide a valid email format';
    }
    if (!subject.trim()) tempErrors.subject = 'Subject selection is required';
    if (!message.trim()) {
      tempErrors.message = 'Please input your inquiry message';
    } else if (message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);
    // Simulate API pipeline transmission
    setTimeout(() => {
      setIsSending(false);
      setIsSentSuccessfully(true);
      // Reset inputs
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1800);
  };

  const contactInfos = [
    {
      icon: <MapPin className="h-5 w-5 text-indigo-400" />,
      title: 'Our Corporate HQ',
      value: '280 King Street Suite 14, Melbourne, VIC 3000, Australia',
    },
    {
      icon: <Phone className="h-5 w-5 text-indigo-400" />,
      title: 'Direct Hotlines',
      value: '+61 (03) 9420 1852 (Direct Office) / +61 400 852 963',
    },
    {
      icon: <Mail className="h-5 w-5 text-indigo-400" />,
      title: 'Digital Support Inquiries',
      value: 'support@start-up.studio / business@start-up.studio',
    },
    {
      icon: <Clock className="h-5 w-5 text-indigo-400" />,
      title: 'Standard Active Hours',
      value: 'Monday to Friday: 9:00 AM — 6:00 PM (AEST)',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative ambient background overlays */}
      <div className="absolute top-[30%] left-[-10%] w-[35%] h-[35%] bg-indigo-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-pink-500/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#a5b4fc] font-bold bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-400/20 inline-block">
            Connect With Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white animate-fade-in">
            Get in Touch
          </h2>
          <p className="text-[#94a3b8] font-sans leading-relaxed text-sm sm:text-base">
            Have a bold startup idea or layout wireframe looking for high-performance scale?
            Inquire through our form or direct hotlines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Corporate Information & Simulated Map */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-6">
              {contactInfos.map((info, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-indigo-500/15 hover:bg-slate-900/60 transition-all group">
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:border-indigo-500/40 transition-colors">
                    {info.icon}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block font-mono">
                      {info.title}
                    </span>
                    <span className="text-sm font-sans font-medium text-slate-300 leading-relaxed block">
                      {info.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Simulated Interactive Map Coordinates Visualizer */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden p-6 relative flex flex-col justify-between h-48 group hover:border-indigo-500/20 transition-all">
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#3341551a_1px,transparent_1px),linear-gradient(to_bottom,#3341551a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Compass className="h-4.5 w-4.5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-[10px] font-bold text-indigo-400 font-mono">GEOLOCALIZATION_MAP.SH</span>
                </div>
                <span className="text-[9px] font-bold text-slate-500 font-mono">37°48'49"S 144°57'47"E</span>
              </div>

              {/* Map abstract design */}
              <div className="relative h-20 w-full flex items-center justify-center opacity-65 group-hover:opacity-100 transition-opacity">
                {/* Horizontal road lines */}
                <div className="absolute h-0.5 w-full bg-slate-800 left-0 top-[30%]" />
                <div className="absolute h-0.5 w-full bg-slate-800 left-0 top-[70%]" />
                {/* Vertical road lines / diagonals */}
                <div className="absolute w-0.5 h-full bg-slate-800 left-[20%] top-0" />
                <div className="absolute w-0.5 h-full bg-slate-800 left-[65%] top-0" />
                <div className="absolute w-0.5 h-full bg-slate-800 left-[80%] top-0" />

                {/* Blinking HQ target marker */}
                <div className="absolute top-[30%] left-[65%] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-4 w-4">
                  <span className="absolute h-4 w-4 bg-indigo-500 rounded-full animate-ping opacity-75" />
                  <span className="h-2 w-2 bg-indigo-400 rounded-full border border-white" />
                </div>
              </div>

              <span className="text-[10px] text-slate-500 font-bold block pb-1 relative z-10">
                StartUp Studio HQ Location Vector Grid
              </span>
            </div>
          </div>

          {/* Right Column: Contact Inquiries validation form card */}
          <div className="lg:col-span-7">
            <div id="contact-form-card" className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden min-h-[480px] flex flex-col justify-center">
              {/* Fading visual overlays */}
              <div className="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[80px]" />
              
              <AnimatePresence mode="wait">
                {!isSentSuccessfully ? (
                  <motion.form
                    key="inquiryform"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 text-left relative z-10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="contact-name" className="text-xs font-bold text-[#cbd5e1] uppercase tracking-wide block">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                          }}
                          className={`w-full px-5 py-3.5 bg-slate-950 border ${
                            errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                          } rounded-2xl text-sm font-sans font-medium text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all`}
                          placeholder="Brandon Yeald"
                        />
                        {errors.name && (
                          <span className="text-xs text-rose-500 font-bold font-sans block">{errors.name}</span>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="contact-email" className="text-xs font-bold text-[#cbd5e1] uppercase tracking-wide block">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                          }}
                          className={`w-full px-5 py-3.5 bg-slate-950 border ${
                            errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                          } rounded-2xl text-sm font-sans font-medium text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all`}
                          placeholder="developer@client-hq.com"
                        />
                        {errors.email && (
                          <span className="text-xs text-rose-500 font-bold font-sans block">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    {/* Subject selection */}
                    <div className="space-y-2">
                      <label htmlFor="contact-subject" className="text-xs font-bold text-[#cbd5e1] uppercase tracking-wide block">
                        Subject Matter
                      </label>
                      <input
                        type="text"
                        id="contact-subject"
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                          if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                        }}
                        className={`w-full px-5 py-3.5 bg-slate-950 border ${
                          errors.subject ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                        } rounded-2xl text-sm font-sans font-medium text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all`}
                        placeholder="Inquiry for Custom Brand Design"
                      />
                      {errors.subject && (
                        <span className="text-xs text-rose-500 font-bold font-sans block">{errors.subject}</span>
                      )}
                    </div>

                    {/* Message Box */}
                    <div className="space-y-2">
                      <label htmlFor="contact-message" className="text-xs font-bold text-[#cbd5e1] uppercase tracking-wide block">
                        Detailed Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                        }}
                        className={`w-full px-5 py-3.5 bg-slate-950 border ${
                          errors.message ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                        } rounded-2xl text-sm font-sans font-medium text-white placeholder-slate-600 focus:outline-none' focus:ring-1 focus:ring-indigo-500/20 transition-all`}
                        placeholder="Detail your request objectives, timelines, and budgets..."
                      />
                      {errors.message && (
                        <span className="text-xs text-rose-500 font-bold font-sans block">{errors.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      disabled={isSending}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Transmitting Inquiry System...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="successbox"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    className="text-center space-y-5 py-8"
                  >
                    {/* Pulsing Success indicator visual */}
                    <div className="inline-flex items-center justify-center h-16 w-16 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/30">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold font-sans text-white tracking-tight">
                        Message Dispatch Successful
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed font-sans max-w-sm mx-auto">
                        Your inquiry vectors have been translated into our mailbox queues successfully!
                        A representative creator will respond within **4 active hours**.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800 w-full max-w-xs mx-auto">
                      <button
                        id="contact-success-reset"
                        onClick={() => setIsSentSuccessfully(false)}
                        className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium rounded-full text-xs transition-colors cursor-pointer"
                      >
                        Inquire Again
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
