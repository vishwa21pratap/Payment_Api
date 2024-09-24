const express = require('express');
const { 
    createAccount,
    updateAccount
 } = require('../Controller/account_controller');
const router = express.Router();

router.post('/create', createAccount);
router.put('/update/:accountId', updateAccount )

module.exports = router;
