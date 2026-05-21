type JsonLdData = Record<string, unknown>;

interface JsonLdProps {
  data: JsonLdData | JsonLdData[];
}

function serializeJsonLd(item: JsonLdData) {
  return JSON.stringify(item).replace(/</g, "\\u003c");
}

export default function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <template
          key={index}
          dangerouslySetInnerHTML={{
            __html: `<script type="application/ld+json">${serializeJsonLd(item)}</script>`,
          }}
        />
      ))}
    </>
  );
}