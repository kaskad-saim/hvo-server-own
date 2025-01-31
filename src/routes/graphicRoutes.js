import express from 'express';

import logger from '../logger.js';
import { Kotel1Model, Kotel2Model, Kotel3Model } from '../models/kotelModel.js';
import { Hvo1Model, Hvo2Model } from '../models/hvoModel.js';

const router = express.Router();

// Маршрут для получения данных Kotel1
router.get('/kotel1/data', async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = start && end ? { lastUpdated: { $gte: new Date(start), $lte: new Date(end) } } : {};
    const data = await Kotel1Model.find(query).sort({ lastUpdated: 1 });
    res.json(data);
  } catch (error) {
    logger.error('Ошибка при получении данных Kotel1:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Маршрут для получения данных Kotel2
router.get('/kotel2/data', async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = start && end ? { lastUpdated: { $gte: new Date(start), $lte: new Date(end) } } : {};
    const data = await Kotel2Model.find(query).sort({ lastUpdated: 1 });
    res.json(data);
  } catch (error) {
    logger.error('Ошибка при получении данных Kotel2:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Маршрут для получения данных Kotel3
router.get('/kotel3/data', async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = start && end ? { lastUpdated: { $gte: new Date(start), $lte: new Date(end) } } : {};
    const data = await Kotel3Model.find(query).sort({ lastUpdated: 1 });
    res.json(data);
  } catch (error) {
    logger.error('Ошибка при получении данных Kotel3:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.get('/hvo1/data', async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = start && end ? { lastUpdated: { $gte: new Date(start), $lte: new Date(end) } } : {};
    const data = await Hvo1Model.find(query).sort({ lastUpdated: 1 });
    res.json(data);
  } catch (error) {
    logger.error('Ошибка при получении данных hvo1:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.get('/hvo2/data', async (req, res) => {
  try {
    const { start, end } = req.query;
    const query = start && end ? { lastUpdated: { $gte: new Date(start), $lte: new Date(end) } } : {};
    const data = await Hvo2Model.find(query).sort({ lastUpdated: 1 });
    res.json(data);
  } catch (error) {
    logger.error('Ошибка при получении данных hvo2:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


export default router;
