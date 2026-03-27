import { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'חברי קבוצה פותחים את הבית',
    description: 'מי שיש לו מקום מתאים ורוצה לארח — פותח את הדלת למפגש קטן ואיכותי.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'נרשמים למפגש שמתאים לכם',
    description: 'בוחרים בית פתוח לפי אזור, יום ושעה — ונרשמים בקלות.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'נפגשים, מתחברים, ומתקדמים יחד',
    description: 'מפגש אינטימי שבו כל אחד מביא רעיון, מתחייב לצעד, ומקבל תמיכה.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-cream-dark noise-overlay relative overflow-hidden w-full flex flex-col items-center">
      {/* Background decoration */}
      <div className="absolute top-10 left-[5%] w-64 h-64 rounded-full bg-sage/[0.03] blur-3xl floating-shape-4" />
      <div className="absolute bottom-10 right-[8%] w-48 h-48 rounded-full bg-copper/[0.04] blur-2xl floating-shape-1" />

      {/* Subtle connecting lines easter egg */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1200 500" fill="none" aria-hidden="true">
        <path d="M200 250 Q400 100 600 250 Q800 400 1000 250" stroke="#5D7A50" strokeWidth="1.5" strokeDasharray="8 8" />
      </svg>

      <div className="relative z-10 w-full max-w-5xl px-6">
        <h2 className="animate-on-scroll text-center text-charcoal font-bold text-3xl sm:text-4xl mb-4">
          איך זה עובד?
        </h2>
        <p className="animate-on-scroll stagger-1 text-center text-muted text-lg mb-14">
          שלושה צעדים פשוטים לחיבור עסקי אמיתי
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`animate-on-scroll stagger-${i + 2} bg-card rounded-2xl p-8 text-center shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-border hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 cursor-default`}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sage/15 text-sage mb-6">
                {step.icon}
              </div>

              {/* Step number */}
              <span className="block text-sage/20 font-black text-5xl mb-2 select-none">
                {step.number}
              </span>

              {/* Title */}
              <h3 className="text-charcoal font-bold text-lg mb-3 leading-snug">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-muted text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Small coffee cup easter egg */}
      <svg className="absolute bottom-6 left-12 w-6 h-6 text-taupe/30 floating-shape-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M2 21h18v-2H2v2zm2-4h14V7H4v10zm16-10h-2V5H4V3h16v8h2c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" />
      </svg>
    </section>
  );
}
