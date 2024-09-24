const Transaction = require('../Model/transaction_model');
const Account = require('../Model/account_model');
const { DAILY_WITHDRAWAL_LIMIT } = require('../Config/config');

const createTransaction = async (req, res) => {
  const { accountId, type, amount } = req.body;

  try {
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).send('Account not found');
    }

    if (account.activationStatus === 'INACTIVE') {
      return res.status(400).send('Account is inactive');
    }

    if (type === 'DEBIT' && !account.allowDebit) {
      return res.status(400).send('Debit transactions are not allowed');
    }

    if (type === 'CREDIT' && !account.allowCredit) {
      return res.status(400).send('Credit transactions are not allowed');
    }

    if (type === 'DEBIT' && amount > DAILY_WITHDRAWAL_LIMIT) {
      return res.status(400).send('Withdrawal amount exceeds daily limit');
    }
    if (type === 'DEBIT' && account.balance < amount) {
      return res.status(400).send('Withdrawl amount is less more than amount in account');
    }

    const newTransaction = new Transaction({ accountId, type, amount });
    if (type === 'CREDIT') {
      account.balance += Number(amount);
    } else {
      account.balance -= amount;
    }
    
    await newTransaction.save();
    await account.save();

    res.status(201).send(newTransaction);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getBalance = async (req, res) => {
  const { accountId } = req.params;

  try {
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).send('Account not found');
    }
    res.send({ balance: account.balance });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createTransaction,
  getBalance
}