import { theme } from '@/config/theme';

type ButtonStyle =
  | 'default'
  | 'pill'
  | 'rounded'
  | 'square'
  | 'outline'
  | 'soft'
  | 'glass'
  | 'gradient'
  | 'minimal'
  | '3d'
  | 'underline'
  | 'neon';

type ShadowStyle = 'none' | 'soft' | 'medium' | 'strong' | 'glow';
type RadiusStyle = 'square' | 'rounded' | 'soft' | 'pill';
type InputStyle = 'default' | 'outline' | 'filled' | 'soft' | 'glass' | 'minimal';

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const radiusMap: Record<RadiusStyle, string> = {
  square: 'rounded-none',
  rounded: 'rounded-2xl',
  soft: 'rounded-3xl',
  pill: 'rounded-full',
};

const shadowMap: Record<ShadowStyle, string> = {
  none: 'shadow-none',
  soft: 'shadow-[0_18px_48px_rgba(56,189,248,.16)]',
  medium: 'shadow-[0_22px_60px_rgba(2,6,23,.28)]',
  strong: 'shadow-[0_28px_80px_rgba(2,6,23,.38)]',
  glow: 'shadow-[0_0_30px_rgba(56,189,248,.24)]',
};

function getThemeValue<T extends string>(key: string, fallback: T): T {
  const value = (theme as unknown as Record<string, unknown>)[key];
  return typeof value === 'string' && value ? (value as T) : fallback;
}

export function getButtonClass(options?: {
  style?: ButtonStyle;
  radius?: RadiusStyle;
  shadow?: ShadowStyle;
  tone?: 'primary' | 'secondary' | 'neutral';
  className?: string;
}) {
  const style = options?.style || getThemeValue<ButtonStyle>('buttonStyle', 'pill');
  const radius = options?.radius || getThemeValue<RadiusStyle>('buttonRadius', 'pill');
  const shadow = options?.shadow || getThemeValue<ShadowStyle>('buttonShadow', 'soft');
  const tone = options?.tone || 'primary';

  const base = 'inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-black tracking-tight transition duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2 focus:ring-offset-[var(--brand-bg)] disabled:pointer-events-none disabled:opacity-50';

  const toneClass =
    tone === 'secondary'
      ? 'border border-[var(--brand-primary)]/45 bg-[var(--brand-primary)]/10 text-[var(--brand-primary-soft)] hover:border-[var(--brand-primary)]/70 hover:bg-[var(--brand-primary)]/16 hover:text-white'
      : tone === 'neutral'
        ? 'border border-white/14 bg-white/8 text-white hover:bg-white/12'
        : 'border border-[var(--brand-primary)] bg-[var(--brand-primary)] text-[var(--brand-on-primary)] hover:bg-[var(--brand-primary-hover)] hover:border-[var(--brand-primary-hover)]';

  const styleClass: Record<ButtonStyle, string> = {
    default: toneClass,
    pill: toneClass,
    rounded: toneClass,
    square: toneClass,
    outline: 'border border-[var(--brand-primary)]/55 bg-transparent text-[var(--brand-primary-soft)] hover:bg-[var(--brand-primary)]/10 hover:text-white',
    soft: 'border border-[var(--brand-primary)]/25 bg-[var(--brand-primary)]/10 text-[var(--brand-primary-soft)] hover:bg-[var(--brand-primary)]/16 hover:text-white',
    glass: 'border border-[var(--brand-primary)]/35 bg-white/10 text-[var(--brand-primary-soft)] backdrop-blur hover:bg-white/15 hover:text-white',
    gradient: 'border border-[var(--brand-primary)] bg-[var(--brand-primary)] text-[var(--brand-on-primary)] hover:bg-[var(--brand-primary-hover)]',
    minimal: 'px-0 py-0 text-[var(--brand-primary-soft)] hover:text-white',
    '3d': 'border border-[var(--brand-primary)] bg-[var(--brand-primary)] text-[var(--brand-on-primary)] hover:translate-y-[1px]',
    underline: 'px-0 py-0 text-[var(--brand-primary-soft)] underline underline-offset-4 hover:text-white',
    neon: 'border border-[var(--brand-primary)]/45 bg-[var(--brand-bg)] text-[var(--brand-primary-soft)] shadow-[0_0_24px_rgba(56,189,248,.22)] hover:bg-[var(--brand-primary)]/10',
  };

  return cx(
    base,
    styleClass[style] || styleClass.pill,
    style === 'square' ? radiusMap.square : radiusMap[radius],
    shadowMap[shadow],
    'hover:-translate-y-0.5',
    style === '3d' && shadow === 'none' && 'border-b-4 border-black/20',
    options?.className,
  );
}

export function getIconButtonClass(options?: {
  style?: ButtonStyle;
  radius?: RadiusStyle;
  shadow?: ShadowStyle;
  className?: string;
}) {
  return getButtonClass({
    style: options?.style,
    radius: options?.radius,
    shadow: options?.shadow,
    tone: 'secondary',
    className: cx('h-11 w-11 px-0 py-0', options?.className),
  });
}

export function getInputClass(options?: {
  style?: InputStyle;
  radius?: RadiusStyle;
  shadow?: ShadowStyle;
  className?: string;
}) {
  const style = options?.style || getThemeValue<InputStyle>('inputStyle', 'minimal');
  const radius = options?.radius || getThemeValue<RadiusStyle>('inputRadius', 'rounded');
  const shadow = options?.shadow || getThemeValue<ShadowStyle>('inputShadow', 'none');

  const base = 'w-full px-4 py-4 text-white outline-none transition placeholder:text-[var(--brand-muted)] focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-1 focus:ring-offset-[var(--brand-bg)]';

  const styleClass: Record<InputStyle, string> = {
    default: 'border border-white/14 bg-[var(--brand-surface)]',
    outline: 'border border-white/18 bg-transparent text-white placeholder:text-white/45',
    filled: 'border border-transparent bg-[var(--brand-surface-2)] focus:bg-[var(--brand-surface)]',
    soft: 'border border-[var(--brand-primary)]/18 bg-white/8 text-white placeholder:text-white/45',
    glass: 'border border-white/16 bg-white/9 text-white backdrop-blur placeholder:text-white/45',
    minimal: 'border border-white/14 bg-[var(--brand-bg)]/70 text-white placeholder:text-[var(--brand-muted)]',
  };

  return cx(
    base,
    styleClass[style] || styleClass.minimal,
    style !== 'minimal' && radiusMap[radius],
    style === 'minimal' && radiusMap[radius],
    shadowMap[shadow],
    options?.className,
  );
}
