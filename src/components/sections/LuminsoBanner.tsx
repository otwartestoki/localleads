import Image from 'next/image';

export default function LuminsoBanner() {
  return (
    <section className="section pt-0">
      <div className="container">
        <a
          href="https://www.luminso.pl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Poznaj Luminso — strony internetowe dla firm"
          className="group block overflow-hidden rounded-3xl border border-white/10 bg-[#020916] shadow-[0_24px_80px_rgba(0,0,0,.35)] transition duration-300 hover:border-sky-400/40"
        >
          <Image
            src="/media/luminso-baner.jpg"
            alt="Luminso — profesjonalne strony internetowe i obecność w internecie"
            width={1774}
            height={461}
            priority
            className="block h-auto w-full scale-105"
            sizes="100vw"
          />
        </a>
      </div>
    </section>
  );
}
