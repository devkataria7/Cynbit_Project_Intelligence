import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema(
  {
    serviceTitle: {
      type: String,
      required: true,
    },
    capability: {
      type: String,
      required: true,
    },
    basedOn: {
      type: String,
      default: "",
    },
    explanation: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const inquirySchema = new mongoose.Schema(
  {
    inquiryId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    formData: {
      selectedServices: {
        type: [String],
        required: true,
      },
      problemDescription: {
        type: String,
        default: "",
      },
      projectStage: {
        type: String,
        required: true,
      },
      existingSetup: {
        type: [String],
        default: [],
      },
      requirements: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
      expectedOutcome: {
        type: String,
        default: "",
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        // Notice: No unique constraint on email per PRD (a user may submit multiple inquiries)
      },
      company: {
        type: String,
        default: "",
        trim: true,
      },
      industry: {
        type: String,
        default: "",
        trim: true,
      },
    },
    recommendations: {
      type: [recommendationSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Inquiry =
  mongoose.models.Inquiry || mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
