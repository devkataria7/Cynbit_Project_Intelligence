import {
  SERVICE_CARDS,
  CURRENT_SITUATION_QUESTIONS,
  REQUIREMENT_GROUPS,
} from "../config/cynbit-form-config.js";

const VALID_SERVICE_IDS = new Set(SERVICE_CARDS.map((c) => c.id));
const STAGE_QUESTION = CURRENT_SITUATION_QUESTIONS.find(
  (q) => q.id === "projectStage"
);
const SETUP_QUESTION = CURRENT_SITUATION_QUESTIONS.find(
  (q) => q.id === "existingSetup"
);
const VALID_STAGE_VALUES = new Set(
  STAGE_QUESTION?.options.map((o) => o.value) || []
);
const VALID_SETUP_VALUES = new Set(
  SETUP_QUESTION?.options.map((o) => o.value) || []
);
const EXCLUSIVE_SETUP_VALUES = new Set(
  SETUP_QUESTION?.exclusiveOptions || ["nothing-yet", "not-sure"]
);

/**
 * Validates request body and formData against the approved configuration.
 * Returns { isValid, fieldErrors, sanitizedData }.
 */
export function validateInquiry(body) {
  const fieldErrors = {};

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      isValid: false,
      fieldErrors: {
        form: "Request payload must be a JSON object containing formData.",
      },
    };
  }

  const { formData } = body;
  if (!formData || typeof formData !== "object" || Array.isArray(formData)) {
    return {
      isValid: false,
      fieldErrors: { formData: "formData must be an object." },
    };
  }

  // 1. Validate selectedServices
  if (
    !Array.isArray(formData.selectedServices) ||
    formData.selectedServices.length === 0
  ) {
    fieldErrors.selectedServices =
      "Please select at least one service category.";
  } else {
    const invalidServices = formData.selectedServices.filter(
      (id) => !VALID_SERVICE_IDS.has(id)
    );
    if (invalidServices.length > 0) {
      fieldErrors.selectedServices = `Invalid service category ID(s): ${invalidServices.join(
        ", "
      )}.`;
    } else if (
      formData.selectedServices.includes("not-sure") &&
      formData.selectedServices.length > 1
    ) {
      fieldErrors.selectedServices =
        "'Not sure yet' cannot be selected alongside other service categories.";
    }
  }

  // 2. Validate problemDescription
  const problemDesc =
    typeof formData.problemDescription === "string"
      ? formData.problemDescription.trim()
      : "";
  if (problemDesc.length > 500) {
    fieldErrors.problemDescription =
      "Problem description must not exceed 500 characters.";
  }

  // 3. Validate projectStage
  if (
    !formData.projectStage ||
    typeof formData.projectStage !== "string" ||
    !VALID_STAGE_VALUES.has(formData.projectStage)
  ) {
    fieldErrors.projectStage = "Please select a valid project stage.";
  }

  // 4. Validate existingSetup
  const existingSetup = Array.isArray(formData.existingSetup)
    ? formData.existingSetup
    : [];
  const invalidSetup = existingSetup.filter(
    (id) => !VALID_SETUP_VALUES.has(id)
  );
  if (invalidSetup.length > 0) {
    fieldErrors.existingSetup = `Invalid setup option(s): ${invalidSetup.join(
      ", "
    )}.`;
  } else {
    const hasExclusive = existingSetup.filter((id) =>
      EXCLUSIVE_SETUP_VALUES.has(id)
    );
    if (hasExclusive.length > 0 && existingSetup.length > 1) {
      fieldErrors.existingSetup =
        "Exclusive setup options cannot be combined with other tools.";
    }
  }

  // 5. Validate requirements
  const selectedServices = Array.isArray(formData.selectedServices)
    ? formData.selectedServices
    : [];
  const isNotSure = selectedServices.includes("not-sure");
  const requirements =
    formData.requirements &&
    typeof formData.requirements === "object" &&
    !Array.isArray(formData.requirements)
      ? formData.requirements
      : {};

  const reqKeys = Object.keys(requirements);
  if (isNotSure && reqKeys.length > 0) {
    fieldErrors.requirements =
      "Technical requirement groups cannot be submitted when 'Not sure yet' is selected.";
  } else {
    for (const serviceId of reqKeys) {
      if (!selectedServices.includes(serviceId)) {
        fieldErrors.requirements = `Requirements specified for unselected service: ${serviceId}.`;
        break;
      }
      const groupConfig = REQUIREMENT_GROUPS[serviceId];
      if (!groupConfig) {
        fieldErrors.requirements = `No requirement group defined for service: ${serviceId}.`;
        break;
      }
      const validOptionValues = new Set(
        groupConfig.options.map((o) => o.value)
      );
      const chosenValues = requirements[serviceId];
      if (!Array.isArray(chosenValues)) {
        fieldErrors.requirements = `Requirement options for ${serviceId} must be an array.`;
        break;
      }
      const invalidReqs = chosenValues.filter(
        (val) => !validOptionValues.has(val)
      );
      if (invalidReqs.length > 0) {
        fieldErrors.requirements = `Invalid requirement ID(s) for ${serviceId}: ${invalidReqs.join(
          ", "
        )}.`;
        break;
      }
    }
  }

  // 6. Validate expectedOutcome
  const expectedOutcome =
    typeof formData.expectedOutcome === "string"
      ? formData.expectedOutcome.trim()
      : "";
  if (expectedOutcome.length > 700) {
    fieldErrors.expectedOutcome =
      "Expected outcome must not exceed 700 characters.";
  }

  // 7. Validate name
  const name =
    typeof formData.name === "string" ? formData.name.trim() : "";
  if (!name) {
    fieldErrors.name = "Full name is required.";
  } else if (name.length > 100) {
    fieldErrors.name = "Full name must not exceed 100 characters.";
  }

  // 8. Validate email
  const email =
    typeof formData.email === "string"
      ? formData.email.trim().toLowerCase()
      : "";
  if (!email) {
    fieldErrors.email = "Email address is required.";
  } else if (email.length > 254) {
    fieldErrors.email = "Email address must not exceed 254 characters.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  // 9. Validate company
  const company =
    typeof formData.company === "string" ? formData.company.trim() : "";
  if (company.length > 150) {
    fieldErrors.company = "Company must not exceed 150 characters.";
  }

  // 10. Validate industry
  const industry =
    typeof formData.industry === "string" ? formData.industry.trim() : "";
  if (industry.length > 100) {
    fieldErrors.industry = "Industry must not exceed 100 characters.";
  }

  const isValid = Object.keys(fieldErrors).length === 0;

  const sanitizedData = isValid
    ? {
        selectedServices,
        problemDescription: problemDesc,
        projectStage: formData.projectStage,
        existingSetup,
        requirements,
        expectedOutcome,
        name,
        email,
        company,
        industry,
      }
    : null;

  return { isValid, fieldErrors, sanitizedData };
}
