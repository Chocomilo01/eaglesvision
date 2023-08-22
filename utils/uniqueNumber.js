function generateUniqueAccountNumber(prefix = "SAV-") {
    // Generate a random number (you can customize the range)
    const randomNumber = Math.floor(Math.random() * 1000000);
  
    // Concatenate the prefix and random number to create the account number
    const accountNumber = `${prefix}${randomNumber}`;
  
    return accountNumber;
  }
  
  module.exports = {
    generateUniqueAccountNumber,
  };