import { Check, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import { useProjectIntelligence } from "../../context/ProjectIntelligenceContext.jsx";
import { CURRENT_SITUATION_QUESTIONS } from "../../config/cynbit-form-config.js";

export default function Step2Situation() {
  const {
    formData,
    errors,
    updateField,
    toggleSetup,
    setErrors,
    clearErrors,
    nextStep,
    prevStep,
  } = useProjectIntelligence();

  const handleNext = () => {
    // Check required fields from CURRENT_SITUATION_QUESTIONS
    const newErrors = {};
    const stageQuestion = CURRENT_SITUATION_QUESTIONS.find(
      (q) => q.id === "projectStage"
    );

    if (stageQuestion?.required && !formData.projectStage) {
      newErrors.projectStage =
        "Please select where you are with this project to continue.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    clearErrors();
    nextStep();
  };

  return (
    <div className="w-full">
      {/* Step Header treatment */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-9 h-9 rounded-full bg-[#0D6662] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
          2
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#111827] uppercase tracking-tight">
            Current Situation
          </h1>
          <p className="text-sm text-[#53616A] mt-1">
            Help us understand where your project currently stands.
          </p>
        </div>
      </div>

      {/* Render Questions from config */}
      <div className="space-y-8">
        {CURRENT_SITUATION_QUESTIONS.map((question) => {
          const isSingleSelect = question.type === "single-select";
          const hasError = errors[question.id];

          return (
            <div key={question.id} className="space-y-3">
              {/* Question Label */}
              <div className="flex items-center justify-between">
                <label className="block text-sm sm:text-base font-bold text-[#111827]">
                  {question.label}{" "}
                  {question.required && (
                    <span className="text-red-500" title="Required">
                      *
                    </span>
                  )}
                </label>
              </div>

              {/* Question-level Error Message */}
              {hasError && (
                <div
                  role="alert"
                  className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                  <span>{hasError}</span>
                </div>
              )}

              {/* Options Container */}
              <div
                role={isSingleSelect ? "radiogroup" : "group"}
                aria-label={question.label}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {question.options.map((option) => {
                  const isSelected = isSingleSelect
                    ? formData.projectStage === option.value
                    : (formData.existingSetup || []).includes(option.value);

                  const handleSelect = () => {
                    if (isSingleSelect) {
                      updateField(question.id, option.value);
                    } else {
                      toggleSetup(option.value);
                    }
                  };

                  return (
                    <button
                      key={option.value}
                      type="button"
                      role={isSingleSelect ? "radio" : "checkbox"}
                      aria-checked={isSelected}
                      onClick={handleSelect}
                      className={`text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6662] ${
                        isSelected
                          ? "bg-[#EAF5F3] border-[#0D6662] shadow-sm"
                          : "bg-white border-[#E4EAE9] hover:border-[#0D6662]/40 hover:bg-[#F8FAFA]"
                      }`}
                    >
                      {/* Control Indicator */}
                      {isSingleSelect ? (
                        /* Radio Dot */
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected
                              ? "border-[#0D6662]"
                              : "border-[#CBD5E1] bg-white group-hover:border-[#0D6662]/50"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#0D6662]" />
                          )}
                        </div>
                      ) : (
                        /* Checkbox Box */
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected
                              ? "bg-[#0D6662] border-[#0D6662] text-white"
                              : "border-[#CBD5E1] bg-white group-hover:border-[#0D6662]/50"
                          }`}
                        >
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          )}
                        </div>
                      )}

                      {/* Option Label */}
                      <span
                        className={`text-sm leading-snug transition-colors ${
                          isSelected
                            ? "text-[#111827] font-bold"
                            : "text-[#53616A] font-medium group-hover:text-[#111827]"
                        }`}
                      >
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
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
