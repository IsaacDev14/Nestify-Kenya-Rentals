"use strict";
`` `typescript
import { Router } from 'express';
import { properties, categories } from '../data/mockData';

const router = Router();

router.get('/', (req, res) => {
  try {
    // Simulate DB delay
    setTimeout(() => {
        res.json(properties);
    }, 100);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    const property = properties.find(p => p.id === Number(id));
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    // Add category info to property
    const category = categories.find(c => c.id === property.categoryId);
    res.json({ ...property, category });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

export default router;
` ``;
