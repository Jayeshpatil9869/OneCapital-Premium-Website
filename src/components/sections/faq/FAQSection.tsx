import { useId, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  Button,
  Container,
  Section,
  Eyebrow,
  SectionHeading,
  BodyText,
} from '@/src/components/ui';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import {
  FAQ_ALL_ID,
  HOME_FAQ_CATEGORIES,
  getAllFAQQuestions,
  getCategoryTitle,
  getFAQQuestionsForCategory,
  type FAQQuestion,
} from '@/src/data/home-faq';
import { cn } from '@/src/lib/utils';

const FAQ_ALL_INITIAL_COUNT = 4;

type FAQCategoryNavProps = {
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
};

function FAQCategoryNav({ activeId, onSelect, className }: FAQCategoryNavProps) {
  const allCount = getAllFAQQuestions().length;

  const items = [
    { id: FAQ_ALL_ID, title: 'All', count: allCount },
    ...HOME_FAQ_CATEGORIES.map((category) => ({
      id: category.id,
      title: category.title,
      count: category.questions.length,
    })),
  ];

  return (
    <nav aria-label="FAQ categories" className={cn('flex flex-col gap-2', className)}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            aria-current={active ? 'true' : undefined}
            onClick={() => onSelect(item.id)}
            className={cn(
              'w-full flex items-center justify-between gap-4 rounded-2xl border px-4 py-3.5 min-h-11 text-left transition-colors duration-500',
              active
                ? 'bg-white text-black border-white'
                : 'bg-white/[0.02] text-white/70 border-white/10 hover:border-white/25 hover:text-white',
            )}
          >
            <span className="text-xs uppercase tracking-widest font-mono">{item.title}</span>
            <span className="flex items-center gap-2 shrink-0">
              <span
                className={cn(
                  'text-xs font-mono tabular-nums',
                  active ? 'text-black/50' : 'text-white/40',
                )}
              >
                {String(item.count).padStart(2, '0')}
              </span>
              <ChevronRight
                className={cn('w-4 h-4', active ? 'text-black/50' : 'text-white/30')}
                aria-hidden
              />
            </span>
          </button>
        );
      })}
    </nav>
  );
}

type FAQAccordionItemProps = {
  index: number;
  categoryLabel: string;
  item: FAQQuestion;
  isOpen: boolean;
  onToggle: () => void;
};

function FAQAccordionItem({
  index,
  categoryLabel,
  item,
  isOpen,
  onToggle,
}: FAQAccordionItemProps) {
  const panelId = `${item.id}-panel`;
  const buttonId = `${item.id}-button`;

  return (
    <article className="glass-panel rounded-2xl oc-card-hover-glow transition-colors duration-500 hover:border-white/20">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full text-left px-5 py-5 md:px-6 md:py-6 flex items-start justify-between gap-6 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] uppercase tracking-[0.2em] font-mono text-white/40 mb-3">
              {String(index + 1).padStart(2, '0')} · {categoryLabel}
            </span>
            <span className="block text-lg md:text-xl font-medium tracking-tight text-white text-balance">
              {item.question}
            </span>
          </span>
          <span
            aria-hidden
            className={cn(
              'shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white/50 transition-transform duration-500',
              isOpen && 'rotate-180 bg-white text-black border-white',
            )}
          >
            <ChevronDown className="w-4 h-4" />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          'grid transition-[grid-template-rows] duration-500 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <p className="px-5 md:px-6 pb-5 md:pb-6 text-base text-text-muted leading-relaxed max-w-3xl">
            {item.answer}
          </p>
        </div>
      </div>
    </article>
  );
}

export function FAQSection() {
  const selectId = useId();
  const [activeCategoryId, setActiveCategoryId] = useState(FAQ_ALL_ID);
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  const categoryQuestions = useMemo(
    () => getFAQQuestionsForCategory(activeCategoryId),
    [activeCategoryId],
  );

  const isAllCategory = activeCategoryId === FAQ_ALL_ID;
  const hasMoreAllQuestions =
    isAllCategory && categoryQuestions.length > FAQ_ALL_INITIAL_COUNT;
  const visibleQuestions =
    isAllCategory && !showAllQuestions
      ? categoryQuestions.slice(0, FAQ_ALL_INITIAL_COUNT)
      : categoryQuestions;

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    setOpenIds(new Set());
    setShowAllQuestions(false);
  };

  const collapseAllQuestions = () => {
    setShowAllQuestions(false);
    setOpenIds((prev) => {
      const visibleIds = new Set(
        categoryQuestions.slice(0, FAQ_ALL_INITIAL_COUNT).map((item) => item.id),
      );
      return new Set([...prev].filter((id) => visibleIds.has(id)));
    });
  };

  const toggleQuestion = (questionId: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  const categoryLabelForQuestion = (questionId: string) => {
    for (const category of HOME_FAQ_CATEGORIES) {
      if (category.questions.some((question) => question.id === questionId)) {
        return category.title;
      }
    }
    return getCategoryTitle(activeCategoryId);
  };

  return (
    <Section pad="lg" aria-labelledby="faq-heading">
      <Container>
        <RevealOnScroll className="max-w-3xl mb-12 md:mb-16">
          <Eyebrow>Frequently Asked Questions</Eyebrow>
          <SectionHeading id="faq-heading" className="mt-6 mb-4">
            Questions worth asking.
          </SectionHeading>
          <BodyText className="text-base md:text-lg max-w-2xl">
            Wealth decisions deserve clarity. Explore the questions clients ask before beginning a
            long-term relationship with One Capital.
          </BodyText>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <RevealOnScroll className="hidden lg:block lg:col-span-4">
            <div className="glass-panel rounded-3xl p-3">
              <FAQCategoryNav activeId={activeCategoryId} onSelect={handleCategoryChange} />
            </div>
          </RevealOnScroll>

          <div className="lg:hidden">
            <label htmlFor={selectId} className="sr-only">
              FAQ category
            </label>
            <div className="relative">
              <select
                id={selectId}
                value={activeCategoryId}
                onChange={(event) => handleCategoryChange(event.target.value)}
                className="w-full appearance-none glass-panel rounded-2xl px-4 py-3.5 min-h-11 text-sm uppercase tracking-widest font-mono text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <option value={FAQ_ALL_ID}>All</option>
                {HOME_FAQ_CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
                aria-hidden
              />
            </div>
          </div>

          <RevealOnScroll stagger={0.06} className="lg:col-span-8 flex flex-col gap-3 md:gap-4">
            {visibleQuestions.map((item, index) => (
              <FAQAccordionItem
                key={item.id}
                index={index}
                categoryLabel={categoryLabelForQuestion(item.id)}
                item={item}
                isOpen={openIds.has(item.id)}
                onToggle={() => toggleQuestion(item.id)}
              />
            ))}

            {hasMoreAllQuestions && !showAllQuestions && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                sweep
                onClick={() => setShowAllQuestions(true)}
                className="mt-2 self-center lg:self-start font-mono tracking-widest text-xs"
              >
                Show More
              </Button>
            )}

            {hasMoreAllQuestions && showAllQuestions && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                sweep
                onClick={collapseAllQuestions}
                className="mt-2 self-center lg:self-start font-mono tracking-widest text-xs"
              >
                Show Less
              </Button>
            )}
          </RevealOnScroll>
        </div>

        <p className="mt-12 md:mt-16 text-center text-sm text-white/45 font-mono uppercase tracking-widest">
          Still have questions? The conversation begins with a consultation.
        </p>
      </Container>
    </Section>
  );
}
