<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow text-center">
    <h1 class="text-2xl font-bold mb-4">Confirm Email</h1>
    <div v-if="loading">Confirming…</div>
    <div v-if="success" class="text-green-600">Email confirmed successfully. You may now <router-link to="/login">login</router-link>.</div>
    <div v-if="error" class="text-red-600">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { confirmEmail } from "../api/authApi";

const route = useRoute();
const loading = ref(true);
const error = ref<string|null>(null);
const success = ref(false);

onMounted(async () => {
  const userId = route.query.userId as string;
  const token = route.query.token as string;
  if (!userId || !token) {
    error.value = "Invalid confirmation link.";
    loading.value = false;
    return;
  }
  try {
    await confirmEmail(userId, token);
    success.value = true;
  } catch (e: any) {
    error.value = e?.response?.data || e?.message || "Confirmation failed.";
  } finally { loading.value = false; }
});
</script>
