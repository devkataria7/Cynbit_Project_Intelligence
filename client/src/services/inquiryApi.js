const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
  "http://localhost:5000";

/**
 * Submits the project inquiry to POST /api/inquiries using native fetch.
 * Sends { formData } envelope as required by the API contract.
 */
export async function submitInquiry(formData) {
  const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formData }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage =
      result?.message ||
      (result?.fieldErrors
        ? Object.values(result.fieldErrors).join(" ")
        : null) ||
      `Submission failed with status ${response.status}`;

    const error = new Error(errorMessage);
    error.status = response.status;
    error.fieldErrors = result?.fieldErrors || {};
    throw error;
  }

  return result;
}
