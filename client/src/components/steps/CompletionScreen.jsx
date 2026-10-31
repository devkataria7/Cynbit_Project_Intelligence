import { RotateCcw, FileText, CheckCircle2 } from "lucide-react";
import { useProjectIntelligence } from "../../context/ProjectIntelligenceContext.jsx";

export default function CompletionScreen() {
  const { resetForm, goToStep } = useProjectIntelligence();

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      <div className="bg-white rounded-2xl border border-[#E4EAE9] p-8 sm:p-12 lg:p-16 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Column: Visual Illustration matching reference */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-48 sm:w-56 aspect-square flex items-center justify-center">
              {/* Soft background ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#EAF5F3] to-[#d8ece8] rounded-full blur-xl opacity-80" />

              {/* Document Illustration Card */}
              <div className="relative z-10 w-40 sm:w-48 bg-white rounded-2xl shadow-lg border border-[#E4EAE9] p-5 rotate-[-3deg] hover:rotate-0 transition-transform duration-300">
                {/* Check Badge Overlay */}
                <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-[#0D6662] text-white flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
                </div>

                {/* Document Skeleton Lines */}
                <div className="space-y-3 pt-3">
                  <div className="w-12 h-3 bg-[#0D6662] opacity-40 rounded-full" />
                  <div className="w-full h-2 bg-[#E4EAE9] rounded-full" />
                  <div className="w-5/6 h-2 bg-[#E4EAE9] rounded-full" />
                  <div className="w-4/6 h-2 bg-[#E4EAE9] rounded-full" />

                  <div className="pt-2">
                    <div className="w-full h-8 bg-[#EAF5F3] rounded-lg border border-[#d0e4e1] flex items-center px-2">
                      <div className="w-1/2 h-2 bg-[#0D6662] opacity-50 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Actions */}
          <div className="md:col-span-7 flex flex-col items-start text-left space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5F3] border border-[#d0e4e1] text-[#0D6662] text-xs font-bold uppercase tracking-wider">
              <span>Prototype Flow Completed</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111827] uppercase tracking-tight leading-tight">
              Project Brief Preview Complete!
            </h1>

            <p className="text-sm sm:text-base text-[#53616A] leading-relaxed">
              Thanks for exploring the Cynbit Project Intelligence discovery
              experience. Your project blueprint and preliminary recommendations
              were generated client-side in your browser.
            </p>

            {/* Prototype Disclosure Note */}
            <div className="p-3.5 rounded-xl bg-[#F7FAF9] border border-[#E4EAE9] text-xs text-[#53616A] leading-relaxed w-full">
              <strong className="text-[#111827] font-semibold">
                Frontend-Only Prototype:
              </strong>{" "}
              This is a browser assessment demonstration. No real inquiry has been
              transmitted, saved, or submitted to Cynbit's servers.
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 w-full">
              <button
                type="button"
                onClick={resetForm}
                className="brand-btn-primary flex-1 sm:flex-none"
                id="reset-form-btn"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Start Another Project</span>
              </button>

              <button
                type="button"
                onClick={() => goToStep(5)}
                className="brand-btn-secondary flex-1 sm:flex-none"
                id="review-blueprint-btn"
              >
                <FileText className="w-4 h-4" />
                <span>Review Brief</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
