import JsonLd from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/json-ld";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      {children}
    </>
  );
}
