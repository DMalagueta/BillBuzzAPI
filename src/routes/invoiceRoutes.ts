import express from "express";
import Invoice from "../models/Invoice";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

// Apply verifyToken middleware to all routes
router.use(verifyToken);

// POST - Create a new invoice
router.post("/", async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const invoice = new Invoice({
    ...req.body,
    userId, // Ensure the invoice is associated with the authenticated user
  });

  try {
    const savedInvoice = await invoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// GET - Retrieve all invoices for the authenticated user
router.get("/", async (req, res) => {
  const userId = req.userId;
  try {
    const invoices = await Invoice.find({ userId });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// GET - Retrieve a specific invoice by ID
router.get("/:id", async (req, res) => {
  const userId = req.userId;
  try {
    const invoice = await Invoice.findOne({ _id: req.params.id, userId });
    if (!invoice) return res.status(404).json({ message: "Invoice not found or access denied" });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// PUT - Update a specific invoice, ensuring it belongs to the user
router.put("/:id", async (req, res) => {
  const userId = req.userId;
  try {
    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, userId }, // Check ownership
      req.body,
      { new: true }
    );
    if (!invoice) return res.status(404).json({ message: "Invoice not found or access denied" });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// DELETE - Delete a specific invoice, ensuring it belongs to the user
router.delete("/:id", async (req, res) => {
  const userId = req.userId;
  try {
    const invoice = await Invoice.findOneAndDelete({ _id: req.params.id, userId });
    if (!invoice) return res.status(404).json({ message: "Invoice not found or access denied" });
    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
