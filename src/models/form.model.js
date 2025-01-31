import mongoose from "mongoose";

const FormSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    fields: [
      {
        label: { type: String, required: true },
        type: {
          type: String,
          required: true,
          enum: [
            "text",
            "email",
            "number",
            "checkbox",
            "radio",
            "select",
            "password",
            "file",
            "date",
            "time",
          ],
        },
        options: [{ type: String }],
        required: { type: Boolean, default: false },
      },
    ],
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Form = mongoose.model("Form", FormSchema);
