import {
  Check,
  ArrowRight,
  ArrowLeft,
  Bot,
  FileText,
  Mic,
  Layers,
  Laptop,
  Server,
  Cloud,
  RefreshCw,
  TrendingUp,
  Search,
  Users,
  Target,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { useProjectIntelligence } from "../../context/ProjectIntelligenceContext.jsx";
import {
  REQUIREMENT_GROUPS,
  getVisibleRequirementGroups,
  SERVICE_CARDS,
} from "../../config/cynbit-form-config.js";

const REQUIREMENT_ICONS = {
  // AI Automation
  "autonomous-ai-agents": Bot,
  "llm-automation": FileText,
  "ai-voice-agents": Mic,
  "ai-stack-integration": Layers,

  // Custom IT Services
  "full-stack-development": Laptop,
  "backend-systems": Server,
  "cloud-infrastructure": Cloud,
  "legacy-migration": RefreshCw,

  // Digital Marketing
  "performance-ads": TrendingUp,
  "technical-seo": Search,
  "crm-automation": Users,
  "funnel-optimization": Target,
};

export default function Step3Requirements() {
  const {
    formData,
    toggleRequirement,
    updateField,
    nextStep,
    prevStep,
  } = useProjectIntelligence();

  const selectedServices = formData.selectedServices || [];
  const isNotSure = selectedServices.includes("not-sure");
  const visibleGroups = getVisibleRequirementGroups(selectedServices);
  const notSureCard = SERVICE_CARDS.find((card) => card.id === "not-sure");

  return (
    <div className="w-full">
      {/* Step Header treatment */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-full bg-[#0D6662] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
            3
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#111827] uppercase tracking-tight">
              Project Requirements
            </h1>
            <p className="text-sm text-[#53616A] mt-1">
              {isNotSure
                ? "Review and describe the challenge you're looking to solve."
                : "Select the specific capabilities and solutions that match your goals."}
            </p>
          </div>
        </div>
      </div>

      {/* Case 1: "Not sure yet" is selected */}
      {isNotSure && (
        <div className="space-y-6">
          <div className="bg-[#EAF5F3] border border-[#d0e4e1] rounded-2xl p-6 sm:p-8">
            <div className="flex items-start gap-3.5 mb-4">
              <div className="p-2.5 rounded-xl bg-[#0D6662] text-white flex-shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#111827]">
                  Problem Discovery Mode
                </h2>
                <p className="text-xs sm:text-sm text-[#53616A] mt-0.5">
                  Since you selected "Not sure yet", no technical category questions are required. We'll use your challenge description to guide the discussion.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="step3-problem-description"
                className="block text-sm font-bold text-[#111827] mb-1.5"
              >
                {notSureCard?.revealsQuestion?.label || "What are you trying to solve?"}
              </label>
              <textarea
                id="step3-problem-description"
                rows={4}
                maxLength={notSureCard?.revealsQuestion?.maxLength || 500}
                placeholder={notSureCard?.revealsQuestion?.placeholder}
                value={formData.problemDescription || ""}
                onChange={(e) =>
                  updateField("problemDescription", e.target.value)
                }
                className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3.5 text-sm text-[#111827] placeholder-[#8C9B9E] focus:border-[#0D6662] focus:ring-2 focus:ring-[#0D6662]/20 focus:outline-none transition-all resize-y"
              />
              <div className="flex justify-end mt-1 text-[11px] text-[#53616A]">
                <span>
                  {(formData.problemDescription || "").length} /{" "}
                  {notSureCard?.revealsQuestion?.maxLength || 500}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Case 2: One or more technical service categories selected */}
      {!isNotSure && visibleGroups.length > 0 && (
        <div className="space-y-10">
          {visibleGroups.map((group) => {
            // Find serviceId from REQUIREMENT_GROUPS
            const serviceId = Object.keys(REQUIREMENT_GROUPS).find(
              (key) => REQUIREMENT_GROUPS[key].id === group.id
            );
            const groupSelections =
              (formData.requirements && formData.requirements[serviceId]) || [];

            return (
              <div key={group.id} className="space-y-4">
                {/* Group Sub-header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-[#E4EAE9]">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#111827]">
                      {group.question}
                    </h2>
                    <p className="text-xs text-[#53616A] mt-0.5">
                      Select all that apply for this category.
                    </p>
                  </div>
                  <span className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#EAF5F3] text-[#0D6662] border border-[#d0e4e1]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{group.title}</span>
                  </span>
                </div>

                {/* Requirement Cards Grid */}
                <div
                  role="group"
                  aria-label={group.question}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {group.options.map((option) => {
                    const isSelected = groupSelections.includes(option.value);
                    const IconComponent =
                      REQUIREMENT_ICONS[option.value] || Sparkles;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="checkbox"
                        aria-checked={isSelected}
                        onClick={() =>
                          toggleRequirement(serviceId, option.value)
                        }
                        className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6662] ${
                          isSelected
                            ? "bg-[#EAF5F3] border-[#0D6662] shadow-sm"
                            : "bg-white border-[#E4EAE9] hover:border-[#0D6662]/40 hover:shadow-md"
                        }`}
                      >
                        <div>
                          {/* Card Top: Icon & Checkbox Indicator */}
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div
                              className={`p-2 rounded-xl transition-colors ${
                                isSelected
                                  ? "bg-[#0D6662] text-white"
                                  : "bg-[#F7FAF9] text-[#0D6662] group-hover:bg-[#EAF5F3]"
                              }`}
                            >
                              <IconComponent className="w-4 h-4" />
                            </div>

                            <div
                              className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors border ${
                                isSelected
                                  ? "bg-[#0D6662] border-[#0D6662] text-white"
                                  : "border-[#CBD5E1] bg-white group-hover:border-[#0D6662]/50"
                              }`}
                            >
                              {isSelected && (
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              )}
                            </div>
                          </div>

                          {/* Title & Description */}
                          <h3 className="text-sm sm:text-base font-bold text-[#111827]">
                            {option.title}
                          </h3>
                          <p className="text-xs text-[#53616A] leading-relaxed mt-1">
                            {option.description}
                          </p>
                        </div>

                        {/* Capability Tag */}
                        {option.capability && (
                          <div className="mt-4 pt-2.5 border-t border-[#E4EAE9]/60">
                            <span
                              className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-md transition-colors ${
                                isSelected
                                  ? "bg-white text-[#0D6662] border border-[#d0e4e1]"
                                  : "bg-[#F7FAF9] text-[#53616A] border border-[#E4EAE9]"
                              }`}
                            >
                              {option.capability}
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

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
          onClick={nextStep}
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
