type ValidationRule = {
    required?: boolean;
    pattern?: RegExp;
    min?: number;
    max?: number;
    number?: boolean;
    positiveNumber?: boolean;
  };
  
  type ValidationRules<T> = {
    [K in keyof T]: ValidationRule;
  };
  
  export const validateForm = <T extends { [key: string]: string | number }>(
    formData: T,
    validationRules: ValidationRules<T>
  ): { [key: string]: string } => {
    let errors: { [key: string]: string } = {};
  
    Object.keys(validationRules).forEach((field) => {
      const value = formData[field as keyof T];
      const rules = validationRules[field as keyof T];
  
      const valueStr = value.toString();
  
      if (rules.required && !valueStr.trim()) {
        errors[field] = `${field} is required.`;
      }
  
      if (rules.pattern && !rules.pattern.test(valueStr)) {
        errors[field] = `${field} is invalid.`;
      }
  
      if (rules.min && valueStr.length < rules.min) {
        errors[field] = `${field} must be at least ${rules.min} characters.`;
      }
  
      if (rules.max && valueStr.length > rules.max) {
        errors[field] = `${field} must be at most ${rules.max} characters.`;
      }
  
      if (rules.number && isNaN(Number(value))) {
        errors[field] = `${field} must be a number.`;
      }
  
      if (rules.positiveNumber && Number(value) <= 0) {
        errors[field] = `${field} must be a positive number.`;
      }
    });
  
    return errors;
  };