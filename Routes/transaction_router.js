const express = require('express');
const { createTransaction, getBalance } = require('../Controller/transaction_controller');
const router = express.Router();

router.post('/transaction', createTransaction);
router.get('/balance/:accountId', getBalance);

module.exports = router;
