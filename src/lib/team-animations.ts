import gsap from 'gsap';
import { prefersReducedMotion } from '@/src/lib/motion';

export const IMAGE_HOVER_SCALE = 0.97;
export const IMAGE_HOVER_Y = -6;
export const IMAGE_FLOAT_DURATION = 0.78;
export const CARD_LIFT_Y = -6;

// Custom ease: cubic-bezier(0.22, 1, 0.36, 1)
export const teamFloatEase = 'cubic-bezier(0.22, 1, 0.36, 1)';

export function setTeamCardInstant(cardEl: HTMLElement, isExpanded: boolean) {
  const image = cardEl.querySelector<HTMLElement>('[data-team-image]');
  const info = cardEl.querySelector<HTMLElement>('[data-team-info]');
  const name = cardEl.querySelector<HTMLElement>('[data-team-name]');
  const desc = cardEl.querySelector<HTMLElement>('[data-team-desc]');
  const tag = cardEl.querySelector<HTMLElement>('[data-team-tag]');
  const cta = cardEl.querySelector<HTMLElement>('[data-team-cta]');

  if (isExpanded) {
    cardEl.classList.add('is-expanded');
    gsap.set(cardEl, { y: CARD_LIFT_Y });
    if (image) gsap.set(image, { scale: IMAGE_HOVER_SCALE, y: IMAGE_HOVER_Y, transformOrigin: '50% 100%' });
    if (info) gsap.set(info, { height: 'auto', overflow: 'visible' });
    if (name) gsap.set(name, { y: 0, autoAlpha: 1 });
    if (desc) gsap.set(desc, { y: 0, autoAlpha: 1 });
    if (tag) gsap.set(tag, { y: 0, autoAlpha: 1 });
    if (cta) gsap.set(cta, { y: 0, autoAlpha: 1 });
  } else {
    cardEl.classList.remove('is-expanded');
    gsap.set(cardEl, { y: 0 });
    if (image) gsap.set(image, { scale: 1, y: 0, transformOrigin: '50% 100%' });
    if (info) gsap.set(info, { height: 0, overflow: 'hidden' });
    if (name) gsap.set(name, { y: 12, autoAlpha: 0 });
    if (desc) gsap.set(desc, { y: 12, autoAlpha: 0 });
    if (tag) gsap.set(tag, { y: 12, autoAlpha: 0 });
    if (cta) gsap.set(cta, { y: 12, autoAlpha: 0 });
  }
}

export function expandTeamCard(cardEl: HTMLElement): gsap.core.Timeline | void {
  if (prefersReducedMotion()) {
    setTeamCardInstant(cardEl, true);
    return;
  }

  const image = cardEl.querySelector<HTMLElement>('[data-team-image]');
  const info = cardEl.querySelector<HTMLElement>('[data-team-info]');
  const inner = cardEl.querySelector<HTMLElement>('[data-team-info-inner]');
  const name = cardEl.querySelector<HTMLElement>('[data-team-name]');
  const desc = cardEl.querySelector<HTMLElement>('[data-team-desc]');
  const tag = cardEl.querySelector<HTMLElement>('[data-team-tag]');
  const cta = cardEl.querySelector<HTMLElement>('[data-team-cta]');

  if (!info || !inner) return;

  // Kill existing tweens on these elements
  gsap.killTweensOf([cardEl, image, info, name, desc, tag, cta].filter(Boolean));

  // Measure target height
  info.style.height = 'auto';
  info.style.overflow = 'visible';
  const targetHeight = inner.scrollHeight;
  info.style.height = '0px';
  info.style.overflow = 'hidden';

  const tl = gsap.timeline({
    onStart: () => {
      cardEl.classList.add('is-expanded');
    },
    onComplete: () => {
      info.style.height = 'auto';
      info.style.overflow = 'visible';
    },
  });

  // 0.00: card.y -> -6 & image scale/y (teamFloat, 0.78s)
  tl.to(
    cardEl,
    {
      y: CARD_LIFT_Y,
      duration: IMAGE_FLOAT_DURATION,
      ease: teamFloatEase,
      overwrite: 'auto',
    },
    0
  );

  if (image) {
    tl.to(
      image,
      {
        scale: IMAGE_HOVER_SCALE,
        y: IMAGE_HOVER_Y,
        transformOrigin: '50% 100%',
        duration: IMAGE_FLOAT_DURATION,
        ease: teamFloatEase,
        overwrite: 'auto',
      },
      0
    );
  }

  // 0.05: info height 0 -> full scrollHeight (power3.inOut, 0.62s)
  tl.fromTo(
    info,
    { height: 0 },
    {
      height: targetHeight,
      duration: 0.62,
      ease: 'power3.inOut',
      overwrite: 'auto',
    },
    0.05
  );

  // 0.26: name y18/autoAlpha0 -> 0/1 (power3.out, 0.42s)
  if (name) {
    tl.fromTo(
      name,
      { y: 18, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.42, ease: 'power3.out' },
      0.26
    );
  }

  // 0.34: desc y18/autoAlpha0 -> 0/1 (power3.out, 0.40s)
  if (desc) {
    tl.fromTo(
      desc,
      { y: 18, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power3.out' },
      0.34
    );
  }

  // 0.42: tag y18/autoAlpha0 -> 0/1 (power3.out, 0.32s)
  if (tag) {
    tl.fromTo(
      tag,
      { y: 18, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.32, ease: 'power3.out' },
      0.42
    );
  }

  // 0.46: cta y18/autoAlpha0 -> 0/1 (power3.out, 0.36s)
  if (cta) {
    tl.fromTo(
      cta,
      { y: 18, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.36, ease: 'power3.out' },
      0.46
    );
  }

  return tl;
}

export function collapseTeamCard(cardEl: HTMLElement): gsap.core.Timeline | void {
  if (prefersReducedMotion()) {
    setTeamCardInstant(cardEl, false);
    return;
  }

  const image = cardEl.querySelector<HTMLElement>('[data-team-image]');
  const info = cardEl.querySelector<HTMLElement>('[data-team-info]');
  const name = cardEl.querySelector<HTMLElement>('[data-team-name]');
  const desc = cardEl.querySelector<HTMLElement>('[data-team-desc]');
  const tag = cardEl.querySelector<HTMLElement>('[data-team-tag]');
  const cta = cardEl.querySelector<HTMLElement>('[data-team-cta]');

  if (!info) return;

  gsap.killTweensOf([cardEl, image, info, name, desc, tag, cta].filter(Boolean));

  const items = [cta, tag, desc, name].filter(Boolean);

  const tl = gsap.timeline({
    onComplete: () => {
      cardEl.classList.remove('is-expanded');
      info.style.height = '0px';
      info.style.overflow = 'hidden';
    },
  });

  // 0.00: [cta, tag, desc, name] -> y12, autoAlpha0, stagger 0.035, duration 0.28, power2.out
  if (items.length > 0) {
    tl.to(
      items,
      {
        y: 12,
        autoAlpha: 0,
        stagger: 0.035,
        duration: 0.28,
        ease: 'power2.out',
      },
      0
    );
  }

  // 0.06: info height -> 0 (power3.inOut, 0.55s)
  tl.to(
    info,
    {
      height: 0,
      duration: 0.55,
      ease: 'power3.inOut',
      overwrite: 'auto',
    },
    0.06
  );

  // 0.00: card.y -> 0 + image scale/y -> 1/0 (teamFloat, 0.78s)
  tl.to(
    cardEl,
    {
      y: 0,
      duration: IMAGE_FLOAT_DURATION,
      ease: teamFloatEase,
      overwrite: 'auto',
    },
    0
  );

  if (image) {
    tl.to(
      image,
      {
        scale: 1,
        y: 0,
        transformOrigin: '50% 100%',
        duration: IMAGE_FLOAT_DURATION,
        ease: teamFloatEase,
        overwrite: 'auto',
      },
      0
    );
  }

  return tl;
}
