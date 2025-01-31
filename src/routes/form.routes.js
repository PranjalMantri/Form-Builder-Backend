import express from "express";
import { body, validationResult } from "express-validator";
import { Form } from "../models/form.model.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
console.log("Form router was called");

/**
 * @route   POST /api/forms
 * @desc    Create a new form
 * @access  Private
 */
router.post(
  "/",
  authMiddleware,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("fields")
      .isArray({ min: 1 })
      .withMessage("At least one field is required"),
    body("fields.*.label")
      .notEmpty()
      .withMessage("Each field must have a label"),
    body("fields.*.type")
      .isIn([
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
      ])
      .withMessage("Invalid field type"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { title, description, fields, isPublic } = req.body;
      const newForm = new Form({
        user: req.user.id,
        title,
        description,
        fields,
        isPublic,
      });
      await newForm.save();
      res.status(201).json(newForm);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * @route   GET /api/forms
 * @desc    Get all public forms
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const forms = await Form.find({ isPublic: true });
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/forms/:id
 * @desc    Get a single form by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });
    res.json(form);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   POST /api/forms/:id/fields
 * @desc    Add a field to a form
 * @access  Private
 */
router.post("/:id/fields", authMiddleware, async (req, res) => {
  console.log("POST /api/forms/:id/fields route hit"); // Add this for debugging

  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });

    if (form.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { label, type, options, required } = req.body;
    if (!label || !type) {
      return res.status(400).json({ message: "Label and type are required" });
    }

    const newField = { label, type, options, required };
    form.fields.push(newField);
    await form.save();

    res.status(201).json(form);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   PUT /api/forms/:id/fields/:fieldId
 * @desc    Update a field in a form
 * @access  Private
 */
router.put("/:id/fields/:fieldId", authMiddleware, async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });

    if (form.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const field = form.fields.id(req.params.fieldId);
    if (!field) return res.status(404).json({ message: "Field not found" });

    const { label, type, options, required } = req.body;
    if (label) field.label = label;
    if (type) field.type = type;
    if (options) field.options = options;
    if (required !== undefined) field.required = required;

    await form.save();
    res.json(form);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   DELETE /api/forms/:id/fields/:fieldId
 * @desc    Delete a field from a form
 * @access  Private
 */
router.delete("/:id/fields/:fieldId", authMiddleware, async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });

    if (form.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    form.fields = form.fields.filter(
      (field) => field._id.toString() !== req.params.fieldId
    );
    await form.save();

    res.json({ message: "Field deleted", form });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
