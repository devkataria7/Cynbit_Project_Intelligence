import {
  Sparkles,
  Code2,
  Megaphone,
  HelpCircle,
  Check,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { useProjectIntelligence } from "../../context/ProjectIntelligenceContext.jsx";
import { SERVICE_CARDS } from "../../config/cynbit-form-config.js";

const SERVICE_ICONS = {
  "ai-automation": Sparkles,
  "custom-it-services": Code2,
  "digital-marketing": Megaphone,
  "not-sure": HelpCircle,
};

export default function Step1Services() {
  const {
    formData,
    errors,
    toggleService,
    updateField,
    setErrors,
    clearErrors,
    nextStep,
    prevStep,
  } = useProjectIntelligence();

  const selectedServices = formData.selectedServices || [];
  const isNotSureSelected = selectedServices.includes("not-sure");
  const notSureCard = SERVICE_CARDS.find((card) => card.id === "not-sure");

  const handleNext = () => {
    if (!selectedServices || selectedServices.length === 0) {
      setErrors({
        selectedServices:
          "Please select at least one service category or choose 'Not sure yet' to proceed.",
      });
      return;
    }

    clearErrors();
    nextStep();
  };

  return (
    <div className="w-full">
      {/* Step Header treatment */}
      <div className="flex items-start gap-4 mb-6 sm:mb-8">
        <div className="w-9 h-9 rounded-full bg-[#0D6662] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
          1
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#111827] uppercase tracking-tight">
            Project Overview
          </h1>
          <p className="text-sm text-[#53616A] mt-1">
            What are you looking to build or achieve? (Select one or more)
          </p>
        </div>
      </div>

      {/* Validation Error Message */}
      {errors.selectedServices && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2.5 animate-fadeIn"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
          <span className="font-medium">{errors.selectedServices}</span>
        </div>
      )}

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {SERVICE_CARDS.map((card) => {
          const isSelected = selectedServices.includes(card.id);
          const IconComponent = SERVICE_ICONS[card.id] || Sparkles;

          return (
            <button
              key={card.id}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => toggleService(card.id)}
              className={`text-left p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 relative flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6662] ${
                isSelected
                  ? "bg-[#EAF5F3] border-[#0D6662] shadow-sm"
                  : "bg-white border-[#E4EAE9] hover:border-[#0D6662]/40 hover:shadow-md"
              }`}
            >
              {/* Card Header: Icon & Check Indicator */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    className={`p-2.5 rounded-xl transition-colors ${
                      isSelected
                        ? "bg-[#0D6662] text-white"
                        : "bg-[#F7FAF9] text-[#0D6662] group-hover:bg-[#EAF5F3]"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors border ${
                      isSelected
                        ? "bg-[#0D6662] border-[#0D6662] text-white"
                        : "border-[#CBD5E1] bg-white group-hover:border-[#0D6662]/50"
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 stroke-[2.5]" />}
                  </div>
                </div>

                {/* Title & Description */}
                <h2 className="text-base sm:text-lg font-bold text-[#111827]">
                  {card.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#53616A] leading-relaxed mt-1.5">
                  {card.description}
                </p>

                {/* Helps with Section */}
                {card.helpsWith && card.helpsWith.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-[#E4EAE9]/80">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#0D6662] mb-1.5">
                      Helps with:
                    </p>
                    <ul className="space-y-1">
                      {card.helpsWith.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-1.5 text-xs text-[#53616A]"
                        >
                          <span className="text-[#0D6662] font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Capability Tags */}
              {card.capabilities && card.capabilities.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#E4EAE9]/60 flex flex-wrap gap-1.5">
                  {card.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-md transition-colors ${
                        isSelected
                          ? "bg-white text-[#0D6662] border border-[#d0e4e1]"
                          : "bg-[#F7FAF9] text-[#53616A] border border-[#E4EAE9]"
                      }`}
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Revealed Question for 'not-sure' selection */}
      {isNotSureSelected && notSureCard?.revealsQuestion && (
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#EAF5F3] border border-[#d0e4e1] animate-fadeIn">
          <label
            htmlFor="problem-description"
            className="block text-sm font-bold text-[#111827] mb-1.5"
          >
            {notSureCard.revealsQuestion.label}
          </label>
          <p className="text-xs text-[#53616A] mb-3">
            Explaining your problem will help Cynbit's team recommend the most effective technical solution.
          </p>
          <div className="relative">
            <textarea
              id="problem-description"
              rows={4}
              maxLength={notSureCard.revealsQuestion.maxLength || 500}
              placeholder={notSureCard.revealsQuestion.placeholder}
              value={formData.problemDescription || ""}
              onChange={(e) =>
                updateField("problemDescription", e.target.value)
              }
              className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3.5 text-sm text-[#111827] placeholder-[#8C9B9E] focus:border-[#0D6662] focus:ring-2 focus:ring-[#0D6662]/20 focus:outline-none transition-all resize-y"
            />
            <div className="flex justify-end mt-1 text-[11px] text-[#53616A]">
              <span>
                {(formData.problemDescription || "").length} /{" "}
                {notSureCard.revealsQuestion.maxLength || 500}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E4EAE9]">
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
