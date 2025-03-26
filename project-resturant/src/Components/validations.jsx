export const regexPatterns = {
  username: /^[a-zA-Z0-9_]{5,20}$/,  // 5-20 characters, letters, numbers, and underscores
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Standard email regex
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // At least 8 characters, one letter, one number
  phone: /^[0-9]{10}$/ // Exactly 10-digit phone number
};

export const validations = {
  username: (username) => {
    if (!username) return { isValid: false, message: "Username is required" };
    if (!regexPatterns.username.test(username)) 
      return { isValid: false, message: "Username must be 5-20 characters long" };
    return { isValid: true, message: "" };
  },

  email: (email) => {
    if (!email) return { isValid: false, message: "Email is required" };
    if (!regexPatterns.email.test(email))
      return { isValid: false, message: "Enter a valid email address" };
    return { isValid: true, message: "" };
  },

  password: (password) => {
    if (!password) return { isValid: false, message: "Password is required" };
    if (!regexPatterns.password.test(password))
      return {
        isValid: false,
        message: "Password must contain at least 8 characters, including one letter and one number"
      };
    return { isValid: true, message: "" };
  },

  confirmPassword: (password, confirmPassword) => {
    if (!confirmPassword) return { isValid: false, message: "Confirm password is required" };
    if (password !== confirmPassword)
      return { isValid: false, message: "Passwords do not match" };
    return { isValid: true, message: "" };
  },

  phone: (phone) => {
    if (!phone) return { isValid: false, message: "Phone number is required" };
    if (!regexPatterns.phone.test(phone))
      return { isValid: false, message: "Enter a valid 10-digit phone number" };
    return { isValid: true, message: "" };
  }
};
