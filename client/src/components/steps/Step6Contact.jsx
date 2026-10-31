import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useProjectIntelligence } from "../../context/ProjectIntelligenceContext.jsx";
import { CONTACT_FIELDS } from "../../config/cynbit-form-config.js";
import { submitInquiry } from "../../services/inquiryApi.js";

const FIELD_PLACEHOLDERS = {
  name: "e.g. Alex Rivera",
  email: "alex@domain.com",
  company: "e.g. Cynbit Technologies",
  industry: "e.g. Software, Healthcare, Retail",
};

export default function Step6Contact() {
  const {
    formData,
    errors,
    updateField,
    setErrors,
    clearErrors,
    prevStep,
    isSubmitting,
    submissionError,
    setSubmitting,
    setSubmissionSuccess,
    setSubmissionFailure,
  } = useProjectIntelligence();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    const newErrors = {};
    const nameVal = (formData.name || "").trim();
    const emailVal = (formData.email || "").trim();

    if (!nameVal) {
      newErrors.name = "Full Name is required.";
    }

    if (!emailVal) {
      newErrors.email = "Email Address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    clearErrors();
    setSubmitting();

    try {
      const response = await submitInquiry(formData);
      setSubmissionSuccess(response.data);
    } catch (err) {
      if (err.fieldErrors && Object.keys(err.fieldErrors).length > 0) {
        setErrors(err.fieldErrors);
      }
      setSubmissionFailure(
        err.message ||
          "We couldn't submit your inquiry right now. Please try again."
      );
    }
  };

  return (
    <div className="w-full">
      {/* Step Header treatment */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-9 h-9 rounded-full bg-[#0D6662] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
          6
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#111827] uppercase tracking-tight">
            Contact Details
          </h1>
          <p className="text-sm text-[#53616A] mt-1">
            Provide your details to complete your project intelligence brief preview.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Global Submission Error Alert */}
        {submissionError && (
          <div
            role="alert"
            className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
            <div>
              <p className="font-semibold">Submission failed</p>
              <p className="mt-0.5 text-xs text-red-600">{submissionError}</p>
            </div>
          </div>
        )}

        {/* Contact Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {CONTACT_FIELDS.map((field) => {
            const isError = Boolean(errors[field.id]);
            const value = formData[field.id] || "";

            return (
              <div key={field.id} className="space-y-1.5">
                <label
                  htmlFor={`contact-${field.id}`}
                  className="block text-sm font-bold text-[#111827]"
                >
                  {field.label}{" "}
                  {field.required ? (
                    <span className="text-red-500" title="Required">
                      *
                    </span>
                  ) : (
                    <span className="text-xs font-normal text-[#53616A]">
                      (Optional)
                    </span>
                  )}
                </label>

                <input
                  id={`contact-${field.id}`}
                  type={field.type || "text"}
                  value={value}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  placeholder={FIELD_PLACEHOLDERS[field.id] || ""}
                  disabled={isSubmitting}
                  className={`w-full rounded-xl border bg-white p-3.5 text-sm text-[#111827] placeholder-[#8C9B9E] transition-all focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                    isError
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-[#CBD5E1] focus:border-[#0D6662] focus:ring-[#0D6662]/20"
                  }`}
                  aria-invalid={isError ? "true" : undefined}
                  aria-describedby={
                    isError ? `error-${field.id}` : undefined
                  }
                />

                {isError && (
                  <p
                    id={`error-${field.id}`}
                    role="alert"
                    className="text-xs text-red-600 flex items-center gap-1 mt-1 font-medium"
                  >
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors[field.id]}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Prototype Disclosure Notice */}
        <div className="p-4 rounded-xl bg-[#EAF5F3] border border-[#d0e4e1] flex items-start gap-3 mt-6">
          <ShieldCheck className="w-5 h-5 text-[#0D6662] flex-shrink-0 mt-0.5" />
          <div className="text-xs text-[#53616A] leading-relaxed">
            <strong className="text-[#0D6662] font-bold">
              Assessment Prototype Disclosure:
            </strong>{" "}
            This independent assessment prototype stores the submission in its own
            demo database and is not connected to Cynbit production systems.
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-[#E4EAE9]">
          <button
            type="button"
            onClick={prevStep}
            disabled={isSubmitting}
            className="brand-btn-secondary disabled:opacity-60 disabled:cursor-not-allowed"
            id="wizard-back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="brand-btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            id="wizard-submit-btn"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Complete Project Brief</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
