import { Button } from '../ui/Button';
import { NetworkPattern } from '../ui/NetworkPattern';

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-cream">
      {/* Network pattern background */}
      <div className="absolute inset-0 opacity-60">
        <NetworkPattern />
      </div>

      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/80 to-cream-dark" />

      {/* Floating decorative shapes */}
      <div className="absolute top-[12%] right-[8%] w-40 h-40 rounded-full bg-sage/[0.04] blur-2xl floating-shape-1" />
      <div className="absolute bottom-[18%] left-[6%] w-56 h-56 rounded-full bg-copper/[0.05] blur-3xl floating-shape-2" />
      <div className="absolute top-[40%] left-[15%] w-24 h-24 rounded-full bg-taupe/[0.08] blur-xl floating-shape-3" />
      <div className="absolute top-[20%] left-[60%] w-32 h-32 rounded-full bg-sage/[0.03] blur-2xl floating-shape-4" />

      {/* Subtle dot grid easter egg */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #5D7A50 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Decorative corner accents */}
      <svg className="absolute top-8 right-8 w-20 h-20 text-sage/[0.08]" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <path d="M0 0 L80 0 L80 8 L8 8 L8 80 L0 80 Z" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-8 left-8 w-20 h-20 text-sage/[0.08]" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <path d="M80 80 L0 80 L0 72 L72 72 L72 0 L80 0 Z" fill="currentColor" />
      </svg>

      {/* Small house icon easter egg */}
      <svg className="absolute bottom-[22%] right-[12%] w-8 h-8 text-sage/[0.10] floating-shape-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
      </svg>

      {/* Small handshake easter egg */}
      <svg className="absolute top-[30%] left-[8%] w-7 h-7 text-copper/[0.10] floating-shape-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.22 19.85c-.18.18-.5.18-.67 0l-3.89-3.89a.475.475 0 010-.67l.67-.67c.18-.18.5-.18.67 0l2.89 2.89 6.89-6.89c.18-.18.5-.18.67 0l.67.67c.18.18.18.5 0 .67l-7.9 7.89zM2 8l5-4 3.5 2.8L14 4l5 4v1H2V8z" />
      </svg>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl px-6 py-20 text-center flex flex-col items-center">
        {/* English title */}
        <p className="hero-animate text-sage font-semibold tracking-[0.25em] uppercase text-sm mb-5">
          Open House for Business
        </p>

        {/* Hebrew title */}
        <h1 className="hero-animate hero-animate-delay-1 text-charcoal font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6">
          בית פתוח לעסקים
        </h1>

        {/* Decorative line */}
        <div className="hero-animate hero-animate-delay-1 w-24 h-1.5 bg-gradient-to-l from-sage/60 via-sage to-sage/60 rounded-full mb-8" />

        {/* Tagline */}
        <p className="hero-animate hero-animate-delay-2 text-muted text-xl sm:text-2xl font-light leading-relaxed mb-6">
          כשאי אפשר תמיד להיפגש בגדול,
          <br />
          <span className="text-charcoal font-medium">נפגשים נכון — בקטן.</span>
        </p>

        {/* Description */}
        <p className="hero-animate hero-animate-delay-3 text-muted text-base sm:text-lg max-w-xl leading-relaxed mb-12">
          יוזמה קהילתית-עסקית שמאפשרת לחברי הקבוצה להיפגש בבתים מארחים,
          להתחבר, ולייצר תנועה עסקית גם בדרך אחרת.
        </p>

        {/* CTA - large and prominent */}
        <div className="hero-animate hero-animate-delay-4">
          <Button as="a" href="#open-houses" variant="primary" className="text-lg sm:text-xl px-10 sm:px-14 py-5 sm:py-6 rounded-2xl shadow-xl hover:shadow-2xl cta-glow">
            לצפייה בבתים הפתוחים
          </Button>
        </div>

        {/* Scroll hint */}
        <div className="hero-animate hero-animate-delay-4 mt-14 scroll-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sage/40 mx-auto" aria-hidden="true">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream-dark to-transparent" />
    </section>
  );
}
