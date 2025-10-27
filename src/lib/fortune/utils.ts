import { rawFortunes } from "./fortunes";

// Simple encryption to make it harder to view all fortunes at once
// Uses base64 encoding with Unicode support via encodeURIComponent
export const encryptFortune = (text: string): string => {
  if (typeof window === "undefined") return text;
  try {
    // Encode Unicode characters to UTF-8 byte string, then base64
    return btoa(encodeURIComponent(text));
  } catch {
    return text;
  }
};

export const decryptFortune = (encryptedFortune: string): string => {
  if (typeof window === "undefined") return encryptedFortune;
  try {
    // Decode base64, then decode UTF-8 byte string to Unicode
    return decodeURIComponent(atob(encryptedFortune));
  } catch {
    return encryptedFortune;
  }
};

// Get user's seen fortunes from localStorage with error handling
export const getSeenFortunes = (): string[] => {
  if (typeof window === "undefined") return [];

  try {
    const seenFortunes = localStorage.getItem("seenFortunes");
    return seenFortunes ? (JSON.parse(seenFortunes) as string[]) : [];
  } catch (error) {
    console.error("Error reading seen fortunes:", error);
    return [];
  }
};

// Save seen fortunes to localStorage with error handling
export const saveSeenFortunes = (seenFortunes: string[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("seenFortunes", JSON.stringify(seenFortunes));
  } catch (error) {
    console.error("Error saving seen fortunes:", error);
  }
};

// Share fortune with error handling
export const shareFortune = async (fortune: string): Promise<void> => {
  // Guard against SSR - only access window if it exists
  const websiteUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const shareText = `🥠 My Fortune Cookie says:\n"${fortune}"\n\nGet your daily fortune at ${websiteUrl}/fortune!`;

  // Ensure navigator exists before attempting to share
  if (typeof navigator === "undefined") return;

  try {
    if (navigator.share) {
      await navigator.share({ text: shareText });
      return;
    }
    await navigator.clipboard.writeText(shareText);
    alert("Fortune copied to clipboard!");
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      try {
        await navigator.clipboard.writeText(shareText);
        alert("Fortune copied to clipboard!");
      } catch {
        console.error("Error sharing:", error);
        alert("Could not share or copy fortune. Please try again.");
      }
    }
  }
};

// Get encrypted fortunes array
export const getEncryptedFortunes = (): string[] => {
  return rawFortunes.map((fortune) => encryptFortune(fortune));
};

// Get a random unseen fortune
export const getFortuneForUser = (): string => {
  const fortunes = getEncryptedFortunes();
  const seenFortunes = getSeenFortunes();

  // Handle edge case of empty fortunes array
  if (fortunes.length === 0) {
    console.error("No fortunes available");
    return encryptFortune("Your fortune awaits...");
  }

  // If user has seen all fortunes, reset the list
  if (seenFortunes.length >= fortunes.length) {
    saveSeenFortunes([]);
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const selectedFortune = fortunes[randomIndex];
    // Safe to assert non-null because we checked fortunes.length > 0
    if (!selectedFortune) {
      return encryptFortune("Your fortune awaits...");
    }
    return selectedFortune;
  }

  // Get unseen fortunes
  const unseenFortunes = fortunes.filter(
    (fortune) => !seenFortunes.includes(fortune),
  );

  // Guard against empty unseenFortunes (corrupted localStorage case)
  if (unseenFortunes.length === 0) {
    // Reset seen list and pick from full fortunes array
    saveSeenFortunes([]);
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const selectedFortune = fortunes[randomIndex];
    if (!selectedFortune) {
      return encryptFortune("Your fortune awaits...");
    }
    saveSeenFortunes([selectedFortune]);
    return selectedFortune;
  }

  // Pick a random unseen fortune
  const randomIndex = Math.floor(Math.random() * unseenFortunes.length);
  const selectedFortune = unseenFortunes[randomIndex];

  // Safe guard - should never happen but handles corrupted state
  if (!selectedFortune) {
    saveSeenFortunes([]);
    const fallbackIndex = Math.floor(Math.random() * fortunes.length);
    const fallbackFortune = fortunes[fallbackIndex];
    return fallbackFortune ?? encryptFortune("Your fortune awaits...");
  }

  // Add to seen fortunes
  saveSeenFortunes([...seenFortunes, selectedFortune]);

  return selectedFortune;
};

// Cookie storage helpers (fallback for localStorage)
export const setCookie = (name: string, value: string, days = 1): void => {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  // Add Secure flag when running over HTTPS
  const isSecure =
    typeof location !== "undefined" && location.protocol === "https:";
  const secureFlag = isSecure ? ";Secure" : "";

  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict${secureFlag}`;
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (const cookie of ca) {
    let c = cookie;
    while (c.startsWith(" ")) c = c.substring(1, c.length);
    if (c.startsWith(nameEQ)) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const removeCookie = (name: string): void => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};
