import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Send, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { prefersReducedMotion } from '@/src/lib/motion';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

const WELCOME_MESSAGE =
  'Welcome to One Capital. How can we help with your wealth goals today? You can also book a consultation anytime.';

const PLACEHOLDER_REPLY =
  'Thanks — our team will follow up. For now, use Book Consultation to start a conversation with an advisor.';

function createMessage(role: ChatRole, text: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    text,
  };
}

/** Same surfaces as Navbar pill: white frosted glass vs black glass over `.light-section`. */
const SURFACE_GLASS =
  'bg-white/[0.02] backdrop-blur-xl border border-white/10';
const SURFACE_OVER_LIGHT =
  'bg-black/80 backdrop-blur-xl border border-white/10';

export default function ChatWidget() {
  const panelId = useId();
  const inputId = useId();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [overLight, setOverLight] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const welcomeSeeded = useRef(false);

  useEffect(() => {
    const updateOverLight = () => {
      // Probe near the FAB (bottom-right), not the nav band.
      const probeY = Math.max(0, window.innerHeight - 56);
      const lightSections = document.querySelectorAll('.light-section');
      let isOverLight = false;
      lightSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          isOverLight = true;
        }
      });
      setOverLight(isOverLight);
    };

    updateOverLight();
    window.addEventListener('scroll', updateOverLight, { passive: true });
    window.addEventListener('resize', updateOverLight);
    return () => {
      window.removeEventListener('scroll', updateOverLight);
      window.removeEventListener('resize', updateOverLight);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    if (!welcomeSeeded.current) {
      welcomeSeeded.current = true;
      setMessages([createMessage('assistant', WELCOME_MESSAGE)]);
    }
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    setInput('');
    setMessages((prev) => [
      ...prev,
      createMessage('user', text),
      createMessage('assistant', PLACEHOLDER_REPLY),
    ]);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    sendMessage();
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const instant = prefersReducedMotion();
  const shellSurface = overLight ? SURFACE_OVER_LIGHT : SURFACE_GLASS;
  const stripTone = overLight ? 'bg-black/40' : 'bg-white/[0.02]';
  const fieldSurface = overLight
    ? 'bg-black/50 backdrop-blur-md border border-white/15'
    : 'bg-white/[0.02] backdrop-blur-xl border border-white/10';
  const assistantBubble = overLight
    ? 'bg-white/10 border border-white/10'
    : 'bg-white/[0.02] border border-white/10 backdrop-blur-xl';

  return (
    <div
      className={cn(
        'fixed z-[var(--z-toast)] flex flex-col items-end gap-3',
        'bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))]',
      )}
    >
      <div
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-label="One Capital chat"
        aria-hidden={!open}
        className={cn(
          'w-[min(22.5rem,calc(100vw-2rem))] max-h-[min(70vh,32rem)] flex flex-col rounded-2xl shadow-2xl overflow-hidden',
          shellSurface,
          instant ? 'transition-none' : 'transition-all duration-300',
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none invisible',
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 shrink-0',
            stripTone,
          )}
        >
          <div className="min-w-0">
            <p className="text-sm font-medium text-white tracking-tight truncate">One Capital</p>
            <p className="text-[11px] font-mono uppercase tracking-widest text-text-muted">Advisory chat</p>
          </div>
          <button
            type="button"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden />
          </button>
        </div>

        <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3 min-h-[12rem]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                message.role === 'user'
                  ? 'ml-auto bg-white text-black'
                  : cn('mr-auto text-white/90', assistantBubble),
              )}
            >
              {message.text}
            </div>
          ))}
        </div>

        <div className="px-4 pb-2 shrink-0">
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="text-xs text-text-muted hover:text-white underline-offset-4 hover:underline transition-colors"
          >
            Book Consultation
          </Link>
        </div>

        <form
          onSubmit={onSubmit}
          className={cn(
            'flex items-center gap-2 px-3 py-3 border-t border-white/10 shrink-0',
            stripTone,
          )}
        >
          <label htmlFor={inputId} className="sr-only">
            Message
          </label>
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Type a message…"
            autoComplete="off"
            className={cn(
              'min-h-11 flex-1 rounded-xl px-3 text-sm text-white placeholder:text-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
              fieldSurface,
            )}
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!input.trim()}
            className={cn(
              'inline-flex items-center justify-center min-h-11 min-w-11 rounded-xl text-white hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none transition-colors',
              fieldSurface,
            )}
          >
            <Send className="w-4 h-4" aria-hidden />
          </button>
        </form>
      </div>

      <button
        type="button"
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'inline-flex items-center justify-center min-h-14 min-w-14 rounded-full text-white shadow-lg',
          shellSurface,
          overLight ? 'hover:bg-black/90' : 'hover:bg-white/10',
          'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
        )}
      >
        {open ? <X className="w-6 h-6" aria-hidden /> : <MessageCircle className="w-6 h-6" aria-hidden />}
      </button>
    </div>
  );
}
