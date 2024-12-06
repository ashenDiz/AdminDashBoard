import Invoice from "../models/invoiceM.js";
import Product from "../models/productM.js";
import Customer from "../models/customerM.js";

export const createInvoice = async (req, res) => {
  const { customerId, items } = req.body;

  try {
    // Validate customer
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Validate products and calculate total amount
    let totalAmount = 0;
    const processedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }
        if (product.quantity < item.quantity) {
          throw new Error(
            `Insufficient stock for product: ${product.name} (requested: ${item.quantity}, available: ${product.quantity})`
          );
        }

        // Deduct quantity
        product.quantity -= item.quantity;
        await product.save();

        // Update total amount
        totalAmount += product.price * item.quantity;

        return {
          product: product._id,
          quantity: item.quantity,
        };
      })
    );

    // Create invoice
    const invoice = await Invoice.create({
      customer: customerId,
      items: processedItems,
      totalAmount,
    });

    res.status(201).json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
