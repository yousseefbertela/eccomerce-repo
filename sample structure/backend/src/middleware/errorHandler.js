export function notFound(_req, res, _next) {
  res.status(404).json({ message: 'Route not found' });
}

export function errorHandler(err, _req, res, _next) { // eslint-disable-line
  let location;
  if (err?.stack) {
    const firstAppLine = err.stack.split('\n').find(l => l.includes('.js'));
    location = firstAppLine?.trim();
  }
  console.error('ERROR:', { message: err.message, location, stack: process.env.NODE_ENV === 'development' ? err.stack : undefined });
  res.status(err.status || 500).json({ error: true, message: err.message || 'Internal Server Error', location });
}

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
