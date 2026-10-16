import express from "express";
import { Kindle } from "./dist/esm/kindle.js";

const app = express();
const PORT = process.env.PORT || 3000;

let kindle = null;

app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "Kindle API server is running"
  });
});

app.get("/books", async (req, res) => {
  try {
    if (!kindle) {
      return res.status(503).json({
        error: "Kindle client is not initialized"
      });
    }

    res.json(kindle.defaultBooks);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch books"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Kindle API running on port ${PORT}`);
});
