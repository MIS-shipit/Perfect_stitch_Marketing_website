import JsonLd from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/json-ld";

export const dynamic = "force-dynamic";

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
