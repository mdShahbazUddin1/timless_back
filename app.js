require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

// Shopify API credentials
const shopifyApiKey = process.env.SHOPIFY_API_KEY;
const shopifyApiPassword = process.env.SHOPIFY_API_PASSWORD;
const shopifyAccessToken = process.env.SHOPIFY_ACCESS_TOKEN;
const shopDomain = process.env.SHOP_DOMAIN;

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello from server");
});

// Endpoint to fetch product data
app.get("/api/product/:id", async (req, res) => {
  const productId = req.params.id;
  const url = `https://${shopDomain}/admin/api/2023-10/products/${productId}.json`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": shopifyAccessToken,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
