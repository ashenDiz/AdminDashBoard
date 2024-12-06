import express from "express";
import { createInvoice } from "../controllers/invoiceController.js";

const router  = express.Router();

// POST route for creating invoices
router.post("/create", createInvoice);

export default router ;
