export function Loader({ text = "Loading exquisite pieces...", fullScreen = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-slate-200"></div>
        <div className="absolute inset-0 rounded-full border-2 border-navy-900 border-t-transparent animate-spin"></div>
      </div>
      {text && (
        <p className="text-xs tracking-widest uppercase font-medium text-slate-500 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}

export default Loader;
