export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateRegistrationData(name: string, phone: string): ValidationResult {
  const errors: string[] = [];

  // Validate name
  if (!name || name.trim().length === 0) {
    errors.push('El nombre es requerido');
  } else if (name.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  } else if (name.trim().length > 50) {
    errors.push('El nombre no puede exceder 50 caracteres');
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name.trim())) {
    errors.push('El nombre solo puede contener letras y espacios');
  }

  // Validate phone
  if (!phone || phone.trim().length === 0) {
    errors.push('El número de teléfono es requerido');
  } else {
    const cleanPhone = phone.replace(/\D/g, ''); // Remove non-digits
    if (cleanPhone.length < 10) {
      errors.push('El número de teléfono debe tener al menos 10 dígitos');
    } else if (cleanPhone.length > 15) {
      errors.push('El número de teléfono no puede exceder 15 dígitos');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function formatPhoneNumber(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Format Colombian phone numbers
  if (cleanPhone.length === 10 && cleanPhone.startsWith('3')) {
    return `+57${cleanPhone}`;
  }
  
  // Add + if not present and starts with country code
  if (cleanPhone.length > 10 && !phone.startsWith('+')) {
    return `+${cleanPhone}`;
  }
  
  return cleanPhone;
}