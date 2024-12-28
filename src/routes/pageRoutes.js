import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Определяем текущую директорию
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Обновленные маршруты для страниц
// router.get('/mnemo-kotel1', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../public/production/utvh/kotelnaya/', 'mnemo-kotel1.html'));
// });

// router.get('/mnemo-kotel2', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../public/production/utvh/kotelnaya/', 'mnemo-kotel2.html'));
// });

// router.get('/current-kotel1', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../public/production/carbon/pechiVr', 'current-pech-vr-1.html'));
// });


export default router;
