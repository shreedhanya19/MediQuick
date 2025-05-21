import { HeartPulse } from 'lucide-react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
      <HeartPulse className="h-8 w-8" />
      <span>PharmaFlow</span>
    </Link>
  );
};

export default Logo;
