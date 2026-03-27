import { useState, useEffect, useRef } from 'react';
import type { HostWithSignups } from '../../types';
import { hosts as staticHosts } from '../../data/hosts';
import { HostCard } from '../ui/HostCard';
import { Button } from '../ui/Button';

// Start with static data (0 signups), then hydrate from API
function initialHosts(): HostWithSignups[] {
  return staticHosts.map((h) => ({ ...h, signupCount: 0 }));
}

export function OpenHousesList() {
  const [hosts, setHosts] = useState<HostWithSignups[]>(initialHosts);
  const [signupModal, setSignupModal] = useState<string | null>(null);
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch real signup counts from API
  const fetchHosts = async () => {
    try {
      const res = await fetch('/api/hosts');
      if (res.ok) {
        const data = await res.json();
        setHosts(data);
      }
    } catch {
      // API unavailable — keep static data
    }
  };

  useEffect(() => {
    fetchHosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [hosts]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupModal) return;

    setSubmitting(true);
    setSignupError('');

    try {
      const res = await fetch('/api/signups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hostId: signupModal,
          name: signupName,
          phone: signupPhone,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'שגיאה בהרשמה');
      }

      setSignupSuccess(true);
      fetchHosts(); // Refresh counts

      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (err: any) {
      setSignupError(err.message || 'שגיאה בהרשמה, נסו שוב');
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setSignupModal(null);
    setSignupName('');
    setSignupPhone('');
    setSignupSuccess(false);
    setSignupError('');
  };

  const selectedHost = hosts.find((h) => h.id === signupModal);

  return (
    <section id="open-houses" ref={sectionRef} className="py-20 sm:py-28 bg-cream relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[15%] right-[3%] w-72 h-72 rounded-full bg-taupe/[0.06] blur-3xl floating-shape-2" />
      <div className="absolute bottom-[10%] left-[5%] w-56 h-56 rounded-full bg-sage/[0.04] blur-3xl floating-shape-4" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-copper/[0.02] blur-3xl" />

      {/* Dot grid background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle, #2D2D2D 0.5px, transparent 0.5px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Key easter egg */}
      <svg className="absolute top-8 right-16 w-5 h-5 text-sage/[0.08] floating-shape-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.65 10A5.99 5.99 0 007 6c-3.31 0-6 2.69-6 6s2.69 6 6 6a5.99 5.99 0 005.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <h2 className="animate-on-scroll text-center text-charcoal font-bold text-3xl sm:text-4xl mb-4">
          הבתים הפתוחים
        </h2>
        <p className="animate-on-scroll stagger-1 text-center text-muted text-lg mb-14 max-w-md mx-auto">
          בחרו מפגש שמתאים לכם והירשמו
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {hosts.map((host, i) => (
            <div
              key={host.id}
              className={`animate-on-scroll stagger-${Math.min(i + 1, 5)} flex flex-col w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]`}
            >
              <HostCard
                host={host}
                onSignup={(id) => setSignupModal(id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Signup Modal */}
      {signupModal && (
        <div
          className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="modal-content bg-card rounded-2xl shadow-xl max-w-md w-full p-8 border border-border">
            {signupSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5D7A50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="text-charcoal font-bold text-xl mb-2">נרשמתם בהצלחה!</h3>
                <p className="text-muted">
                  נתראה אצל {selectedHost?.name} ב{selectedHost?.day}
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-charcoal font-bold text-xl mb-1">הרשמה למפגש</h3>
                <p className="text-muted text-sm mb-6">
                  {selectedHost?.name} — {selectedHost?.area} — {selectedHost?.day} {selectedHost?.time}
                </p>

                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="signup-name" className="text-sm font-medium text-charcoal">
                      שם מלא <span className="text-copper">*</span>
                    </label>
                    <input
                      id="signup-name"
                      type="text"
                      required
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-foreground font-heebo placeholder:text-dim focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-colors"
                      placeholder="השם שלכם"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="signup-phone" className="text-sm font-medium text-charcoal">
                      טלפון <span className="text-copper">*</span>
                    </label>
                    <input
                      id="signup-phone"
                      type="tel"
                      required
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-foreground font-heebo placeholder:text-dim focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-colors"
                      placeholder="050-0000000"
                      dir="ltr"
                    />
                  </div>

                  {signupError && (
                    <p className="text-copper text-sm font-medium">{signupError}</p>
                  )}

                  <div className="flex gap-3 mt-2">
                    <Button type="submit" variant="primary" className="flex-1" disabled={submitting}>
                      {submitting ? 'שולח...' : 'אישור הרשמה'}
                    </Button>
                    <Button type="button" variant="secondary" onClick={closeModal}>
                      ביטול
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
