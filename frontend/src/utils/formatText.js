export const formatErrorText = (text, cb = () => {}) => {
  const errors = categorizeErrors(text);
  cb((prev) => {
    const usernameErr = prev.username || errors.username || "";
    const emailErr = prev.email || errors.email || "";
    const passwordErr = prev.password || errors.password || "";
    return { username: usernameErr, email: emailErr, password: passwordErr };
  });
  return text.replaceAll(",", "\n");
};

function findWord(word, str) {
  return RegExp("\\b" + word + "\\b").test(str);
}

function categorizeErrors(errorMessage) {
  const errors = {
    password: null,
    username: null,
    email: null,
  };

  // Regular expression for password error
  const passwordRegex = /password: (.+?)(?=, (?:username|email):|$)/i;
  const passwordMatch = errorMessage.match(passwordRegex);
  if (passwordMatch) {
    errors.password = passwordMatch[1].trim();
  }

  // Regular expression for username error
  const usernameRegex = /username: (.+?)(?=, (?:password|email):|$)/i;
  const usernameMatch = errorMessage.match(usernameRegex);
  if (usernameMatch) {
    errors.username = usernameMatch[1].trim();
  }

  // Regular expression for email error
  const emailRegex = /email: (.+?)(?=, (?:password|username):|$)/i;
  const emailMatch = errorMessage.match(emailRegex);
  if (emailMatch) {
    errors.email = emailMatch[1].trim();
  }

  return errors;
}
