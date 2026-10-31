export const INTRO = {
  eyebrow: "PROJECT INTELLIGENCE",
  title: "Tell us what you're building.",
  description:
    "Choose what you need help with. We'll help turn it into a clear project brief.",
  cta: "Start discovery",
};

export const FORM_STEPS = [
  { id: "service-selection", number: 1, title: "What would you like help with?" },
  { id: "current-situation", number: 2, title: "Your current situation" },
  { id: "requirements", number: 3, title: "A little more about what you need" },
  { id: "expected-outcome", number: 4, title: "Your expected outcome" },
  { id: "project-brief", number: 5, title: "Your project brief" },
  { id: "contact", number: 6, title: "Your contact details" },
];

/**
 * Main Step 1 cards.
 * `description` and `helpsWith` explain what the service solves to non-technical
 * visitors; `capabilities` show the corresponding Cynbit service labels.
 */
export const SERVICE_CARDS = [
  {
    id: "ai-automation",
    title: "AI Automation",
    description:
      "Automate repetitive work, support customer conversations, and add AI capabilities to the software your business already uses.",
    helpsWith: [
      "Repetitive manual tasks such as data entry and document handling",
      "Lead handling, coordination and customer communication that need automation",
      "Adding AI capabilities to an existing SaaS product or software stack",
    ],
    capabilities: [
      "Autonomous AI agents",
      "LLM automation",
      "AI voice agents",
      "AI stack integration",
    ],
  },
  {
    id: "custom-it-services",
    title: "Custom IT Services",
    description:
      "Build a web or mobile product, develop its backend, strengthen its cloud infrastructure, or modernize an existing system.",
    helpsWith: [
      "Building a new web or mobile platform",
      "Backend systems and application integration requirements",
      "Deployment, infrastructure, security and legacy-system modernization",
    ],
    capabilities: [
      "Full-stack development",
      "Backend systems",
      "Cloud infrastructure",
      "Legacy migration",
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Improve online visibility, generate leads, nurture prospects, and turn more visits into enquiries.",
    helpsWith: [
      "Reaching potential customers through paid campaigns",
      "Improving technical search visibility",
      "Nurturing leads and improving landing-page conversions",
    ],
    capabilities: [
      "Performance ads",
      "Technical SEO",
      "CRM automation",
      "Funnel optimization",
    ],
  },
  {
    id: "not-sure",
    title: "Not sure yet",
    description:
      "You know the business problem, but you're not sure which service is right.",
    helpsWith: [
      "Explaining your challenge without choosing a technical service first",
    ],
    capabilities: [],
    exclusive: true,
    revealsQuestion: {
      id: "problem-description",
      label: "What are you trying to solve?",
      placeholder: "Briefly describe the challenge in your own words.",
      required: false,
      maxLength: 500,
    },
  },
];

export const CURRENT_SITUATION_QUESTIONS = [
  {
    id: "projectStage",
    label: "Where are you with this project?",
    type: "single-select",
    required: true,
    options: [
      { value: "exploring-idea", label: "Exploring an idea" },
      { value: "planning-new-project", label: "Planning a new project" },
      { value: "existing-product-system", label: "Already have a product or system" },
      { value: "improve-or-scale", label: "Looking to improve or scale something existing" },
    ],
  },
  {
    id: "existingSetup",
    label: "What do you currently have in place?",
    type: "multi-select",
    required: false,
    exclusiveOptions: ["nothing-yet", "not-sure"],
    options: [
      { value: "website-or-app", label: "Website or mobile app" },
      { value: "crm-or-third-party-tools", label: "CRM or other third-party tools" },
      { value: "custom-software", label: "Custom-built software or backend system" },
      { value: "manual-process", label: "Manual process or spreadsheets" },
      { value: "cloud-hosting", label: "Cloud or hosting environment" },
      { value: "nothing-yet", label: "Nothing in place yet" },
      { value: "not-sure", label: "Not sure" },
    ],
  },
];

/**
 * Step 3 requirement cards.
 * Only render a group when its matching service category was selected in Step 1.
 */
export const REQUIREMENT_GROUPS = {
  "ai-automation": {
    id: "ai-automation-requirements",
    title: "AI Automation",
    question: "What would you like AI to help with?",
    type: "multi-select-cards",
    options: [
      {
        value: "autonomous-ai-agents",
        title: "Automate tasks and coordinate work",
        description: "Use smart assistants to help manage tasks, leads and coordination.",
        capability: "Autonomous AI agents",
      },
      {
        value: "llm-automation",
        title: "Handle data and documents",
        description: "Reduce manual data entry and automate document handling.",
        capability: "LLM automation",
      },
      {
        value: "ai-voice-agents",
        title: "Manage voice-based conversations",
        description: "Use AI for voice-driven communication and interactions.",
        capability: "AI voice agents",
      },
      {
        value: "ai-stack-integration",
        title: "Add AI to software you already use",
        description: "Integrate AI capabilities into an existing SaaS product or software stack.",
        capability: "AI stack integration",
      },
    ],
  },
  "custom-it-services": {
    id: "custom-it-requirements",
    title: "Custom IT Services",
    question: "What do you need built or improved?",
    type: "multi-select-cards",
    options: [
      {
        value: "full-stack-development",
        title: "Build a web or mobile product",
        description: "Create a web or mobile platform for your users or business.",
        capability: "Full-stack development",
      },
      {
        value: "backend-systems",
        title: "Develop backend systems or integrations",
        description: "Build secure backend functionality and connect applications or services.",
        capability: "Backend systems",
      },
      {
        value: "cloud-infrastructure",
        title: "Improve cloud infrastructure or deployment",
        description: "Set up or improve cloud deployment and infrastructure.",
        capability: "Cloud infrastructure",
      },
      {
        value: "legacy-migration",
        title: "Modernize an existing system",
        description: "Modernize older or monolithic software systems.",
        capability: "Legacy migration",
      },
    ],
  },
  "digital-marketing": {
    id: "digital-marketing-requirements",
    title: "Digital Marketing",
    question: "Where would you like to improve?",
    type: "multi-select-cards",
    options: [
      {
        value: "performance-ads",
        title: "Generate leads through paid campaigns",
        description: "Reach potential customers through performance-focused Google and Meta advertising.",
        capability: "Performance ads",
      },
      {
        value: "technical-seo",
        title: "Improve search visibility",
        description: "Improve the technical foundations that affect search visibility.",
        capability: "Technical SEO",
      },
      {
        value: "crm-automation",
        title: "Automate lead follow-up",
        description: "Use CRM automation to nurture leads and customer relationships.",
        capability: "CRM automation",
      },
      {
        value: "funnel-optimization",
        title: "Improve landing pages and conversions",
        description: "Improve landing pages and conversion paths using user behaviour.",
        capability: "Funnel optimization",
      },
    ],
  },
};

export const EXPECTED_OUTCOME_QUESTION = {
  id: "expectedOutcome",
  label: "What's the main result you'd like to achieve?",
  type: "textarea",
  required: false,
  maxLength: 700,
  placeholder:
    "For example, reduce manual work, launch a new platform, or generate more qualified leads.",
};

export const CONTACT_FIELDS = [
  { id: "name", label: "Full Name", type: "text", required: true },
  { id: "email", label: "Email Address", type: "email", required: true },
  { id: "company", label: "Company", type: "text", required: false },
  { id: "industry", label: "Industry", type: "text", required: false },
];

/**
 * Apply Step 1 multi-select behaviour. `not-sure` is exclusive of service cards.
 * Selecting a service while not-sure is active replaces the not-sure selection.
 */
export function toggleServiceSelection(currentSelection = [], selectedId) {
  const selection = new Set(currentSelection);

  if (selectedId === "not-sure") {
    return selection.has("not-sure") ? [] : ["not-sure"];
  }

  selection.delete("not-sure");

  if (selection.has(selectedId)) {
    selection.delete(selectedId);
  } else {
    selection.add(selectedId);
  }

  return [...selection];
}

/**
 * Get only the Step 3 question groups relevant to the Step 1 selections.
 * If `not-sure` is selected, no technical category groups are displayed.
 */
export function getVisibleRequirementGroups(selectedServices = []) {
  if (selectedServices.includes("not-sure")) return [];

  return selectedServices
    .filter((serviceId) => Object.hasOwn(REQUIREMENT_GROUPS, serviceId))
    .map((serviceId) => REQUIREMENT_GROUPS[serviceId]);
}

/**
 * Generic multi-select helper for requirement cards and setup options.
 * If one of the exclusive options is selected, it clears other values.
 */
export function toggleMultiSelect(currentSelection = [], selectedId, exclusiveOptions = []) {
  const exclusive = new Set(exclusiveOptions);
  const selection = new Set(currentSelection);

  if (exclusive.has(selectedId)) {
    return selection.has(selectedId) ? [] : [selectedId];
  }

  for (const exclusiveId of exclusive) selection.delete(exclusiveId);

  if (selection.has(selectedId)) {
    selection.delete(selectedId);
  } else {
    selection.add(selectedId);
  }

  return [...selection];
}
