const LoadingSpinner = ({ fullScreen = false, size = 'md', text = '' }) => {
  const sizes = { sm: 'w-5 h-5 border-2', md: 'w-8 h-8 border-2', lg: 'w-12 h-12 border-4' };
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizes[size]} rounded-full border-blue-200 border-t-blue-600 animate-spin`} />
      {text && <p className="text-slate-500 dark:text-slate-400 text-sm">{text}</p>}
    </div>
  );
  if (fullScreen) return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50">{spinner}</div>
  );
  return spinner;
};

export default LoadingSpinner;
