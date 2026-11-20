import { Mail, Send } from "lucide-react";
import type { Locale } from "@/data/catalog";
import { t } from "@/lib/i18n";
import { METRICA_GOALS, MetricaTrackedLink } from "./metrica-goals";

const copy = {
  ru: { heading: "Контакты", navigation: "Связаться с SenseMeter", vk: "SenseMeter в VK", telegram: "Написать в Telegram", email: "Написать на email" },
  en: { heading: "Contact", navigation: "Contact SenseMeter", vk: "SenseMeter on VK", telegram: "Chat on Telegram", email: "Send email" }
};
const linkStyle = "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none";

export function FooterContactLinks({ locale }: { locale: Locale }) {
  const labels = copy[locale];
  const email = t(locale).contactEmail;
  const contacts = [
    { id: "vk", href: "https://vk.ru/sensemeter_instruments", label: labels.vk, color: "bg-[#0077ff]", icon: <img className="h-6 w-6 brightness-0 invert" src="/assets/icons/vk.svg" alt="" width={24} height={24} aria-hidden="true" /> },
    { id: "telegram", href: "https://t.me/Sensemeter", label: labels.telegram, color: "bg-[#229ed9]", icon: <Send className="h-5 w-5" aria-hidden="true" /> },
    { id: "email", href: `mailto:${email}`, label: `${labels.email}: ${email}`, color: "bg-accent", icon: <Mail className="h-5 w-5" aria-hidden="true" /> }
  ];

  return (
    <div className="shrink-0" data-footer-contacts>
      <h2 className="text-base font-bold leading-6 text-white">{labels.heading}</h2>
      <span className="mt-3 block h-0.5 w-8 bg-accent" aria-hidden="true" data-footer-contact-rule />
      <nav className="mt-5 flex items-center gap-3" aria-label={labels.navigation}>
        {contacts.map(contact => {
          const props = {
            className: `${linkStyle} ${contact.color}`,
            href: contact.href,
            "aria-label": contact.label,
            ...(contact.id !== "email" ? { target: "_blank", rel: "noopener noreferrer" } : {})
          };
          return contact.id === "telegram"
            ? <MetricaTrackedLink {...props} goal={METRICA_GOALS.telegramClick} goalParams={{ location: "footer" }} key={contact.id}>{contact.icon}</MetricaTrackedLink>
            : <a {...props} key={contact.id}>{contact.icon}</a>;
        })}
      </nav>
    </div>
  );
}
