import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Определяем текущую директорию
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Обновленные маршруты для страниц
router.get('/mnemo-kotel-1', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/production/carbon/pechiVr', 'mnemo-pech-vr-1.html'));
});

router.get('/current-kotel-1', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/production/carbon/pechiVr', 'current-pech-vr-1.html'));
});


export default router;
