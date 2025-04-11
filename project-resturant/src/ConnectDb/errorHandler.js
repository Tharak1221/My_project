

const errorHandler = {
   
    success: (res, message = "Success", data = null, statusCode = 200) => {
      res.status(statusCode).json({ success: true, message, data });
    },
  
    
    badRequest: (res, message = "Bad Request") => {
      res.status(400).json({ success: false, error: message });
    },
  
    unauthorized: (res, message = "Unauthorized access") => {
      res.status(401).json({ success: false, error: message });
    },
  
    forbidden: (res, message = "Forbidden") => {
      res.status(403).json({ success: false, error: message });
    },
  
    notFound: (res, message = "Not Found") => {
      res.status(404).json({ success: false, error: message });
    },
  
    serverError: (res, message = "Internal Server Error") => {
      res.status(500).json({ success: false, error: message });
    },
  };
  
  module.exports = errorHandler;
  