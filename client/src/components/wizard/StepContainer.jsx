import { useProjectIntelligence } from "../../context/ProjectIntelligenceContext.jsx";
import ProgressIndicator from "./ProgressIndicator.jsx";
import IntroScreen from "../steps/IntroScreen.jsx";
import Step1Services from "../steps/Step1Services.jsx";
import Step2Situation from "../steps/Step2Situation.jsx";
import Step3Requirements from "../steps/Step3Requirements.jsx";
import Step4ExpectedOutcome from "../steps/Step4ExpectedOutcome.jsx";
import Step5Blueprint from "../steps/Step5Blueprint.jsx";
import Step6Contact from "../steps/Step6Contact.jsx";
import CompletionScreen from "../steps/CompletionScreen.jsx";

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

  // Step 7+: Frontend Prototype Completion State
  if (step >= 7) {
    return (
      <main className="flex-1 flex flex-col justify-center">
        <CompletionScreen />
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
        {step === 1 && <Step1Services />}
        {step === 2 && <Step2Situation />}
        {step === 3 && <Step3Requirements />}
        {step === 4 && <Step4ExpectedOutcome />}
        {step === 5 && <Step5Blueprint />}
        {step === 6 && <Step6Contact />}
      </div>
    </main>
  );
}
