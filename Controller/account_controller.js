const Account = require('../Model/account_model');
const User = require('../Model/user_model');

const createAccount = async (req, res) => {
  const { userId, accountNumber, sortCode } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newAccount = new Account({ userId, accountNumber, sortCode });
    await newAccount.save();
    return res.status(201).json(newAccount);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 'Validation Error': error.message });
    } else if (error.code === 11000) { // This is the error code for duplicate key
      return res.status(400).json({ 'Duplicate Error': 'Account number already exists' });
    } else {
      return res.status(500).json({ 'Error': error.message });
    }
  }
};



const updateAccount = async (req, res) => {
  const { accountId } = req.params;
  const {balance, activationStatus, allowCredit, allowDebit } = req.body;

  try {
    const account = await Account.findByIdAndUpdate(
      accountId,
      {balance, activationStatus, allowCredit, allowDebit },
      { new: true }
    );
    if (!account) {
      return res.status(404).send('Account not found');
    }
    res.send(account);
  } catch (error) {
    res.status(500).send(error.message);
  }
}



module.exports = {
  createAccount,
  updateAccount

}

