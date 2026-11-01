import { useProjectIntelligence } from "../../context/ProjectIntelligenceContext.jsx";

export default function Header() {
  const { step, resetForm } = useProjectIntelligence();

  return (
    <header className="w-full bg-white border-b border-[#E4EAE9] sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Wordmark / Logo */}
        <button
          onClick={step > 0 ? resetForm : undefined}
          className="hover:cursor-pointer flex items-center gap-2 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6662] rounded-lg p-1"
          title={step > 0 ? "Return to Start" : "Cynbit"}
        >
          <img alt="Cynbit Logo" width="120" height="48" decoding="async" data-nimg="1" className="h-8 w-auto md:h-10" src="https://www.cynbit.in/logo.svg"></img>
        </button>

        {/* Minimal right side treatment consistent with PRD */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-widest text-[#53616A]">
            Project Intelligence
          </span>
          <button
            type="button"
            className="bg-[#0D6662] hover:bg-[#094E4A] text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-full transition-colors shadow-sm cursor-default"
          >
            Join Us
          </button>
        </div>
      </div>
    </header>
  );
}
