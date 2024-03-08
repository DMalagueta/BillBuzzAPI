import { Router } from 'express';

const router = Router();

router.get('/test', (req, res) => {
    res.json({ message: 'Test API Endpoint' });
});

export default router;
