export const classNames = (...values) =>
  values
    .flat(Infinity)
    .filter(Boolean)
    .join(' ');

export const formatDate = (value) => {
  if (!value) return '';
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
};

export const truncate = (text, length = 140) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return `${text.slice(0, length).trim()}…`;
};

export const getAccessLabel = (accessLevel) => {
  if (accessLevel === 'edit') return 'Can edit';
  if (accessLevel === 'view') return 'Can view';
  return 'No access';
};
