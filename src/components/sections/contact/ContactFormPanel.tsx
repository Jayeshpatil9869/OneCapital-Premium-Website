import { FormEvent, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  Button,
  InputField,
  SectionHeading,
  SelectField,
  TextareaField,
} from '@/src/components/ui';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import {
  CONTACT_FORM_PLACEHOLDERS,
  CONTACT_INTEREST_OPTIONS,
  CONTACT_PAGE_COPY,
} from '@/src/data/contact';
import { ContactSurface } from './ContactSurface';

export function ContactFormPanel() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitted(true);
  };

  const note = CONTACT_PAGE_COPY.confidentialityNote;
  const accent = CONTACT_PAGE_COPY.confidentialityAccent;
  const accentIndex = note.toLowerCase().indexOf(accent.toLowerCase());

  return (
    <RevealOnScroll delay={0.15} className="w-full lg:ml-auto lg:max-w-lg xl:max-w-xl">
      <ContactSurface>
        {submitted ? (
          <div className="flex min-h-[min(18rem,60svh)] flex-col items-center justify-center gap-5 py-10 text-center sm:min-h-[320px] sm:gap-6 sm:py-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brand/40 bg-brand/10 text-brand">
              <CheckCircle2 className="h-7 w-7" strokeWidth={2} aria-hidden />
            </div>
            <div>
              <SectionHeading as="h2" className="mb-3 text-xl sm:text-2xl">
                {CONTACT_PAGE_COPY.successTitle}
              </SectionHeading>
              <p className="mx-auto max-w-sm text-sm leading-relaxed text-white/60">
                {CONTACT_PAGE_COPY.successMessage}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSubmitted(false)}
              className="mt-2 min-h-11 font-mono text-[10px] uppercase tracking-widest"
            >
              {CONTACT_PAGE_COPY.submitAnotherLabel}
            </Button>
          </div>
        ) : (
          <>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 sm:mb-6">
              {CONTACT_PAGE_COPY.formTitle}
            </p>

            <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit} noValidate>
              <InputField
                id="fullName"
                name="fullName"
                label="Name"
                type="text"
                required
                autoComplete="name"
                placeholder={CONTACT_FORM_PLACEHOLDERS.fullName}
              />

              <InputField
                id="email"
                name="email"
                label="Email ID"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                placeholder={CONTACT_FORM_PLACEHOLDERS.email}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <InputField
                  id="phone"
                  name="phone"
                  label="Mobile Number"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  className="tabular-nums"
                  placeholder={CONTACT_FORM_PLACEHOLDERS.phone}
                />
                <SelectField
                  id="interest"
                  name="interest"
                  label="Primary Interest"
                  required
                  defaultValue=""
                  placeholder={CONTACT_FORM_PLACEHOLDERS.interest}
                  options={CONTACT_INTEREST_OPTIONS}
                />
              </div>

              <TextareaField
                id="message"
                name="message"
                label="Message / Portfolio Brief"
                rows={3}
                placeholder={CONTACT_FORM_PLACEHOLDERS.message}
              />

              <div className="mt-1">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="min-h-12 w-full justify-center rounded-full py-3.5 text-base font-semibold tracking-wide sm:py-4"
                >
                  {CONTACT_PAGE_COPY.submitLabel}
                </Button>
              </div>

              <p className="px-1 text-center text-[11px] leading-relaxed text-white/45 sm:text-xs">
                {accentIndex >= 0 ? (
                  <>
                    {note.slice(0, accentIndex)}
                    <span className="text-gold">{note.slice(accentIndex, accentIndex + accent.length)}</span>
                    {note.slice(accentIndex + accent.length)}
                  </>
                ) : (
                  note
                )}
              </p>
            </form>
          </>
        )}
      </ContactSurface>
    </RevealOnScroll>
  );
}
