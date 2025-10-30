import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const KeepInTouchButton = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
  className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-black text-white px-2 py-3 flex flex-col items-center gap-2 rounded-l-lg shadow-lg transition-all duration-200 border-none hover:bg-neutral ${hovered ? 'text-black bg-white' : ''}`}
      style={{ fontWeight: 500, fontSize: '15px', letterSpacing: '0.08em' }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Keep in Touch"
    >
      <span className={`flex flex-col items-center text-[15px] font-semibold tracking-wide ${hovered ? 'text-black' : 'text-white'}`} style={{lineHeight: '1.1'}}>
        {'KEEP IN TOUCH'.split('').map((char, i) => (
          <span key={i} style={{margin: char === ' ' ? '0 0 0.3em 0' : 0}}>{char === ' ' ? <span style={{display:'block',height:'0.7em'}}></span> : char}</span>
        ))}
      </span>
      <span className="mt-2" style={{transition: 'transform 0.2s', transform: hovered ? 'translateY(4px)' : 'none'}}>
        <ArrowLeft size={18} />
      </span>
    </button>
  );
};

export default KeepInTouchButton;
