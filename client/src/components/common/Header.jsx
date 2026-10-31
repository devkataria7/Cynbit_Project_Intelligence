import { useProjectIntelligence } from "../../context/ProjectIntelligenceContext.jsx";

export default function Header() {
  const { step, resetForm } = useProjectIntelligence();

  return (
    <header className="w-full bg-white border-b border-[#E4EAE9] sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Wordmark / Logo */}
        <button
          onClick={step > 0 ? resetForm : undefined}
          className="flex items-center gap-2 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6662] rounded-lg p-1"
          title={step > 0 ? "Return to Start" : "Cynbit"}
        >
          {/* Stylized Cynbit oval logo mark */}
          <div className="flex items-center justify-center border-2 border-[#0D6662] rounded-full px-3.5 py-1 transition-transform group-hover:scale-[1.02]">
            <svg
              className="w-16 h-5 text-[#0D6662]"
              viewBox="0 0 100 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Cynbit"
            >
              <text
                x="6"
                y="22"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="18"
                fontWeight="800"
                letterSpacing="1"
                fill="#0D6662"
              >
                YN
              </text>
              {/* Swoosh / ribbon crossing */}
              <path
                d="M 38 24 C 45 10, 52 24, 60 10"
                stroke="#0D6662"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <text
                x="64"
                y="22"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="18"
                fontWeight="800"
                letterSpacing="1"
                fill="#0D6662"
              >
                BIT
              </text>
            </svg>
          </div>
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
