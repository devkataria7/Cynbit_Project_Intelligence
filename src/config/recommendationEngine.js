/**
 * Cynbit Project Intelligence — client-side recommendation preview.
 *
 * Recommendations are derived only from the visitor's selected questionnaire
 * options and the capability mappings in cynbit-form-config.js. This module
 * does not call an API or make claims about architecture, pricing or delivery.
 *
 * Expected form state:
 * {
 *   selectedServices: ["ai-automation", "custom-it-services"],
 *   problemDescription: "...", // used when selectedServices includes "not-sure"
 *   projectStage: "planning-new-project",
 *   existingSetup: ["website-or-app", "crm-or-third-party-tools"],
 *   requirements: {
 *     "ai-automation": ["autonomous-ai-agents", "ai-stack-integration"],
 *     "custom-it-services": ["backend-systems"]
 *   },
 *   expectedOutcome: "..."
 * }
 */

import {
  SERVICE_CARDS,
  CURRENT_SITUATION_QUESTIONS,
  REQUIREMENT_GROUPS,
} from "./cynbit-form-config.js";

const NOT_SURE_ID = "not-sure";

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
}

function findOptionLabel(questionId, value) {
  const question = CURRENT_SITUATION_QUESTIONS.find((item) => item.id === questionId);
  return question?.options.find((option) => option.value === value)?.label ?? value;
}

/**
 * Converts the current questionnaire state into the content for the preview.
 * Every recommended capability comes from a requirement option the visitor
 * actually selected; unselected capabilities are never presented as chosen.
 */
export function buildProjectBriefPreview(formData = {}) {
  const selectedServiceIds = asArray(formData.selectedServices);
  const selectedServiceCards = selectedServiceIds
    .map((id) => SERVICE_CARDS.find((card) => card.id === id))
    .filter(Boolean);

  const isNotSure = selectedServiceIds.includes(NOT_SURE_ID);
  const requirementSelections = formData.requirements ?? {};

  const requirementGroups = isNotSure
    ? []
    : selectedServiceIds
        .filter((serviceId) => Object.prototype.hasOwnProperty.call(REQUIREMENT_GROUPS, serviceId))
        .map((serviceId) => {
          const group = REQUIREMENT_GROUPS[serviceId];
          const selectedValues = new Set(asArray(requirementSelections[serviceId]));
          const selectedOptions = group.options.filter((option) => selectedValues.has(option.value));

          return {
            serviceId,
            title: group.title,
            question: group.question,
            selectedOptions,
            recommendations: selectedOptions.map((option) => ({
              capability: option.capability,
              basedOn: option.title,
              explanation: option.description,
            })),
          };
        });

  const recommendations = requirementGroups.flatMap((group) =>
    group.recommendations.map((item) => ({ ...item, serviceTitle: group.title }))
  );

  return {
    selectedServiceCards,
    isNotSure,
    problemDescription: (formData.problemDescription ?? "").trim(),
    projectStage: formData.projectStage
      ? findOptionLabel("projectStage", formData.projectStage)
      : "Not provided",
    existingSetup: asArray(formData.existingSetup).map((value) =>
      findOptionLabel("existingSetup", value)
    ),
    requirementGroups,
    recommendations,
    expectedOutcome: (formData.expectedOutcome ?? "").trim(),
    hasSpecificRecommendations: recommendations.length > 0,
    hasSelectedService: selectedServiceCards.length > 0,
  };
}

/**
 * A compact summary suitable for sending with the final inquiry later.
 * The backend should validate the raw selections and may recalculate this data.
 */
export function buildRecommendationPayload(formData = {}) {
  const preview = buildProjectBriefPreview(formData);

  return {
    selectedServices: preview.selectedServiceCards.map((card) => card.id),
    requirements: preview.requirementGroups.map((group) => ({
      serviceId: group.serviceId,
      serviceTitle: group.title,
      selectedRequirements: group.selectedOptions.map((option) => ({
        value: option.value,
        title: option.title,
        capability: option.capability,
      })),
    })),
  };
}
