"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_1 = require("../lib/supabase");
const router = (0, express_1.Router)();
// Get all properties
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data: properties, error } = yield supabase_1.supabase
            .from('Property')
            .select('*');
        if (error)
            throw error;
        const parsedProperties = properties.map((p) => (Object.assign(Object.assign({}, p), { imageUrls: typeof p.imageUrls === 'string' ? JSON.parse(p.imageUrls) : p.imageUrls })));
        res.json(parsedProperties);
    }
    catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ error: "Failed to fetch properties" });
    }
}));
// Get single property by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { data: property, error } = yield supabase_1.supabase
            .from('Property')
            .select('*, category:Category(*)')
            .eq('id', id)
            .single();
        if (error)
            throw error;
        if (property) {
            res.json(Object.assign(Object.assign({}, property), { imageUrls: typeof property.imageUrls === 'string' ? JSON.parse(property.imageUrls) : property.imageUrls }));
        }
        else {
            res.status(404).json({ message: "Property not found" });
        }
    }
    catch (error) {
        console.error("Error fetching property:", error);
        res.status(500).json({ error: "Failed to fetch property" });
    }
}));
exports.default = router;
