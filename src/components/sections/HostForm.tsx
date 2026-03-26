import { useState, useEffect, useRef } from 'react';
import { FormField } from '../ui/FormField';
import { Button } from '../ui/Button';

const dayOptions = [
  { value: 'יום ראשון', label: 'יום ראשון' },
  { value: 'יום שני', label: 'יום שני' },
  { value: 'יום שלישי', label: 'יום שלישי' },
  { value: 'יום רביעי', label: 'יום רביעי' },
  { value: 'יום חמישי', label: 'יום חמישי' },
];

const initialForm = {
  name: '',
  area: '',
  phone: '',
  preferredDay: '',
  preferredTime: '',
  capacity: '',
  hasSafeRoom: 'true',
  notes: '',
};

export function HostForm() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);

  const update = (field: string) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/host-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          capacity: parseInt(form.capacity) || 0,
          hasSafeRoom: form.hasSafeRoom === 'true',
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'שגיאה בשליחה');
      }

      setSuccess(true);
      setForm(initialForm);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="host-form" ref={sectionRef} className="py-20 sm:py-28 bg-cream-dark">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="animate-on-scroll text-center text-charcoal font-bold text-3xl sm:text-4xl mb-4">
          רוצים לארח?
        </h2>
        <p className="animate-on-scroll stagger-1 text-center text-muted text-base sm:text-lg mb-12 max-w-lg mx-auto leading-relaxed">
          אם יש לכם בית עם מרחב מוגן זמין ואתם רוצים לפתוח אותו למפגש קטן של
          חברי הקבוצה, השאירו פרטים ונחזור אליכם.
        </p>

        {success ? (
          <div className="animate-on-scroll bg-card rounded-2xl border border-border p-10 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5D7A50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="text-charcoal font-bold text-xl mb-2">תודה רבה!</h3>
            <p className="text-muted">
              קיבלנו את הפרטים שלכם ונחזור אליכם בהקדם.
            </p>
            <Button
              className="mt-6"
              variant="secondary"
              onClick={() => setSuccess(false)}
            >
              שליחת בקשה נוספת
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="animate-on-scroll stagger-2 bg-card rounded-2xl border border-border p-8 shadow-sm space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField
                label="שם מלא"
                name="host-name"
                value={form.name}
                onChange={update('name')}
                required
                placeholder="השם שלכם"
              />
              <FormField
                label="אזור"
                name="host-area"
                value={form.area}
                onChange={update('area')}
                required
                placeholder="עיר / ישוב"
              />
            </div>

            <FormField
              label="טלפון"
              name="host-phone"
              type="tel"
              value={form.phone}
              onChange={update('phone')}
              required
              placeholder="050-0000000"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField
                label="יום מועדף"
                name="host-day"
                type="select"
                value={form.preferredDay}
                onChange={update('preferredDay')}
                options={dayOptions}
              />
              <FormField
                label="שעה מועדפת"
                name="host-time"
                value={form.preferredTime}
                onChange={update('preferredTime')}
                placeholder="לדוגמה: 20:00"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField
                label="כמה אנשים אפשר לארח"
                name="host-capacity"
                type="number"
                value={form.capacity}
                onChange={update('capacity')}
                placeholder="3-6"
              />
              <FormField
                label="יש מרחב מוגן זמין?"
                name="host-saferoom"
                type="select"
                value={form.hasSafeRoom}
                onChange={update('hasSafeRoom')}
                options={[
                  { value: 'true', label: 'כן' },
                  { value: 'false', label: 'לא' },
                ]}
              />
            </div>

            <FormField
              label="הערות"
              name="host-notes"
              type="textarea"
              value={form.notes}
              onChange={update('notes')}
              placeholder="משהו שחשוב לדעת? (חניה, קומה, כל דבר רלוונטי)"
            />

            {error && (
              <p className="text-copper text-sm font-medium">{error}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={submitting}
            >
              {submitting ? 'שולח...' : 'שלחו לי פרטים'}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
