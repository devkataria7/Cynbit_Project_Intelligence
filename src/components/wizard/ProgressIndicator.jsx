import { Check } from "lucide-react";

const WIZARD_STEP_LABELS = [
  { number: 1, label: "Services" },
  { number: 2, label: "Situation" },
  { number: 3, label: "Requirements" },
  { number: 4, label: "Outcomes" },
  { number: 5, label: "Blueprint" },
  { number: 6, label: "Contact" },
];

export default function ProgressIndicator({ currentStep = 1 }) {
  // Only render on wizard steps 1 to 6
  if (currentStep < 1 || currentStep > 6) {
    return null;
  }

  return (
    <nav aria-label="Wizard Progress" className="w-full py-4 mb-6">
      <ol className="flex items-center justify-between w-full relative">
        {WIZARD_STEP_LABELS.map((stepItem, index) => {
          const isCompleted = currentStep > stepItem.number;
          const isActive = currentStep === stepItem.number;
          const isLast = index === WIZARD_STEP_LABELS.length - 1;

          return (
            <li
              key={stepItem.number}
              className={`flex-1 relative flex flex-col items-center ${
                isLast ? "flex-none" : ""
              }`}
              aria-current={isActive ? "step" : undefined}
            >
              {/* Connector line to next step */}
              {!isLast && (
                <div
                  className="absolute top-4 left-1/2 w-full h-[2px] -translate-y-1/2 z-0"
                  aria-hidden="true"
                >
                  <div
                    className={`h-full transition-colors duration-300 ${
                      isCompleted ? "bg-[#0D6662]" : "bg-[#E4EAE9]"
                    }`}
                  />
                </div>
              )}

              {/* Step Circle */}
              <div
                className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-200 select-none ${
                  isCompleted
                    ? "bg-[#0D6662] text-white shadow-sm"
                    : isActive
                    ? "bg-[#0D6662] text-white ring-4 ring-[#EAF5F3] shadow-sm"
                    : "bg-white border-2 border-[#E4EAE9] text-[#8C9B9E]"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                ) : (
                  <span>{stepItem.number}</span>
                )}
              </div>

              {/* Step Label */}
              <span
                className={`mt-2 text-xs sm:text-sm transition-colors text-center ${
                  isActive
                    ? "text-[#111827] font-bold"
                    : isCompleted
                    ? "text-[#111827] font-medium"
                    : "text-[#8C9B9E] font-medium"
                }`}
              >
                {stepItem.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
