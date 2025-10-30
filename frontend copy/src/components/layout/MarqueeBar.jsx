import { useMemo } from 'react';

const MarqueeBar = ({ items }) => {
  const content = useMemo(() => {
    const defaultItems = [
      'ANGAL', 'FW25', 'FREE SHIPPING OVER €100', 'ANGAL', 'FW25', 'SHOP NOW',
    ];
    return (items && items.length ? items : defaultItems).join(' \u2022 ');
  }, [items]);

  return (
    <div className="bg-black text-white py-2 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-text text-[10px] md:text-xs uppercase tracking-[0.3em] whitespace-nowrap">
          <span className="pr-8">{content}</span>
          <span className="pr-8">{content}</span>
          <span className="pr-8">{content}</span>
          <span className="pr-8">{content}</span>
        </div>
      </div>
    </div>
  );
};

export default MarqueeBar;
