import express from "express";
import Form from "../models/Form.js";
import Submission from "../models/Submission.js";

const router = express.Router();

/**
 * @route   POST /api/submissions/:formId
 * @desc    Submit a response to a form
 * @access  Public
 */
router.post("/:formId", async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId);
    if (!form) return res.status(404).json({ message: "Form not found" });

    // Validate dynamically based on form fields
    let errors = [];
    form.fields.forEach((field) => {
      if (field.required) {
        const response = req.body.responses.find(
          (r) => r.fieldId === field._id.toString()
        );
        if (!response || !response.value) {
          errors.push({
            field: field.label,
            message: `${field.label} is required`,
          });
        }
      }
    });

    if (errors.length > 0) return res.status(400).json({ errors });

    // Save submission
    const newSubmission = new Submission({
      form: req.params.formId,
      responses: req.body.responses,
    });

    await newSubmission.save();
    res.status(201).json({ message: "Form submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
