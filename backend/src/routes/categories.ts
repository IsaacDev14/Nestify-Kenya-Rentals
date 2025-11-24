import { Router } from "express";
import { supabase } from "../lib/supabase";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const { data: categories, error } = await supabase
            .from('Category')
            .select('*');

        if (error) throw error;

        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});

export default router;
