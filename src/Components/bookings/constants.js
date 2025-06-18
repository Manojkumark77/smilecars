export const ErrorMsgs = {
  name: {
    regex: /^[A-Za-z\s]{4,15}$/,
    message: "Name must be 4-15 letters only",
  },
  contact: {
    regex: /^\d{10}$/,
    message: "Contact must be exactly 10 digits",
  },
  email: {
    regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    message: "Invalid email address",
  },
  license: {
    regex: /^[A-Za-z0-9]{11}$/,
    message: "License must be exactly 11 letters and numbers",
  },
};
