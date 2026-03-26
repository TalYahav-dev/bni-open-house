import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary';

interface BaseProps {
  variant?: Variant;
  children: React.ReactNode;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

const baseClasses =
  'inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-base font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage';

const variants: Record<Variant, string> = {
  primary:
    'bg-sage text-white hover:bg-sage-light active:bg-sage-dark shadow-md hover:shadow-lg',
  secondary:
    'bg-transparent text-sage border-2 border-sage hover:bg-sage hover:text-white',
};

export function Button(props: ButtonProps | AnchorProps) {
  const { variant = 'primary', children, className = '', ...rest } = props;
  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (props.as === 'a') {
    const { as: _, variant: _v, ...anchorProps } = rest as any;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { as: _, variant: _v, ...buttonProps } = rest as any;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
