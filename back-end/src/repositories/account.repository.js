const Account = require('../models/account.model');

const findAccountsByNumber = async (accountNumber) => {
  try {
    const accounts = await Account.find({ accountNumber: accountNumber });
    return accounts;
  } catch (error) {
    console.error('Error finding accounts:', error);
    throw new Error('Error finding accounts');
  }
};

const findAccountByNumber = async (accountNumber) => {
  try {
    const account = await Account.findOne({ accountNumber: accountNumber });
    return account;
  } catch (error) {
    console.error('Error finding account:', error);
    throw new Error('Error finding account');
  }
};

module.exports = {
  findAccountsByNumber,
  findAccountByNumber
};
