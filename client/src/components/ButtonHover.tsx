import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonHoverProps {
  FirstText: string;
  SecondText: string;
  variant?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  onClick?: () => void;
}

const ButtonHover = ({ 
  FirstText, 
  SecondText, 
  variant = 'md',
  className,
  href,
  onClick
}: ButtonHoverProps) => {
  const sizes = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-14 px-8 text-lg'
  };

  const sharedClasses = cn(
    'group relative rounded-full border-2 border-red-600 bg-transparent hover:bg-red-600 text-white transition-colors duration-300',
    sizes[variant],
    className
  );

  const content = (
    <span className='relative inline-flex overflow-hidden'>
      <div className='translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12'>
        {FirstText}
      </div>
      <div className='absolute translate-y-[114%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0'>
        {SecondText}
      </div>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={sharedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={sharedClasses}
    >
      {content}
    </button>
  );
};

export default ButtonHover;