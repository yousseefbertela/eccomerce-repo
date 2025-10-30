import { Link } from 'react-router-dom';
import { Sparkles, Crown } from 'lucide-react';

const Logo = ({ compact = false }) => (
  <Link 
    to="/" 
    className="inline-flex items-center gap-3 text-primary group hover:scale-105 transition-all duration-300 ease-out"
  >
    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 shadow-lg group-hover:shadow-xl transition-all duration-300">
      <Crown className="h-6 w-6 text-primary group-hover:text-secondary transition-colors duration-300 animate-pulse" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 animate-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    {!compact && (
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
            ANGAL AZIZ
          </span>
          <span className="text-xl font-bold text-accent animate-bounce-subtle">
            SYSTEM
          </span>
        </div>
        <p className="text-xs text-base-content/60 font-medium tracking-wide">
          Enterprise Solutions
        </p>
      </div>
    )}
    {compact && (
      <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        AA
      </span>
    )}
  </Link>
);

export default Logo;
