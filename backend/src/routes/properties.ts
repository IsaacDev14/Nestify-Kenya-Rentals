import { Router } from "express";
import { supabase } from "../lib/supabase";

const router = Router();

// Get all properties
router.get("/", async (req, res) => {
  try {
    const { data: properties, error } = await supabase
      .from('Property')
      .select('*');

    if (error) throw error;

    const parsedProperties = properties.map((p: any) => ({
      ...p,
      imageUrls: typeof p.imageUrls === 'string' ? p.imageUrls.split(',') : p.imageUrls,
    }));
    res.json(parsedProperties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});

// Get single property by ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { data: property, error } = await supabase
      .from('Property')
      .select('*, category:Category(*)')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (property) {
      res.json({
        ...property,
        imageUrls: typeof property.imageUrls === 'string' ? property.imageUrls.split(',') : property.imageUrls
      });
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ error: "Failed to fetch property" });
  }
});

export default router;
