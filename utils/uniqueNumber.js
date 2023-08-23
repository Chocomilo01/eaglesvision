function generateUniqueAccountNumber(prefix = "EAGLE-") {
    // Generate a random number (you can customize the range)
    const randomNumber = Math.floor(Math.random() * 10000000000);
  
    // Concatenate the prefix and random number to create the account number
    const accountNumber = `${prefix}${randomNumber}`;
  
    return accountNumber;
  }
  
  module.exports = {
    generateUniqueAccountNumber,
  };