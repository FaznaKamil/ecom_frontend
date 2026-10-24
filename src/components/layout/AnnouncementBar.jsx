export function AnnouncementBar() {
  return (
    <div className="bg-navy-950 text-slate-200 py-2 px-4 text-center text-xs tracking-widest uppercase border-b border-navy-900/60">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 text-[11px]">
        <span className="font-medium flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          Island-Wide Express & Worldwide Delivery on Orders Over $500
        </span>
        <span className="hidden md:inline text-blue-400">•</span>
        <span className="hidden md:inline font-normal text-slate-300">
          Use code <strong className="text-amber-400 font-bold bg-navy-900 px-1.5 py-0.5 rounded border border-amber-500/30">CLICK10</strong> for 10% Off
        </span>
      </div>
    </div>
  );
}

export default AnnouncementBar;
