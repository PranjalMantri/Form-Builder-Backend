import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {
    form: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },
    responses: [
      {
        fieldId: { type: mongoose.Schema.Types.ObjectId, required: true },
        value: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Submission = mongoose.model("Submission", SubmissionSchema);
