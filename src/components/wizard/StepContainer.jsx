import { useProjectIntelligence } from "../../context/ProjectIntelligenceContext.jsx";
import ProgressIndicator from "./ProgressIndicator.jsx";
import IntroScreen from "../steps/IntroScreen.jsx";
import Step1Services from "../steps/Step1Services.jsx";
import StepPlaceholder from "../steps/StepPlaceholder.jsx";

export default function StepContainer() {
  const { step } = useProjectIntelligence();

  // Step 0: Introduction screen (un-numbered, no progress indicator)
  if (step === 0) {
    return (
      <main className="flex-1 flex flex-col justify-center">
        <IntroScreen />
      </main>
    );
  }

  // Steps 1 to 6: Multi-step Wizard Shell
  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* 6-step progress indicator */}
      <ProgressIndicator currentStep={step} />

      {/* Step Content Card / Container */}
      <div className="bg-white rounded-2xl border border-[#E4EAE9] p-6 sm:p-10 shadow-sm mt-4">
        {step === 1 ? (
          <Step1Services />
        ) : (
          <StepPlaceholder stepNumber={step} />
        )}
      </div>
    </main>
  );
}
