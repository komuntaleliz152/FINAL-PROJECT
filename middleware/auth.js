// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// Role-based access control
const isDirector = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'director') {
    return next();
  }
  res.status(403).send('Access denied. Directors only.');
};

const isManager = (req, res, next) => {
  if (req.isAuthenticated() && (req.user.role === 'manager' || req.user.role === 'director')) {
    return next();
  }
  res.status(403).send('Access denied. Managers only.');
};

const isSalesAgent = (req, res, next) => {
  if (req.isAuthenticated() && (req.user.role === 'salesagent' || req.user.role === 'manager' || req.user.role === 'director')) {
    return next();
  }
  res.status(403).send('Access denied. Sales agents only.');
};

module.exports = {
  isAuthenticated,
  isDirector,
  isManager,
  isSalesAgent
};
