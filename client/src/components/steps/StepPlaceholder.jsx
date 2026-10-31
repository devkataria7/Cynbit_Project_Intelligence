import { ArrowLeft, ArrowRight } from "lucide-react";
import { useProjectIntelligence } from "../../context/ProjectIntelligenceContext.jsx";
import { FORM_STEPS } from "../../config/cynbit-form-config.js";

export default function StepPlaceholder({ stepNumber = 1 }) {
  const { prevStep } = useProjectIntelligence();
  const currentStepConfig = FORM_STEPS.find((s) => s.number === stepNumber);

  return (
    <div className="w-full">
      {/* Step Header treatment matching reference */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-9 h-9 rounded-full bg-[#0D6662] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
          {stepNumber}
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#111827] uppercase tracking-tight">
            {stepNumber === 1 ? "Project Overview" : currentStepConfig?.title}
          </h1>
          <p className="text-sm text-[#53616A] mt-1">
            {stepNumber === 1
              ? "What are you looking to build or achieve? (Select one or more)"
              : currentStepConfig?.title}
          </p>
        </div>
      </div>

      {/* Phase 1 Temporary Placeholder Card */}
      <div className="bg-white rounded-xl border border-dashed border-[#CBD5E1] p-8 sm:p-12 text-center shadow-sm">
        <div className="max-w-md mx-auto space-y-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#EAF5F3] text-[#0D6662] text-xs font-semibold">
            Phase 1 Foundation Ready
          </div>
          <h2 className="text-lg font-bold text-[#111827]">
            Step {stepNumber} Shell Established
          </h2>
          <p className="text-sm text-[#53616A]">
            The shared wizard shell, navigation state, and progress indicator are active. Descriptive multi-select service cards will be integrated in Phase 2.
          </p>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E4EAE9]">
        <button
          onClick={prevStep}
          className="brand-btn-secondary"
          id="wizard-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          disabled
          className="brand-btn-primary opacity-50 cursor-not-allowed"
          id="wizard-next-btn"
          title="Will be enabled in Phase 2 with service selection"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
