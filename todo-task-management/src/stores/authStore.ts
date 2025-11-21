import { defineStore } from "pinia";
import { ref } from "vue";
import * as authApi from "@/api/authApi";

export const useAuthStore = defineStore("auth", () => {
  const accessToken = ref<string | null>(localStorage.getItem("accessToken"));
  const refreshToken = ref<string | null>(localStorage.getItem("refreshToken"));
  const expiresAt = ref<number | null>(localStorage.getItem("expiresAt") ? Number(localStorage.getItem("expiresAt")) : null);
  const userName = ref<string | null>(localStorage.getItem("userName"));

  function setTokens(token: string, refresh: string, expires: string|number) {
    accessToken.value = token;
    refreshToken.value = refresh;
    expiresAt.value = typeof expires === "string" ? Date.parse(expires) : expires;
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("expiresAt", String(expiresAt.value || ""));
  }

  function clearTokens() {
    accessToken.value = null;
    refreshToken.value = null;
    expiresAt.value = null;
    userName.value = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("userName");
  }

  async function login(payload: { userNameOrEmail: string; password: string }) {
    const res = await authApi.login(payload);
    setTokens(res.data.token, res.data.refreshToken, res.data.expiresAt);
    userName.value = payload.userNameOrEmail;
    localStorage.setItem("userName", userName.value ?? "");
  }

  function logout() {
    // try revoke refresh token, best-effort
    if (refreshToken.value) {
      authApi.revoke(refreshToken.value).catch(()=>{});
    }
    clearTokens();
    location.href = "/login";
  }

  async function register(payload: { userName: string; email: string; password: string }) {
    return authApi.register(payload);
  }

  async function refreshTokens() {
    if (!accessToken.value || !refreshToken.value) throw new Error("Missing tokens");
    const res = await authApi.refresh(accessToken.value, refreshToken.value);
    setTokens(res.data.token, res.data.refreshToken, res.data.expiresAt);
  }

  return {
    accessToken, refreshToken, expiresAt, userName,
    login, logout, register, setTokens, clearTokens, refreshTokens
  };
});
