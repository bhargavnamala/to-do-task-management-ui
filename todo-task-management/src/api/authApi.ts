import api from "./api";

export interface RegisterDto {
  userName: string;
  email: string;
  password: string;
}

export interface LoginDto {
  userNameOrEmail: string;
  password: string;
}

export async function register(payload: RegisterDto) {
  return api.post("/auth/register", payload);
}

export async function login(payload: LoginDto) {
  return api.post("/auth/login", payload);
}

export async function confirmEmail(userId: string, token: string) {
  // calling backend confirm-email GET endpoint
  return api.get(`/auth/confirm-email?userId=${encodeURIComponent(userId)}&token=${encodeURIComponent(token)}`);
}

export async function refresh(accessToken: string, refreshToken: string) {
  return api.post("/auth/refresh", { accessToken, refreshToken });
}

export async function revoke(refreshToken: string) {
  return api.post("/auth/revoke", refreshToken);
}
