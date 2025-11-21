<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card elevation="10" class="pa-8" width="600" height="500">

      <h2 class="text-h5 font-weight-bold mb-6 text-center">Create Account</h2>

      <v-form ref="registerForm" class="space-y-4">

        <!-- Username -->
        <AppInput
          v-model="form.userName"
          placeholder="Username"
          required
        />

        <!-- Email -->
        <AppInput
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
          :rules="emailRules"
        />

        <!-- Password -->
        <AppInput
        v-model="form.password"
        type="password"
        placeholder="Password"
        required
        :rules="passwordRules"
        class="mb-4"
      />

        <!-- Buttons -->
        <div class="d-flex justify-space-between align-center mt-4">
          <AppButton
            variant="primary"
            :disabled="loading"
            @click="doRegister"
          >
            {{ loading ? 'Registering…' : 'Register' }}
          </AppButton>

          <router-link class="text-blue-darken-2 text-body-2" to="/login">
            Login
          </router-link>
        </div>

        <div v-if="message" class="text-green mt-4 text-center">{{ message }}</div>
        <div v-if="error" class="text-red mt-4 text-center">{{ error }}</div>

      </v-form>

    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuthStore } from "../stores/authStore";

const auth = useAuthStore();

const loading = ref(false);
const message = ref<string | null>(null);
const error = ref<string | null>(null);

const registerForm = ref();

const form = reactive({
  userName: "",
  email: "",
  password: ""
});

// ✔ Email validation
const emailRules = [
  (v: string) => !!v || "Email is required",
  (v: string) => /.+@.+\..+/.test(v) || "Enter a valid email",
];

// ✔ Password validation (8+ chars)
const passwordRules = [
  (v: string) => !!v || "Password is required",

  // Minimum length
  (v: string) =>
    (v && v.length >= 8) ||
    "Passwords must be at least 8 characters long.",

  // Must contain a digit
  (v: string) =>
    /\d/.test(v) ||
    "Passwords must have at least one digit ('0'-'9').",

  // Must contain an uppercase letter
  (v: string) =>
    /[A-Z]/.test(v) ||
    "Passwords must have at least one uppercase ('A'-'Z').",

      // Must contain a non-alphanumeric character
  (v: string) =>
    /[^A-Za-z0-9]/.test(v) ||
    "Passwords must have at least one non-alphanumeric character.",
];

async function doRegister() {
  message.value = null;
  error.value = null;

  const result = await registerForm.value.validate();
  if (!result.valid) return;

  loading.value = true;

  try {
    await auth.register({
      userName: form.userName,
      email: form.email,
      password: form.password,
    });

    message.value = "Registration accepted. Check your email to confirm.";

  } catch (err: any) {
    error.value = err?.response?.data || err?.message || "Registration failed";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.text-red { color: #e53935; }
.text-green { color: #43a047; }
</style>
