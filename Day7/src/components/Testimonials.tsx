import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialsData } from '../data';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  // Autoplay slider effect
  useEffect(() => {
    const autoPlayTimer = setInterval(() => {
      handleNextSlide();
    }, 6000); // Transitions every 6 seconds

    return () => clearInterval(autoPlayTimer);
  }, [activeIndex]);

  const handlePrevSlide = () => {
    setSlideDirection('left');
    setActiveIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setSlideDirection('right');
    setActiveIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = testimonialsData[activeIndex];

  // Variants for motion slide translation
  const slideVariants = {
    initial: (direction: 'left' | 'right') => ({
      opacity: 0,
      x: direction === 'right' ? 120 : -120,
    }),
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: 'left' | 'right') => ({
      opacity: 0,
      x: direction === 'right' ? -120 : 120,
    }),
  };

  return (
    <section id="testimonial" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative ambient indicators */}
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-indigo-500/5 rounded-full blur-[100px]" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Section Heading Tag */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-widest text-[#a5b4fc] font-bold bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-400/20 inline-block">
            Client Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white">
            What founders express about us
          </h2>
        </div>

        {/* Sliding Card Container */}
        <div className="w-full relative min-h-[300px] flex items-center justify-center pt-8">
          
          {/* Quote Mark backdrop graphic */}
          <div className="absolute top-0 left-6 text-slate-900 pointer-events-none select-none z-0">
            <Quote className="h-28 w-28 fill-current text-slate-900/40" />
          </div>

          <AnimatePresence custom={slideDirection} mode="wait">
            <motion.div
              key={activeIndex}
              custom={slideDirection}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="text-center space-y-8 relative z-10 w-full"
            >
              {/* Review Quote text */}
              <blockquote className="text-lg sm:text-2xl text-slate-200 font-sans leading-relaxed tracking-wide font-medium italic max-w-3xl mx-auto">
                "{activeTestimonial.quote}"
              </blockquote>

              {/* Author profile metrics details */}
              <div className="flex flex-col items-center gap-3">
                <div className="h-16 w-16 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-lg bg-slate-900">
                  <img
                    referrerPolicy="no-referrer"
                    src={activeTestimonial.avatarUrl}
                    alt={activeTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <cite className="text-base font-bold font-sans text-white not-italic block tracking-tight">
                    {activeTestimonial.name}
                  </cite>
                  <span className="text-xs text-indigo-400 font-bold font-mono tracking-wider uppercase block mt-0.5">
                    {activeTestimonial.role}, <span className="text-slate-500">{activeTestimonial.company}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators Controllers */}
        <div className="flex items-center gap-8 mt-12 z-10 relative">
          
          {/* Left indicator btn */}
          <button
            id="testimonial-prev-btn"
            onClick={handlePrevSlide}
            className="h-11 w-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 flex items-center justify-center cursor-pointer transition-all hover:scale-105"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dots Indicator circles */}
          <div className="flex items-center gap-2.5">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                id={`testimonial-dot-${idx}`}
                onClick={() => {
                  setSlideDirection(idx > activeIndex ? 'right' : 'left');
                  setActiveIndex(idx);
                }}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx ? 'w-8 bg-indigo-500' : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                }`}
                aria-label={`Go to testimonial slider ${idx + 1}`}
              />
            ))}
          </div>

          {/* Right indicator btn */}
          <button
            id="testimonial-next-btn"
            onClick={handleNextSlide}
            className="h-11 w-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 flex items-center justify-center cursor-pointer transition-all hover:scale-105"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
