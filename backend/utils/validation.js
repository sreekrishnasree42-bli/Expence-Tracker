// Validation Utilities
const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

const validateAmount = (amount) => {
  return !isNaN(amount) && amount > 0 && Number.isFinite(amount);
};

const validateTransactionType = (type) => {
  return ['income', 'expense'].includes(type);
};

const validateDate = (dateString) => {
  if (!dateString) return false;

  let normalizedDate = dateString;

  // Accept dd-mm-yyyy from some locales and convert to ISO format
  const ddmmyyyy = /^\d{2}-\d{2}-\d{4}$/;
  if (ddmmyyyy.test(dateString)) {
    const [day, month, year] = dateString.split('-');
    normalizedDate = `${year}-${month}-${day}`;
  }

  const date = new Date(normalizedDate);
  return date instanceof Date && !isNaN(date);
};

const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\+?(\d{1,3})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
  return phoneRegex.test(phone);
};

const validateCategory = (category) => {
  const validCategories = [
    'groceries',
    'utilities',
    'entertainment',
    'transportation',
    'healthcare',
    'food',
    'salary',
    'bonus',
    'investment',
    'rent',
    'insurance',
    'education',
    'personal',
    'shopping',
    'travel',
    'freelance',
    'other',
  ];
  return validCategories.includes(category.toLowerCase());
};

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

module.exports = {
  validateEmail,
  validateAmount,
  validateTransactionType,
  validateDate,
  validatePassword,
  validatePhoneNumber,
  validateCategory,
  sanitizeInput,
};
