import { ProjectIntelligenceProvider } from "./context/ProjectIntelligenceContext.jsx";
import Header from "./components/common/Header.jsx";
import StepContainer from "./components/wizard/StepContainer.jsx";

export default function App() {
  return (
    <ProjectIntelligenceProvider>
      <div className="min-h-screen flex flex-col bg-[#F7FAF9] text-[#111827]">
        {/* Top Header Treatment */}
        <Header />

        {/* Dynamic Wizard Body */}
        <StepContainer />

        {/* Minimal Prototype Footer */}
        <footer className="w-full py-6 text-center text-xs text-[#53616A] border-t border-[#E4EAE9] mt-auto">
          <p>
            Cynbit Project Intelligence • Interactive Discovery Prototype
          </p>
        </footer>
      </div>
    </ProjectIntelligenceProvider>
  );
}
