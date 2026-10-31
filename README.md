# Cynbit Project Intelligence

An interactive project discovery and brief generator prototype for **Cynbit**. Visitors explore services (AI Automation, Custom IT, Digital Marketing), define their situation, select tailored requirements, and preview an instant architectural brief and recommendation set before submitting their inquiry.

---

## Architecture Overview

This repository is organized as a decoupled monorepo:

- **Frontend (`client/`)**: Modern React 19 application built with Vite and Tailwind CSS. Manages multi-step discovery state, client-side recommendation engine previews, and submission dispatch.
- **Backend (`server/`)**: Minimal Express application with MongoDB Atlas persistence via Mongoose. Validates form data against the official service configuration, recalculates recommendations authoritatively on the server, and returns an inquiry reference ID.

---

## Directory Structure

```text
.
├── client/                     # Frontend Vite + React application
│   ├── src/
│   │   ├── components/         # Wizard steps, layout, and completion screens
│   │   ├── config/             # Form question options and recommendation rules
│   │   ├── context/            # ProjectIntelligenceContext & reducer
│   │   ├── services/           # inquiryApi.js (native fetch client)
│   │   ├── App.jsx             # Main shell and step orchestrator
│   │   └── index.css           # Global typography & design tokens
│   ├── .env.example            # Template for frontend environment variables
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend Express + Node ES-module application
│   ├── src/
│   │   ├── config/             # database.js, cynbit-form-config.js, recommendationEngine.js
│   │   ├── models/             # Inquiry.js (Mongoose schema)
│   │   ├── utils/              # validation.js (handwritten field & exclusivity validator)
│   │   ├── app.js              # Express app, CORS configuration & POST /api/inquiries
│   │   ├── index.js            # Vercel entry point (default export)
│   │   └── server.js           # Local HTTP listener (PORT 5000)
│   ├── .env.example            # Template for backend environment variables
│   └── package.json
│
├── .gitignore                  # Ignores node_modules, dist, and local .env files
└── README.md                   # Setup, API contract, and deployment documentation
```

---

## Local Development Setup

### Prerequisites

- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)
- A MongoDB Atlas database URI (or local MongoDB instance)

---

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your local environment file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Configure your `.env` variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/cynbit_inquiries?retryWrites=true&w=majority
   FRONTEND_URL=http://localhost:5173
   ```

5. Start the backend in development mode:
   ```bash
   npm run dev
   ```
   *The backend will listen on `http://localhost:5000`.*

---

### 2. Frontend Setup

1. Open a second terminal window and navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create a `.env` file if you want to override the backend URL:
   ```bash
   cp .env.example .env
   ```
   *(By default, `client/src/services/inquiryApi.js` automatically falls back to `http://localhost:5000` if `VITE_API_BASE_URL` is omitted).*

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The Vite development server will open on `http://localhost:5173`.*

---

### 3. Production Build Validation

To verify the client production bundle:
```bash
cd client
npm run build
```
Build assets will be generated in `client/dist/`.

---

## Environment Variables

### Frontend (`client/`)

| Variable | Required | Description | Example |
|---|---|---|---|
| `VITE_API_BASE_URL` | No | Base URL of the backend API. Defaults to `http://localhost:5000` in local dev. | `https://your-backend.vercel.app` |

> [!NOTE]
> `VITE_API_BASE_URL` is exposed to the browser client. Never place secrets or database connection strings in Vite variables.

### Backend (`server/`)

| Variable | Required | Description | Example |
|---|---|---|---|
| `PORT` | No | Local server port. Defaults to `5000`. | `5000` |
| `MONGODB_URI` | Yes | MongoDB Atlas connection string. | `mongodb+srv://user:pass@cluster.mongodb.net/cynbit` |
| `FRONTEND_URL` | No | Allowed frontend origin for CORS. | `https://your-frontend.vercel.app` |

---

## API Contract

### Endpoint

```http
POST /api/inquiries
Content-Type: application/json
```

This is the single submission endpoint for the assessment prototype.

### Request Body

Requests must send a JSON object containing the exact `formData` envelope:

```json
{
  "formData": {
    "selectedServices": ["ai-automation", "custom-it-services"],
    "problemDescription": "Automating manual review workflows for diagnostic reports.",
    "projectStage": "planning-new-project",
    "existingSetup": ["website-or-app", "crm-or-third-party-tools"],
    "requirements": {
      "ai-automation": ["autonomous-ai-agents", "llm-automation"],
      "custom-it-services": ["full-stack-development"]
    },
    "expectedOutcome": "Reduce turnaround time by 50% within 3 months.",
    "name": "Alex Rivera",
    "email": "alex@example.com",
    "company": "Apex Diagnostics",
    "industry": "Healthcare Analytics"
  }
}
```

### Field Specifications & Validation Rules

| Field | Type | Required | Validation Rules |
|---|---|:---:|---|
| `selectedServices` | `string[]` | **Yes** | Must contain valid category IDs (`ai-automation`, `custom-it-services`, `digital-marketing`, `not-sure`). `'not-sure'` is exclusive and cannot be combined with other services. |
| `problemDescription` | `string` | No | Maximum 500 characters. Trimmed. |
| `projectStage` | `string` | **Yes** | Must be one of: `exploring-idea`, `planning-new-project`, `existing-product-system`, `improve-or-scale`. |
| `existingSetup` | `string[]` | No | Allowed values: `website-or-app`, `crm-or-third-party-tools`, `custom-software`, `manual-process`, `cloud-hosting`, `nothing-yet`, `not-sure`. `'nothing-yet'` and `'not-sure'` are exclusive. |
| `requirements` | `object` | No | Keys must be selected service IDs. Values must be arrays of valid requirement IDs belonging to that service. Empty arrays allowed. |
| `expectedOutcome` | `string` | No | Maximum 700 characters. Trimmed. |
| `name` | `string` | **Yes** | Non-empty string, trimmed, maximum 100 characters. |
| `email` | `string` | **Yes** | Valid RFC 5322 email format, trimmed, lowercased, maximum 254 characters. |
| `company` | `string` | No | Maximum 150 characters. Trimmed. |
| `industry` | `string` | No | Maximum 100 characters. Trimmed. |

> [!IMPORTANT]
> - Client-side recommendations are never trusted. The backend recalculates recommendations on the server using `buildProjectBriefPreview(formData)`.
> - UI state (`step`, `errors`, `isSubmitting`, `submissionResult`) must never be sent in the payload.

---

### Response Formats

#### 1. Success — HTTP 201 Created

```json
{
  "success": true,
  "message": "Your project inquiry was submitted successfully.",
  "data": {
    "inquiryId": "CYN-2010FCB5",
    "submittedAt": "2026-11-01T03:30:00.000Z"
  }
}
```

#### 2. Validation Failure — HTTP 400 Bad Request

```json
{
  "success": false,
  "message": "Please review the submitted information.",
  "fieldErrors": {
    "email": "Please enter a valid email address.",
    "selectedServices": "'Not sure yet' cannot be selected alongside other service categories."
  }
}
```

#### 3. Database / Server Error — HTTP 500 Internal Server Error

```json
{
  "success": false,
  "message": "We couldn't submit your inquiry right now. Please try again."
}
```

*Raw MongoDB error messages, stack traces, and personal data are never exposed in error responses.*

---

## Vercel Deployment Guide

To deploy this repository to Vercel, connect this single Git repository to **two separate Vercel projects**:

### Project 1: Frontend (Client)

1. In the Vercel Dashboard, click **Add New...** > **Project** and select this repository.
2. In **Project Settings**:
   - **Project Name**: `cynbit-project-intelligence` (or your preferred name)
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
3. Under **Environment Variables**:
   - Name: `VITE_API_BASE_URL`
   - Value: `https://<your-backend-project>.vercel.app` *(deploy the backend first or update this after obtaining the backend URL)*
4. Click **Deploy**.

---

### Project 2: Backend (Server)

1. In the Vercel Dashboard, click **Add New...** > **Project** and select the same repository again.
2. In **Project Settings**:
   - **Project Name**: `cynbit-inquiry-api` (or your preferred name)
   - **Framework Preset**: `Other`
   - **Root Directory**: `server`
3. **Entry Point Compatibility**:
   - The Express application is exported as the default export from `server/src/index.js`, enabling Vercel to execute it as a Serverless Function.
4. Under **Environment Variables**:
   - `MONGODB_URI`: Your production MongoDB Atlas connection string (with database specified).
   - `FRONTEND_URL`: `https://<your-frontend-project>.vercel.app` *(matches your frontend deployment domain for CORS)*.
5. Click **Deploy**.

---

## Security & Privacy Notice

- **Database Isolation**: This independent assessment prototype stores project inquiries in its own demonstration database and is not connected to Cynbit internal production systems or enterprise CRM.
- **Credential Protection**: Real `.env` files and `MONGODB_URI` connection strings are strictly ignored by `.gitignore` and must never be committed to source control.
- **Sanitized Logging**: Server logs record operational events without logging raw visitor passwords, sensitive contact details, or credentials.
