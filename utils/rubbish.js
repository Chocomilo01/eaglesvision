// app.post('/api/deposit', (req, res) => {
//     const { accountId, amount } = req.body;
  
//     if (!accountId || !amount || amount <= 0) {
//       return res.status(400).json({ error: 'Invalid request data' });
//     }
  
//     const account = accounts.find((acc) => acc.id === accountId);
  
//     if (!account) {
//       return res.status(404).json({ error: 'Account not found' });
//     }
  
//     // Update the account balance
//     account.balance += amount;
  
//     res.status(200).json({ message: 'Funds deposited successfully', newBalance: account.balance });
//   });



// //   {
// //   "accountId": 1,
// //   "amount": 200
// // }

// app.post('/api/withdraw', (req, res) => {
//     const { accountId, amount } = req.body;
  
//     if (!accountId || !amount || amount <= 0) {
//       return res.status(400).json({ error: 'Invalid request data' });
//     }
  
//     const account = accounts.find((acc) => acc.id === accountId);
  
//     if (!account) {
//       return res.status(404).json({ error: 'Account not found' });
//     }
  
//     if (account.balance < amount) {
//       return res.status(400).json({ error: 'Insufficient funds' });
//     }
  
//     // Update the account balance
//     account.balance -= amount;
  
//     res.status(200).json({ message: 'Funds withdrawn successfully', newBalance: account.balance });
//   });

//   // Endpoint for loan transfer
// app.post('/api/transfer-loan', (req, res) => {
//     const { fromAccountId, toAccountId, amount } = req.body;
  
//     if (!fromAccountId || !toAccountId || !amount || amount <= 0) {
//       return res.status(400).json({ error: 'Invalid request data' });
//     }
  
//     const fromAccount = accounts.find((acc) => acc.id === fromAccountId);
//     const toAccount = accounts.find((acc) => acc.id === toAccountId);
  
//     if (!fromAccount || !toAccount) {
//       return res.status(404).json({ error: 'Account not found' });
//     }
  
//     if (fromAccount.loanBalance < amount) {
//       return res.status(400).json({ error: 'Insufficient loan balance' });
//     }
  
//     // Perform the loan transfer
//     fromAccount.loanBalance -= amount;
//     toAccount.loanBalance += amount;
  
//     res.status(200).json({ message: 'Loan transfer successful', fromBalance: fromAccount.loanBalance, toBalance: toAccount.loanBalance });
//   });

//   // Endpoint to update loan balance
// app.put('/api/update-loan-balance/:accountId', (req, res) => {
//     const { accountId } = req.params;
//     const { newBalance } = req.body;
  
//     if (!accountId || isNaN(accountId) || newBalance === undefined || isNaN(newBalance) || newBalance < 0) {
//       return res.status(400).json({ error: 'Invalid request data' });
//     }
  
//     const account = accounts.find((acc) => acc.id === parseInt(accountId));
  
//     if (!account) {
//       return res.status(404).json({ error: 'Account not found' });
//     }
  
//     // Update the loan balance
//     account.loanBalance = newBalance;
  
//     res.status(200).json({ message: 'Loan balance updated successfully', newBalance: account.loanBalance });
//   });


//   // Function to generate a unique account ID
// function generateAccountId() {
//     return Math.floor(Math.random() * 10000);
//   }
  
//   // Endpoint to create a new loan account
//   app.post('/api/create-loan-account', (req, res) => {
//     const { userId, initialBalance } = req.body;
  
//     if (!userId || !initialBalance || initialBalance < 0) {
//       return res.status(400).json({ error: 'Invalid request data' });
//     }
  
//     // Generate a unique account ID
//     const accountId = generateAccountId();
  
//     // Create a new loan account
//     const loanAccount = {
//       id: accountId,
//       userId,
//       balance: initialBalance,
//     };
  
//     // Push the account into the array (simulated storage)
//     loanAccounts.push(loanAccount);
  
//     res.status(201).json({ message: 'Loan account created successfully', account: loanAccount });
//   });

//   // Function to generate a unique account ID
// function generateAccountId() {
//     return Math.floor(Math.random() * 10000);
//   }
  
  
  
  