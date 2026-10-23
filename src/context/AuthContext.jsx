import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const SESSION_KEY = "am_admin_session_v2";
const ATTEMPTS_KEY = "am_admin_login_attempts_v2";
const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

// Default credentials for initial setup (in production, connected to server-side authentication)
const DEFAULT_ADMIN = {
  email: "admin@abhijitmondal.dev",
  password: "AdminMondal@2026!",
  name: "Abhijit Mondal",
  role: "Superadmin"
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const session = JSON.parse(stored);
        if (new Date().getTime() < session.expiresAt) {
          return session.user;
        }
      }
      return null;
    } catch {
      return null;
    }
  });

  const [lockoutUntil, setLockoutUntil] = useState(() => {
    try {
      const stored = localStorage.getItem(ATTEMPTS_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.lockoutUntil && new Date().getTime() < data.lockoutUntil) {
          return data.lockoutUntil;
        }
      }
      return null;
    } catch {
      return null;
    }
  });

  const login = async (email, password) => {
    const now = new Date().getTime();

    // Check for active lockout
    if (lockoutUntil && now < lockoutUntil) {
      const remainingMinutes = Math.ceil((lockoutUntil - now) / (60 * 1000));
      return {
        success: false,
        error: `Too many failed attempts. Account locked. Please wait ${remainingMinutes} minute(s).`
      };
    }

    // Retrieve attempt tracking
    let attemptData = { count: 0, lockoutUntil: null };
    try {
      const stored = localStorage.getItem(ATTEMPTS_KEY);
      if (stored) attemptData = JSON.parse(stored);
    } catch {
      // Ignore
    }

    // Verify credentials
    if (email.trim().toLowerCase() === DEFAULT_ADMIN.email.toLowerCase() && password === DEFAULT_ADMIN.password) {
      // Successful login: reset attempts
      localStorage.removeItem(ATTEMPTS_KEY);
      setLockoutUntil(null);

      const authenticatedUser = {
        email: DEFAULT_ADMIN.email,
        name: DEFAULT_ADMIN.name,
        role: DEFAULT_ADMIN.role,
        lastLogin: new Date().toISOString()
      };

      const session = {
        user: authenticatedUser,
        expiresAt: now + 8 * 60 * 60 * 1000 // 8 hours session
      };

      try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      } catch (e) {
        console.error("Session storage error:", e);
      }

      setUser(authenticatedUser);
      return { success: true };
    } else {
      // Failed attempt tracking
      attemptData.count = (attemptData.count || 0) + 1;
      if (attemptData.count >= MAX_ATTEMPTS) {
        attemptData.lockoutUntil = now + LOCKOUT_MINUTES * 60 * 1000;
        setLockoutUntil(attemptData.lockoutUntil);
        localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attemptData));
        return {
          success: false,
          error: `Invalid credentials. Maximum attempts exceeded. Locked for ${LOCKOUT_MINUTES} minutes.`
        };
      } else {
        localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attemptData));
        const remaining = MAX_ATTEMPTS - attemptData.count;
        return {
          success: false,
          error: `Invalid email or password. ${remaining} attempt(s) remaining.`
        };
      }
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch (e) {
      console.error(e);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, lockoutUntil }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
