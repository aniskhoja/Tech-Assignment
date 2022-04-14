export const validate = (values) => {
    const errors = [];
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    
    if (!values.Email) {
      errors.push("Email is required!");
    } else if (!regex.test(values.Email)) {
      errors.push("This is not a valid email format!");
    } else if (values.Email.length < 5) {
      errors.push("Email should be min 5 character long")
    }

    if (!values.Age) {
      errors.push("Age is required!");
    } else if (isNaN(values.Age)) {
      errors.push("Age must be in number");
    } else if (values.Age > 150) {
      errors.push("Please enter valid age")
    }

    if (values.Gender === "") {
      errors.push("Please select your gender")
    }
    
    return errors;
};
  
