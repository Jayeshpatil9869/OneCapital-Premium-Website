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

  return (
    <RevealOnScroll delay={0.2} className="w-full">
      <ContactSurface>
        {submitted ? (
          <div className="flex min-h-[min(22rem,70svh)] flex-col items-center justify-center gap-5 py-12 text-center sm:min-h-[400px] sm:gap-6 sm:py-16">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white sm:h-16 sm:w-16">
              <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2} aria-hidden />
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
              className="mt-2 min-h-11 font-mono text-[10px] uppercase tracking-widest sm:mt-4"
            >
              {CONTACT_PAGE_COPY.submitAnotherLabel}
            </Button>
          </div>
        ) : (
          <>
            <SectionHeading as="h2" className="mb-6 text-xl leading-tight sm:mb-8 sm:text-2xl md:text-3xl">
              {CONTACT_PAGE_COPY.formTitle}
            </SectionHeading>

            <form className="flex flex-col gap-5 sm:gap-6" onSubmit={handleSubmit} noValidate>
              <InputField
                id="fullName"
                name="fullName"
                label="Full Name"
                type="text"
                required
                autoComplete="name"
                placeholder={CONTACT_FORM_PLACEHOLDERS.fullName}
              />

              {/* Stack email/phone while the page is 2-col (narrow half-width); side-by-side on full-width tablet + wide desktop */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-1 xl:grid-cols-2">
                <InputField
                  id="email"
                  name="email"
                  label="Professional Email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder={CONTACT_FORM_PLACEHOLDERS.email}
                />
                <InputField
                  id="phone"
                  name="phone"
                  label="Phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  className="tabular-nums"
                  placeholder={CONTACT_FORM_PLACEHOLDERS.phone}
                />
              </div>

              <SelectField
                id="interest"
                name="interest"
                label="Primary Interest"
                required
                defaultValue=""
                placeholder={CONTACT_FORM_PLACEHOLDERS.interest}
                options={CONTACT_INTEREST_OPTIONS}
              />

              <TextareaField
                id="message"
                name="message"
                label="Message / Portfolio Brief"
                rows={4}
                placeholder={CONTACT_FORM_PLACEHOLDERS.message}
              />

              <div className="mt-1 sm:mt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="min-h-12 w-full justify-center py-3.5 text-base font-semibold tracking-wide sm:py-4"
                >
                  {CONTACT_PAGE_COPY.submitLabel}
                </Button>
              </div>

              <p className="px-1 text-center font-mono text-[10px] uppercase leading-relaxed tracking-widest text-white/40">
                {CONTACT_PAGE_COPY.confidentialityNote}
              </p>
            </form>
          </>
        )}
      </ContactSurface>
    </RevealOnScroll>
  );
}
