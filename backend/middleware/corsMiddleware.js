const allowedOrigins = ['https://tpo.getflytechnologies.com', 'http://localhost:5000', 'http://localhost:3001', 'http://localhost:5173', 'http://localhost:5011', 'http://localhost:3000'];
    
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = corsOptions;