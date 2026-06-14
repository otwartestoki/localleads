import { preset } from '@/config/presets';

export function radiusClass() {
  switch (preset.radius as string) {
    case 'none': return 'rounded-none';
    case 'sm': return 'rounded-lg';
    case 'md': return 'rounded-2xl';
    case 'xl': return 'rounded-[2rem]';
    default: return 'rounded-2xl';
  }
}

export function decorativeClass() { return ''; }

export function sectionBg(section?: string) {
  switch (section) {
    case 'stats':
    case 'process':
    case 'contact':
      return 'bg-[#06111f] text-[var(--foreground)]';
    case 'services':
    case 'about':
    case 'gallery':
    case 'faq':
      return 'bg-[#020617] text-[var(--foreground)]';
    case 'cta':
      return 'bg-[#06111f] text-[var(--foreground)]';
    case 'hero':
      return 'bg-transparent text-white';
    default:
      return 'bg-[#020617] text-[var(--foreground)]';
  }
}
