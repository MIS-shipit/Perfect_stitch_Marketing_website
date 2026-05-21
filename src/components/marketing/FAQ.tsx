import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/cn";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  className?: string;
}

export default function FAQ({ items, className }: FAQProps) {
  return (
    <Accordion
      defaultValue={[]}
      className={cn("w-full divide-y divide-hairline", className)}
    >
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-none">
          <AccordionTrigger className="py-5 text-base font-medium text-ink hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>
            <p className="pb-5 text-sm leading-relaxed text-body">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
