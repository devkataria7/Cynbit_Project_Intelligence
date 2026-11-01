# Cynbit Project Intelligence
## Technical Report — Full-Stack Assessment Prototype

**Applicant:** Dev Kataria  
**Role:** Full Stack Developer Intern  
**GitHub:** https://github.com/devkataria7/Cynbit_Project_Intelligence  
**Live prototype:** https://cynbit-project-intelligence-yp4p.vercel.app/  

## 1. Problem Statement

Cynbit offers services across AI automation, custom software development, cloud and backend systems, and digital marketing. A potential client may understand the business problem they want to solve without knowing which services are relevant or how to describe the technical requirements. Cynbit's existing contact experience provides a general inquiry form, leaving much of that explanation to the visitor.

**Opportunity:** Make project discovery easier by guiding visitors through a short questionnaire, translating their answers into a structured project brief, and suggesting relevant Cynbit service capabilities.

## 2. Proposed Improvement

**Cynbit Project Intelligence** is a guided, multi-step project discovery experience. Visitors can:

- Select one or multiple service categories using descriptive cards.
- Answer questions relevant to their current situation and selected services.
- Describe their desired outcome.
- Review a project brief with preliminary service recommendations.
- Submit their inquiry and receive a unique reference ID.

The form supports visitors who are unsure which service they need and keeps the inquiry focused on relevant information.

## 3. Technology Stack

| Area | Technology | Purpose |
|---|---|---|
| Frontend | React, Vite | Multi-step application and development/build tooling |
| Styling and icons | Tailwind CSS, Lucide React | Responsive interface and icons |
| State management | Context API, `useReducer`, custom hook | Maintain form state across steps |
| Recommendation logic | JavaScript rules engine | Generate preliminary recommendations from answers |
| Backend | Node.js, Express.js | Inquiry API |
| Database | MongoDB Atlas, Mongoose | Persist submitted inquiries |
| Validation | Server-side JavaScript validation | Validate contact details, service and requirement selections |
| Deployment | Vercel | Host frontend and backend as separate projects |

## 4. Implementation and Architecture

The frontend manages the questionnaire and displays a recommendation preview locally using the JavaScript recommendation engine. The visitor's answers remain in shared React state as they move between steps.

On final submission, the frontend sends the form data to the Express API. The backend validates the payload, recalculates recommendations using its own copy of the rules, saves the inquiry through Mongoose in MongoDB Atlas, and returns a unique inquiry ID. The frontend then displays the submission confirmation.

```text
Visitor
  → React multi-step questionnaire
  → Client-side recommendation preview
  → Project brief review
  → POST /api/inquiries
  → Express validation and recommendation calculation
  → MongoDB Atlas (Mongoose)
  → Inquiry ID and confirmation
```

**API:** `POST /api/inquiries`  
**Request format:** JSON containing a `formData` object with the questionnaire answers and contact details.  
**Responses:** `201` for a saved inquiry, `400` for invalid input, and `500` for an unexpected server or persistence error.

The frontend and backend are deployed separately from the same repository. The frontend uses `VITE_API_BASE_URL`; the backend uses `MONGODB_URI` and `FRONTEND_URL`. The prototype uses its own demonstration database and is not connected to Cynbit's production systems.

## 5. Testing and Results

The following scenarios were tested during development and integration:

| Test | Result |
|---|---|
| Valid single-service inquiry and database save | Passed — `201` and inquiry ID returned |
| Multiple service selection and combined recommendations | Passed |
| Exclusive “Not sure yet” selection rule | Passed — invalid mixed selection rejected |
| Unknown service or requirement identifiers | Passed — `400` |
| Missing name, missing email or invalid email | Passed — `400` |
| Empty optional fields | Passed — valid minimal inquiry accepted |
| Sanitized error responses | Passed — no stack traces or database internals exposed |
| Repeated submission and network failure handling | Passed — duplicate clicks prevented and entered values retained |
| Frontend production build | Passed — `npm run build` |
| ESLint | Passed — zero errors and zero warnings |
| Deployed inquiry flow | Passed — submission reaches the backend and is saved in MongoDB Atlas |

## 6. Scope and Limitations

This prototype focuses on guided project discovery and inquiry submission. It does not include user accounts, an admin dashboard, email automation, CRM integration, or an LLM-based recommendation system. Recommendations are deterministic and based on predefined mappings to Cynbit's service capabilities. The application operates independently from Cynbit's production systems.

## 7. Conclusion

Cynbit Project Intelligence turns a general project inquiry into a guided discovery process. It helps visitors communicate their needs, understand relevant service options, and submit a structured project brief. The implementation demonstrates responsive React development, shared state management, conditional forms, rule-based recommendations, REST API integration, server-side validation, and MongoDB persistence.

## References

- Cynbit Contact page: https://www.cynbit.in/contact
- Cynbit Services page: https://www.cynbit.in/services
