import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Mock login logic
    if (email && password) {
        res.json({ token: 'mock-jwt-token', user: { id: 1, name: 'Test User', email } });
    } else {
        res.status(400).json({ error: 'Invalid credentials' });
    }
});

router.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    if (email && password && name) {
        res.json({ token: 'mock-jwt-token', user: { id: 1, name, email } });
    } else {
        res.status(400).json({ error: 'Missing fields' });
    }
});

export default router;
