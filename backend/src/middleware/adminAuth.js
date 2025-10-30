// Admin authorization middleware - requires admin or super_admin role
export const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'super_admin')) {
    next();
  } else {
    res.status(403);
    throw new Error('Access denied. Admin privileges required.');
  }
};

// Super admin authorization - requires super_admin role
export const superAdminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'super_admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Access denied. Super admin privileges required.');
  }
};
