export const isValidUrl = (url: string): { isValid: boolean; error?: string } => {
  if (!url || !url.trim()) {
    return { isValid: false, error: 'Поле не может быть пустым' };
  }

  const trimmedUrl = url.trim();

  if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
    return {
      isValid: false,
      error: 'Ссылка должна начинаться с http:// или https://. Пример: https://example.com/image.jpg'
    };
  }

  try {
    const urlObj = new URL(trimmedUrl);
    
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return {
        isValid: false,
        error: 'Поддерживаются только протоколы http:// и https://'
      };
    }

    if (!urlObj.hostname || urlObj.hostname.length === 0) {
      return {
        isValid: false,
        error: 'Введите корректный адрес сайта. Пример: https://example.com/image.jpg'
      };
    }

    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: 'Некорректный формат ссылки. Пример правильной ссылки: https://example.com/avatar.png'
    };
  }
};

export const validateUserName = (name: string): { isValid: boolean; error?: string; remainingChars?: number } => {
  if (!name || !name.trim()) {
    return { isValid: false, error: 'Пожалуйста, введите имя пользователя' };
  }

  const trimmedName = name.trim();

  if (trimmedName.length > 30) {
    const excess = trimmedName.length - 30;
    return {
      isValid: false,
      error: `Имя слишком длинное. Превышено на ${excess} ${excess === 1 ? 'символ' : excess < 5 ? 'символа' : 'символов'}. Максимум 30 символов`
    };
  }

  const dangerousPatterns = [
    { pattern: /<[^>]*>/g, message: 'Имя не может содержать HTML теги (например, <script>, <div>)' },
    { pattern: /javascript:/i, message: 'Имя не может содержать код JavaScript' },
    { pattern: /on\w+\s*=/i, message: 'Имя не может содержать обработчики событий' },
  ];

  for (const { pattern, message } of dangerousPatterns) {
    if (pattern.test(trimmedName)) {
      return { isValid: false, error: message };
    }
  }

  const remainingChars = 30 - trimmedName.length;
  return { isValid: true, remainingChars };
};

export const sanitizeUserName = (name: string): string => {
  return name
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
    .slice(0, 30);
};
