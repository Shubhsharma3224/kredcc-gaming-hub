import { GameKey } from "./games";

export type Account = {
  id: string;
  name?: string;
  lastSeen: number;
};

export type SessionState = Partial<Record<GameKey, Account>>;

const KEY = "kredcc_session_v1";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export const loadSession = (): SessionState => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as SessionState;
    const now = Date.now();
    const cleaned: SessionState = {};
    // 7-day inactivity auto-delete
    (Object.keys(parsed) as GameKey[]).forEach((g) => {
      const acc = parsed[g];
      if (acc && now - acc.lastSeen < SEVEN_DAYS) cleaned[g] = acc;
    });
    if (Object.keys(cleaned).length !== Object.keys(parsed).length) saveSession(cleaned);
    return cleaned;
  } catch {
    return {};
  }
};

export const saveSession = (s: SessionState) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
};

export const touchSession = (s: SessionState): SessionState => {
  const now = Date.now();
  const next: SessionState = {};
  (Object.keys(s) as GameKey[]).forEach((g) => {
    const acc = s[g];
    if (acc) next[g] = { ...acc, lastSeen: now };
  });
  saveSession(next);
  return next;
};

export const clearSession = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
};
