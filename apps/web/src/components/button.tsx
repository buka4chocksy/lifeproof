import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary';

/**
 * Spec-compliant button (design §9.6): 44px minimum target, pill radius, visible
 * focus via the global `:focus-visible` outline, explicit disabled styling.
 * `@lifeproof/ui`'s Button is not used here because its resting `border-line`
 * (1.4:1) fails the frozen contract and `packages/ui` is out of this task's scope.
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-ink text-white hover:bg-accent active:bg-accent disabled:bg-line disabled:text-muted',
  secondary:
    'border border-line-strong bg-white text-ink hover:border-accent hover:text-accent disabled:border-line disabled:text-muted',
};

export function buttonClasses(variant: ButtonVariant = 'primary', className = ''): string {
  return [
    'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-2.5 text-base font-medium',
    'transition-colors duration-150 ease-out disabled:cursor-not-allowed',
    variantStyles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, className)} {...props}>
      {children}
    </button>
  );
}
