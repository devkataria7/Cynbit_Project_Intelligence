import { ArrowRight, Zap, Target, Layers } from "lucide-react";
import { useProjectIntelligence } from "../../context/ProjectIntelligenceContext.jsx";
import { INTRO } from "../../config/cynbit-form-config.js";

export default function IntroScreen() {
  const { startDiscovery } = useProjectIntelligence();

  return (
    <div className="w-full max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      <div className="bg-white rounded-2xl border border-[#E4EAE9] p-8 sm:p-12 lg:p-16 shadow-sm overflow-hidden relative">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF5F3] border border-[#d0e4e1] text-[#0D6662] text-xs font-bold uppercase tracking-wider mb-5">
              <span>{INTRO.eyebrow || "PROJECT INTELLIGENCE"}</span>
            </div>

            {/* Headline matching reference image */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111827] tracking-tight uppercase leading-[1.15] mb-5">
              Turn your idea
              <br />
              into a clear
              <br />
              <span className="text-[#0D6662]">project blueprint</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#53616A] leading-relaxed mb-8 max-w-xl">
              Tell us about your project, and we'll understand your goals,
              suggest the right Cynbit services, and prepare a tailored project
              blueprint for you.
            </p>

            {/* Start CTA */}
            <button
              onClick={startDiscovery}
              className="brand-btn-primary group text-base px-8 py-3.5 rounded-lg shadow-sm"
              id="start-discovery-btn"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Column: Decorative Visual matching the reference collage */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              {/* Soft ambient background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#EAF5F3] via-[#e2f1ee] to-transparent rounded-full blur-2xl opacity-70" />

              {/* Isometric browser window mockup */}
              <div className="relative z-10 w-64 sm:w-72 bg-white rounded-xl shadow-xl border border-[#E4EAE9] p-4 transform rotate-[-4deg] hover:rotate-0 transition-transform duration-300">
                {/* Window header dots */}
                <div className="flex items-center gap-1.5 pb-3 border-b border-[#E4EAE9]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0D6662] opacity-80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0D6662] opacity-50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0D6662] opacity-30" />
                </div>

                {/* Window content representation */}
                <div className="pt-4 pb-2 space-y-4">
                  {/* Top code icon card */}
                  <div className="flex justify-end">
                    <div className="bg-[#EAF5F3] border border-[#d0e4e1] rounded-lg p-2.5 text-[#0D6662] font-mono text-sm font-bold flex items-center gap-1 shadow-sm">
                      <span>&lt; / &gt;</span>
                    </div>
                  </div>

                  {/* Analytics Bar Chart Representation */}
                  <div className="bg-[#F7FAF9] rounded-lg p-3 border border-[#E4EAE9] flex items-end justify-between h-24 gap-2">
                    <div className="w-1/4 bg-[#0D6662] opacity-30 rounded-t h-[40%]" />
                    <div className="w-1/4 bg-[#0D6662] opacity-60 rounded-t h-[65%]" />
                    <div className="w-1/4 bg-[#0D6662] opacity-80 rounded-t h-[85%]" />
                    <div className="w-1/4 bg-[#0D6662] rounded-t h-[100%]" />
                  </div>

                  {/* Skeleton line */}
                  <div className="w-3/4 h-2 bg-[#E4EAE9] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 3 Feature Highlights matching reference image */}
        <div className="mt-12 pt-8 border-t border-[#E4EAE9] grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Item 1 */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#EAF5F3] text-[#0D6662] flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#111827]">Quick &amp; Simple</h2>
              <p className="text-xs text-[#53616A] mt-0.5">5–7 minutes</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#EAF5F3] text-[#0D6662] flex-shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#111827]">
                Tailored Recommendations
              </h2>
              <p className="text-xs text-[#53616A] mt-0.5">Based on your goals</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#EAF5F3] text-[#0D6662] flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#111827]">
                From Idea to Execution
              </h2>
              <p className="text-xs text-[#53616A] mt-0.5">
                With Cynbit's expertise
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
