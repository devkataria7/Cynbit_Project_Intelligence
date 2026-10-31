import { ArrowRight, ArrowLeft, Target, Sparkles } from "lucide-react";
import { useProjectIntelligence } from "../../context/ProjectIntelligenceContext.jsx";
import { EXPECTED_OUTCOME_QUESTION } from "../../config/cynbit-form-config.js";

export default function Step4ExpectedOutcome() {
  const {
    formData,
    updateField,
    nextStep,
    prevStep,
  } = useProjectIntelligence();

  const currentLength = (formData.expectedOutcome || "").length;
  const maxLength = EXPECTED_OUTCOME_QUESTION.maxLength || 700;

  const handleNext = () => {
    // Optional question: empty or populated is valid
    nextStep();
  };

  return (
    <div className="w-full">
      {/* Step Header treatment */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-9 h-9 rounded-full bg-[#0D6662] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
          4
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#111827] uppercase tracking-tight">
            Expected Outcome
          </h1>
          <p className="text-sm text-[#53616A] mt-1">
            Describe the primary impact or goals you want this project to deliver.
          </p>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl border border-[#E4EAE9] p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#EAF5F3] text-[#0D6662]">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <label
                htmlFor="expected-outcome-input"
                className="block text-base sm:text-lg font-bold text-[#111827]"
              >
                {EXPECTED_OUTCOME_QUESTION.label}
              </label>
              <span className="text-xs text-[#53616A]">
                Optional • Share in your own words
              </span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F7FAF9] text-[#53616A] border border-[#E4EAE9]">
            <Sparkles className="w-3 h-3 text-[#0D6662]" />
            <span>Tailors Blueprint</span>
          </span>
        </div>

        {/* Textarea Input */}
        <div className="relative pt-2">
          <textarea
            id="expected-outcome-input"
            rows={5}
            maxLength={maxLength}
            placeholder={EXPECTED_OUTCOME_QUESTION.placeholder}
            value={formData.expectedOutcome || ""}
            onChange={(e) => updateField("expectedOutcome", e.target.value)}
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-4 text-sm sm:text-base text-[#111827] placeholder-[#8C9B9E] focus:border-[#0D6662] focus:ring-2 focus:ring-[#0D6662]/20 focus:outline-none transition-all resize-y"
          />

          {/* Subtle Character Counter */}
          <div className="flex items-center justify-between mt-2 px-1 text-xs text-[#53616A]">
            <span>
              {currentLength === 0
                ? "You can skip this step or add details to help us prepare your brief."
                : "Looking good! This will be summarized in your blueprint."}
            </span>
            <span
              className={`font-mono ${
                currentLength >= maxLength ? "text-amber-600 font-bold" : ""
              }`}
            >
              {currentLength} / {maxLength}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#E4EAE9]">
        <button
          type="button"
          onClick={prevStep}
          className="brand-btn-secondary"
          id="wizard-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="brand-btn-primary"
          id="wizard-next-btn"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
