import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get all properties
router.get("/", async (req, res) => {
  try {
    const properties = await prisma.property.findMany();
    const parsedProperties = properties.map((p) => ({
      ...p,
      imageUrls: JSON.parse(p.imageUrls),
    }));
    res.json(parsedProperties);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});

// Get single property by ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const property = await prisma.property.findUnique({
      where: { id },
      include: { category: true },
    });

    if (property) {
      res.json({ ...property, imageUrls: JSON.parse(property.imageUrls) });
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch property" });
  }
});

export default router;
