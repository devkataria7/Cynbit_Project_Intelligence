import { useMemo } from "react";
import {
  FileText,
  Layers,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Edit3,
  Sparkles,
  HelpCircle,
  Check,
} from "lucide-react";
import { useProjectIntelligence } from "../../context/ProjectIntelligenceContext.jsx";
import { buildProjectBriefPreview } from "../../config/recommendationEngine.js";

export default function Step5Blueprint() {
  const { formData, nextStep, prevStep, goToStep } = useProjectIntelligence();

  // Call the approved recommendation engine - no duplicate rules or LLM calls
  const preview = useMemo(() => {
    return buildProjectBriefPreview(formData);
  }, [formData]);

  return (
    <div className="w-full">
      {/* Step Header treatment matching reference */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-9 h-9 rounded-full bg-[#0D6662] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
          5
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#111827] uppercase tracking-tight">
            Project Blueprint
          </h1>
          <p className="text-sm text-[#53616A] mt-1">
            Here's a tailored summary and recommended approach for your project.
          </p>
        </div>
      </div>

      {/* Main Two-Column Blueprint Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Project Summary */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E4EAE9] p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4EAE9]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#EAF5F3] text-[#0D6662]">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-[#111827]">
                Project Summary
              </h2>
            </div>
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D6662] hover:text-[#094E4A] hover:underline"
              title="Edit project discovery answers"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          {/* Selected Services */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#53616A]">
                Selected Services
              </span>
              <button
                type="button"
                onClick={() => goToStep(1)}
                className="text-[11px] text-[#0D6662] hover:underline"
              >
                Change
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {preview.selectedServiceCards.map((service) => (
                <span
                  key={service.id}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#EAF5F3] text-[#0D6662] border border-[#d0e4e1]"
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>{service.title}</span>
                </span>
              ))}
              {preview.selectedServiceCards.length === 0 && (
                <span className="text-xs text-[#53616A] italic">
                  No services selected
                </span>
              )}
            </div>
          </div>

          {/* Current Situation (Stage & Tools) */}
          <div className="space-y-3 pt-3 border-t border-[#E4EAE9]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#53616A]">
                Current Situation
              </span>
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="text-[11px] text-[#0D6662] hover:underline"
              >
                Change
              </button>
            </div>

            <div className="bg-[#F7FAF9] rounded-xl p-3 border border-[#E4EAE9] space-y-2 text-xs">
              <div>
                <span className="font-semibold text-[#111827]">Stage: </span>
                <span className="text-[#53616A]">{preview.projectStage}</span>
              </div>
              <div>
                <span className="font-semibold text-[#111827]">
                  Existing Setup:{" "}
                </span>
                <span className="text-[#53616A]">
                  {preview.existingSetup.length > 0
                    ? preview.existingSetup.join(", ")
                    : "None specified"}
                </span>
              </div>
            </div>
          </div>

          {/* Expected Outcome */}
          <div className="space-y-2 pt-3 border-t border-[#E4EAE9]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#53616A]">
                Expected Outcome
              </span>
              <button
                type="button"
                onClick={() => goToStep(4)}
                className="text-[11px] text-[#0D6662] hover:underline"
              >
                Change
              </button>
            </div>
            <p className="text-xs text-[#53616A] leading-relaxed italic bg-[#F7FAF9] p-3 rounded-xl border border-[#E4EAE9]">
              {preview.expectedOutcome || "No specific outcome provided."}
            </p>
          </div>
        </div>

        {/* Right Column: Recommendations Derived from Engine */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E4EAE9] p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4EAE9]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#EAF5F3] text-[#0D6662]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#111827]">
                  Recommended Cynbit Services
                </h2>
                <p className="text-xs text-[#53616A]">
                  Deterministic capabilities mapped to your selections
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#EAF5F3] text-[#0D6662]">
              <Sparkles className="w-3 h-3" />
              <span>Tailored</span>
            </span>
          </div>

          {/* Scenario 1: "Not sure yet" is selected */}
          {preview.isNotSure ? (
            <div className="bg-[#EAF5F3] border border-[#d0e4e1] rounded-xl p-5 space-y-3">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-[#0D6662] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#111827]">
                    Challenge Scoping Recommended
                  </h3>
                  <p className="text-xs text-[#53616A] leading-relaxed mt-1">
                    Because you selected "Not sure yet", no technical capabilities were fabricated. During your preliminary discovery conversation, Cynbit will analyze your challenge and suggest the best roadmap.
                  </p>
                </div>
              </div>

              {preview.problemDescription && (
                <div className="mt-2 pt-3 border-t border-[#d0e4e1]/80 text-xs">
                  <span className="font-semibold text-[#111827]">
                    Your challenge description:
                  </span>
                  <p className="text-[#53616A] mt-1 italic bg-white/70 p-3 rounded-lg border border-[#d0e4e1]">
                    "{preview.problemDescription}"
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Scenario 2: Service categories selected */
            <div className="space-y-4">
              {/* If specific recommendations exist from selected requirements */}
              {preview.recommendations.map((rec, index) => (
                <div
                  key={`${rec.serviceTitle}-${rec.capability}-${index}`}
                  className="p-4 rounded-xl border border-[#E4EAE9] bg-[#F7FAF9] hover:border-[#0D6662]/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0D6662] flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold text-[#111827]">
                          {rec.capability}
                        </h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-[#0D6662] border border-[#d0e4e1]">
                          {rec.serviceTitle}
                        </span>
                      </div>
                      <p className="text-xs text-[#53616A] leading-relaxed">
                        {rec.explanation}
                      </p>
                      <p className="text-[11px] text-[#0D6662] font-medium pt-0.5">
                        Based on: {rec.basedOn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* If a selected service category has no specific requirement selections */}
              {preview.selectedServiceCards.map((service) => {
                const group = preview.requirementGroups.find(
                  (g) => g.serviceId === service.id
                );
                const hasSelectedReqs =
                  group && group.selectedOptions.length > 0;

                if (hasSelectedReqs) return null;

                return (
                  <div
                    key={`unselected-reqs-${service.id}`}
                    className="p-4 rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFA]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EAF5F3] text-[#0D6662] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        •
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-[#111827]">
                            {service.title} (Exploratory)
                          </h3>
                        </div>
                        <p className="text-xs text-[#53616A] leading-relaxed mt-1">
                          You selected this service category without specific requirement cards. Cynbit will present available capabilities during discovery.
                        </p>
                        <button
                          type="button"
                          onClick={() => goToStep(3)}
                          className="mt-2 text-xs font-semibold text-[#0D6662] hover:underline"
                        >
                          + Select specific requirements for {service.title}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {!preview.hasSelectedService && (
                <div className="p-4 text-center text-xs text-[#53616A]">
                  No services selected. Go to Step 1 to select services.
                </div>
              )}
            </div>
          )}
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
