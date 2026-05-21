import QRCard from "@/components/marketing/QRCard";
import Eyebrow from "@/components/site/Eyebrow";
import Container from "@/components/site/Container";

const PLAY_URL =
  process.env.NEXT_PUBLIC_PLAY_URL ?? "https://play.google.com/store/apps";
const APPLE_URL =
  process.env.NEXT_PUBLIC_APPLE_URL ?? "https://apps.apple.com";

export default function DownloadCTA() {
  return (
    <section
      id="download"
      className="py-12 md:py-16 lg:py-24"
      aria-labelledby="download-headline"
    >
      <Container className="flex flex-col items-center text-center">
        <Eyebrow className="text-primary">Download Perfect Stitch</Eyebrow>
        <h2
          id="download-headline"
          className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.15] text-ink md:text-5xl"
        >
          Two stores. One app. Pick yours.
        </h2>
        <div className="mt-12 w-full max-w-md">
          <QRCard
            playSrc="/qr/play.png"
            appleSrc="/qr/apple.png"
            playUrl={PLAY_URL}
            appleUrl={APPLE_URL}
          />
        </div>
      </Container>
    </section>
  );
}
