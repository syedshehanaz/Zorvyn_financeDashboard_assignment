const express = require('express');
const router = express.Router();
const { createRecord, getRecords, getSummary , updateRecord , deleteRecord, categoryTotals,monthlyTrends, recentActivity } = require('../controllers/recordController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
router.post('/',authMiddleware,createRecord);
router.get('/', authMiddleware,getRecords);
router.get('/summary',authMiddleware,getSummary);

router.post('/',authMiddleware,roleMiddleware(['admin','analyst']),createRecord);
router.get('/',authMiddleware,roleMiddleware(['admin','analyst','viewer']),getRecords);
router.get('/summary',authMiddleware,roleMiddleware(['admin','analyst','viewer']),getSummary)
router.put('/:id',authMiddleware,roleMiddleware(['admin','analyst','viewer']),updateRecord)
router.delete('/:id',authMiddleware,roleMiddleware(['admin','analyst','viewer']),deleteRecord)

router.get('/category-totals',authMiddleware,categoryTotals);
router.get('/monthly-trends',authMiddleware,monthlyTrends);
router.get('/recent',authMiddleware,recentActivity);

module.exports = router;