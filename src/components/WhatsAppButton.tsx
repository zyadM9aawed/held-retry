import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phone = "212640-804743"; // change to real number
  const msg = encodeURIComponent("Bonjour , Merci de m'informer plus sur le ...");
  return (
    <a
      href={`https://wa.me/${phone}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
    >
      <MessageCircle className="w-5 h-5" fill="currentColor" />
      <span className="font-display uppercase tracking-wider text-sm hidden sm:inline">Chat</span>
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-red rounded-full animate-ping" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-red rounded-full" />
    </a>
  );
}
