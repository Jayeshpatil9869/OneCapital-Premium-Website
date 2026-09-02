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
          <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-8 w-8" strokeWidth={2} aria-hidden />
            </div>
            <div>
              <SectionHeading as="h2" className="mb-3 text-2xl">
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
              className="mt-4 font-mono text-[10px] uppercase tracking-widest"
            >
              {CONTACT_PAGE_COPY.submitAnotherLabel}
            </Button>
          </div>
        ) : (
          <>
            <SectionHeading as="h2" className="mb-8 text-2xl md:text-3xl">
              {CONTACT_PAGE_COPY.formTitle}
            </SectionHeading>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
              <InputField
                id="fullName"
                name="fullName"
                label="Full Name"
                type="text"
                required
                placeholder={CONTACT_FORM_PLACEHOLDERS.fullName}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <InputField
                  id="email"
                  name="email"
                  label="Professional Email"
                  type="email"
                  required
                  placeholder={CONTACT_FORM_PLACEHOLDERS.email}
                />
                <InputField
                  id="phone"
                  name="phone"
                  label="Phone"
                  type="tel"
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
              >
                <option value="" disabled className="bg-[#080808] text-white/50">
                  {CONTACT_FORM_PLACEHOLDERS.interest}
                </option>
                {CONTACT_INTEREST_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-[#080808] text-white"
                  >
                    {option.label}
                  </option>
                ))}
              </SelectField>

              <TextareaField
                id="message"
                name="message"
                label="Message / Portfolio Brief"
                rows={4}
                placeholder={CONTACT_FORM_PLACEHOLDERS.message}
              />

              <div className="mt-6">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  arrow="right"
                  className="w-full py-4 font-semibold uppercase tracking-wider"
                >
                  {CONTACT_PAGE_COPY.submitLabel}
                </Button>
              </div>

              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-white/40">
                {CONTACT_PAGE_COPY.confidentialityNote}
              </p>
            </form>
          </>
        )}
      </ContactSurface>
    </RevealOnScroll>
  );
}
