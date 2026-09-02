import { Container, Section } from '@/src/components/ui';
import { ContactFormPanel } from '@/src/components/sections/contact/ContactFormPanel';
import { ContactInfoPanel } from '@/src/components/sections/contact/ContactInfoPanel';

export default function Contact() {
  return (
    <Section pad="none" className="pb-20 pt-32 md:pt-40">
      <Container>
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
          <ContactInfoPanel />
          <ContactFormPanel />
        </div>
      </Container>
    </Section>
  );
}
