/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import {
  toggleServiceSelection,
  toggleMultiSelect,
} from "../config/cynbit-form-config.js";

export const INITIAL_FORM_DATA = {
  selectedServices: [],
  problemDescription: "",
  projectStage: "",
  existingSetup: [],
  requirements: {},
  expectedOutcome: "",
  name: "",
  email: "",
  company: "",
  industry: "",
};

const initialState = {
  step: 0, // 0 = Intro, 1..6 = Wizard Steps, 7 = Complete
  formData: INITIAL_FORM_DATA,
  errors: {},
  isSubmitting: false,
  submissionError: null,
  submissionResult: null,
};

export const ACTIONS = {
  START_DISCOVERY: "START_DISCOVERY",
  GO_TO_STEP: "GO_TO_STEP",
  NEXT_STEP: "NEXT_STEP",
  PREV_STEP: "PREV_STEP",
  UPDATE_FORM_FIELD: "UPDATE_FORM_FIELD",
  TOGGLE_SERVICE: "TOGGLE_SERVICE",
  TOGGLE_SETUP: "TOGGLE_SETUP",
  TOGGLE_REQUIREMENT: "TOGGLE_REQUIREMENT",
  SET_ERRORS: "SET_ERRORS",
  CLEAR_ERRORS: "CLEAR_ERRORS",
  RESET_FORM: "RESET_FORM",
  SUBMIT_START: "SUBMIT_START",
  SUBMIT_SUCCESS: "SUBMIT_SUCCESS",
  SUBMIT_FAILURE: "SUBMIT_FAILURE",
};

function projectIntelligenceReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_DISCOVERY:
      return {
        ...state,
        step: 1,
        errors: {},
      };

    case ACTIONS.GO_TO_STEP:
      return {
        ...state,
        step: action.payload,
        errors: {},
      };

    case ACTIONS.NEXT_STEP:
      return {
        ...state,
        step: state.step + 1,
        errors: {},
      };

    case ACTIONS.PREV_STEP:
      return {
        ...state,
        step: Math.max(0, state.step - 1),
        errors: {},
      };

    case ACTIONS.UPDATE_FORM_FIELD:
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.field]: action.payload.value,
        },
        errors: {
          ...state.errors,
          [action.payload.field]: undefined,
        },
      };

    case ACTIONS.TOGGLE_SERVICE: {
      const nextServices = toggleServiceSelection(
        state.formData.selectedServices,
        action.payload
      );
      return {
        ...state,
        formData: {
          ...state.formData,
          selectedServices: nextServices,
        },
        errors: {
          ...state.errors,
          selectedServices: undefined,
        },
      };
    }

    case ACTIONS.TOGGLE_SETUP: {
      const nextSetup = toggleMultiSelect(
        state.formData.existingSetup,
        action.payload,
        ["nothing-yet", "not-sure"]
      );
      return {
        ...state,
        formData: {
          ...state.formData,
          existingSetup: nextSetup,
        },
      };
    }

    case ACTIONS.TOGGLE_REQUIREMENT: {
      const { serviceId, optionValue } = action.payload;
      const currentServiceRequirements =
        state.formData.requirements[serviceId] || [];
      const updatedServiceRequirements = toggleMultiSelect(
        currentServiceRequirements,
        optionValue
      );

      return {
        ...state,
        formData: {
          ...state.formData,
          requirements: {
            ...state.formData.requirements,
            [serviceId]: updatedServiceRequirements,
          },
        },
      };
    }

    case ACTIONS.SET_ERRORS:
      return {
        ...state,
        errors: action.payload || {},
      };

    case ACTIONS.CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
      };

    case ACTIONS.SUBMIT_START:
      return {
        ...state,
        isSubmitting: true,
        submissionError: null,
      };

    case ACTIONS.SUBMIT_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        submissionError: null,
        submissionResult: action.payload,
        step: 7,
      };

    case ACTIONS.SUBMIT_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        submissionError: action.payload,
      };

    case ACTIONS.RESET_FORM:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

const ProjectIntelligenceContext = createContext(null);

export function ProjectIntelligenceProvider({ children }) {
  const [state, dispatch] = useReducer(projectIntelligenceReducer, initialState);

  const startDiscovery = () => dispatch({ type: ACTIONS.START_DISCOVERY });
  const goToStep = (stepNumber) =>
    dispatch({ type: ACTIONS.GO_TO_STEP, payload: stepNumber });
  const nextStep = () => dispatch({ type: ACTIONS.NEXT_STEP });
  const prevStep = () => dispatch({ type: ACTIONS.PREV_STEP });
  const updateField = (field, value) =>
    dispatch({
      type: ACTIONS.UPDATE_FORM_FIELD,
      payload: { field, value },
    });
  const toggleService = (serviceId) =>
    dispatch({ type: ACTIONS.TOGGLE_SERVICE, payload: serviceId });
  const toggleSetup = (setupId) =>
    dispatch({ type: ACTIONS.TOGGLE_SETUP, payload: setupId });
  const toggleRequirement = (serviceId, optionValue) =>
    dispatch({
      type: ACTIONS.TOGGLE_REQUIREMENT,
      payload: { serviceId, optionValue },
    });
  const setErrors = (errors) =>
    dispatch({ type: ACTIONS.SET_ERRORS, payload: errors });
  const clearErrors = () => dispatch({ type: ACTIONS.CLEAR_ERRORS });
  const resetForm = () => dispatch({ type: ACTIONS.RESET_FORM });
  const setSubmitting = () => dispatch({ type: ACTIONS.SUBMIT_START });
  const setSubmissionSuccess = (result) =>
    dispatch({ type: ACTIONS.SUBMIT_SUCCESS, payload: result });
  const setSubmissionFailure = (error) =>
    dispatch({ type: ACTIONS.SUBMIT_FAILURE, payload: error });

  const value = {
    state,
    dispatch,
    step: state.step,
    formData: state.formData,
    errors: state.errors,
    isSubmitting: state.isSubmitting,
    submissionError: state.submissionError,
    submissionResult: state.submissionResult,
    startDiscovery,
    goToStep,
    nextStep,
    prevStep,
    updateField,
    toggleService,
    toggleSetup,
    toggleRequirement,
    setErrors,
    clearErrors,
    resetForm,
    setSubmitting,
    setSubmissionSuccess,
    setSubmissionFailure,
  };

  return (
    <ProjectIntelligenceContext.Provider value={value}>
      {children}
    </ProjectIntelligenceContext.Provider>
  );
}

export function useProjectIntelligence() {
  const context = useContext(ProjectIntelligenceContext);
  if (!context) {
    throw new Error(
      "useProjectIntelligence must be used within a ProjectIntelligenceProvider"
    );
  }
  return context;
}
