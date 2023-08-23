const myMiddleware = (req, res, next) => {
    // Log the request details
    console.log(`Received ${req.method} request at ${req.url}`);
  
    // Continue processing by calling next()
    next();
  };
  
  module.exports = myMiddleware;