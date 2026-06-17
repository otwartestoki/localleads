import Image from 'next/image';

export default function LuminsoBanner() {
  return (
    <section className="py-8 md:py-10">
      <a
        href="https://www.luminso.pl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Poznaj Luminso — strony internetowe dla firm"
        className="mx-auto block w-full max-w-[1120px] leading-none"
      >
        {/* Desktop / tablet */}
        <div className="relative hidden aspect-[1724/456] w-full overflow-hidden rounded-[28px] md:block">
          <Image
            src="/media/luminso-baner.webp"
            alt="Luminso — profesjonalne strony internetowe i obecność w internecie"
            fill
            priority
            className="scale-[1.05] object-cover object-center"
            sizes="(min-width: 768px) 1120px, 0px"
          />
        </div>

        {/* Mobile */}
        <div className="relative block aspect-[1122/1402] w-full overflow-hidden rounded-[24px] md:hidden">
          <Image
            src="/media/luminso-baner-mobile.webp"
            alt="Luminso — profesjonalne strony internetowe i obecność w internecie"
            fill
            priority
            className="scale-[1.05] object-cover object-center"
            sizes="(max-width: 767px) calc(100vw - 32px), 0px"
          />
        </div>
      </a>
    </section>
  );
}
