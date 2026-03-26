export function Footer() {
  return (
    <footer className="py-16 bg-cream border-t border-sand relative overflow-hidden">
      {/* Subtle network echo in footer */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 800 200" fill="none" aria-hidden="true">
        {[[100, 50, 250, 100], [250, 100, 400, 40], [400, 40, 550, 120], [550, 120, 700, 60]].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5D7A50" strokeWidth="1" />
        ))}
        {[[100, 50], [250, 100], [400, 40], [550, 120], [700, 60]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5" fill="#5D7A50" />
        ))}
      </svg>

      {/* Heart easter egg */}
      <svg className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4 h-4 text-copper/[0.12]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Closing quote */}
        <p className="text-charcoal text-xl sm:text-2xl font-light leading-relaxed mb-8">
          לפעמים כל מה שצריך כדי להמשיך קדימה,
          <br />
          זה <span className="font-semibold text-sage">בית פתוח</span>,{' '}
          <span className="font-semibold text-sage">לב פתוח</span>,
          <br />
          ואנשים טובים סביבך.
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-px bg-sand" />
          <svg className="w-4 h-4 text-sage/30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
          </svg>
          <div className="w-8 h-px bg-sand" />
        </div>

        {/* BNI branding */}
        <p className="text-muted text-sm">
          יוזמה של קבוצת BNI פארק המדע
        </p>
        <p className="text-dim text-xs mt-2">
          בית פתוח לעסקים &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
