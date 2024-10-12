const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  if (res.headersSent) {
    return next(err);
  }

  if (err.name === 'MulterError') {
    return res.status(400).json({ message: err.message });
  }


  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token.' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expired.' });
  }


  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ message: 'Server error.' });
};

module.exports = errorHandler;
