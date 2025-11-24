"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Mock login logic
    if (email && password) {
        res.json({ token: 'mock-jwt-token', user: { id: 1, name: 'Test User', email } });
    }
    else {
        res.status(400).json({ error: 'Invalid credentials' });
    }
});
router.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    if (email && password && name) {
        res.json({ token: 'mock-jwt-token', user: { id: 1, name, email } });
    }
    else {
        res.status(400).json({ error: 'Missing fields' });
    }
});
exports.default = router;
