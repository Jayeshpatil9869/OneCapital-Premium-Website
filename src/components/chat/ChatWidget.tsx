import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { Send, X } from 'lucide-react';
import { ChatbotIcon } from '@/src/components/icons/ChatbotIcon';
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

export default function ChatWidget({
  embedded = false,
}: {
  embedded?: boolean;
  overLight?: boolean;
}) {
  const panelId = useId();
  const inputId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const welcomeSeeded = useRef(false);

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

  return (
    <div
      className={cn(
        embedded
          ? 'flex flex-col items-end justify-end gap-3 shrink-0'
          : cn(
              'fixed z-[var(--z-toast)] flex flex-col items-end gap-3',
              'bottom-[calc(max(1.25rem,env(safe-area-inset-bottom))+6.25rem)] right-[max(1rem,env(safe-area-inset-right))]',
            ),
      )}
    >
      <div
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-label="One Capital chat"
        aria-hidden={!open}
        className={cn(
          'max-h-[min(70vh,32rem)] flex flex-col rounded-2xl overflow-hidden',
          'bg-[#0b0c0e]/92 backdrop-blur-2xl border border-white/15 shadow-[0_24px_60px_-10px_rgba(0,0,0,0.9)]',
          instant ? 'transition-none' : 'transition-all duration-300',
          open
            ? 'w-[min(22.5rem,calc(100dvw-2rem))] opacity-100 translate-y-0 pointer-events-auto'
            : 'invisible pointer-events-none h-0 w-0 max-h-0 opacity-0 overflow-hidden border-0',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 py-3.5 bg-black/40 border-b border-white/10 shrink-0 backdrop-blur-md">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white tracking-tight truncate">One Capital</p>
            <p className="text-[11px] font-mono uppercase tracking-widest text-text-muted">Advisory chat</p>
          </div>
          <button
            type="button"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden />
          </button>
        </div>

        {/* Message history */}
        <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3 min-h-[12rem]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                message.role === 'user'
                  ? 'ml-auto bg-white text-black font-medium shadow-sm'
                  : 'mr-auto text-white/95 bg-white/[0.08] border border-white/10 backdrop-blur-md',
              )}
            >
              {message.text}
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div className="px-4 pb-2 shrink-0">
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="text-xs text-text-muted hover:text-white underline-offset-4 hover:underline transition-colors"
          >
            Book Consultation
          </Link>
        </div>

        {/* Input area */}
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 px-3 py-3 bg-black/40 border-t border-white/10 shrink-0 backdrop-blur-md"
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
            className="min-h-11 flex-1 rounded-xl px-3 text-sm text-white placeholder:text-white/40 bg-white/[0.06] border border-white/12 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!input.trim()}
            className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-xl text-white bg-white/[0.08] hover:bg-white/15 border border-white/12 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <Send className="w-4 h-4" aria-hidden />
          </button>
        </form>
      </div>

      {/* Trigger FAB */}
      <button
        type="button"
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'inline-flex items-center justify-center min-h-14 min-w-14 rounded-full text-white',
          'bg-[#0b0c0e]/92 hover:bg-[#15171c] backdrop-blur-2xl border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.8)]',
          'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
        )}
      >
        {open ? (
          <X className="w-6 h-6" aria-hidden />
        ) : (
          <ChatbotIcon className="w-12 h-12 text-white" />
        )}
      </button>
    </div>
  );
}
