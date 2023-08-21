

// // Function to generate a unique account ID
// function generateAccountId() {
//     return Math.floor(Math.random() * 10000);
//   }
// // Endpoint to create a new savings account
// app.post('/', (req, res) => {
//     const { customerId } = req.body;
  
//     if (!customerId) {
//       return res.status(400).json({ error: 'Invalid request data' });
//     }
  
//     // Generate a unique account ID
//     const accountId = generateAccountId();
  
//     // Create a new savings account
//     const savingsAccount = {
//       id: accountId,
//       customerId,
//       balance: 0, // Initialize with a zero balance
//     };
  
//     // Push the account into the array (simulated storage)
//     savingsAccounts.push(savingsAccount);
  
//     res.status(201).json({ message: 'Savings account created successfully', account: savingsAccount });
//   });


  
    
//   async createSavingsAccount(req, res) {
//     const { customerId } = req.body;

//     if (!customerId) {
//       return res.status(400).json({ error: 'Invalid request data' });
//     }

//     // Generate a unique account ID
//     const accountId = await generateAccountId();

//     // Create a new savings account
//     const savingsAccount = {
//       id: accountId,
//       customrId,
//       balance: 0, // Initialize with a zero balance
//     };

//     // Push the account into the array (simulated storage)
//     savingsAccounts.push(savingsAccount);

//     res.status(201).json({ message: 'Savings account created successfully', account: savingsAccount });
//   }