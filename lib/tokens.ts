const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function generateId(size = 10): string {
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');
}

export function generateSecureToken(size = 32): string {
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');
}

export function isTokenExpired(expiresAt: number | null | undefined): boolean {
  if (!expiresAt) return false;
  return Date.now() / 1000 > expiresAt;
}
