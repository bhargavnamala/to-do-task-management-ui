<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card elevation="10" class="pa-8" width="600" height="400">

      <h2 class="text-h5 font-weight-bold mb-6 text-center">Welcome Back</h2>

      <v-form ref="loginForm" v-model="isValid" class="space-y-4">

        <AppInput
          v-model="form.user"
          placeholder="Username or Email"
          required
          class="mb-4"
        />

        <AppInput
          v-model="form.password"
          type="password"
          placeholder="Password"
          required
          class="mb-4"
        />

        <div class="d-flex justify-space-between align-center mt-4">
          <AppButton variant="primary" :disabled="loading" @click="doLogin">
            {{ loading ? "Signing In..." : "Sign In" }}
          </AppButton>

          <router-link class="text-blue-darken-2 text-body-2" to="/register">
            Create Account
          </router-link>
        </div>

        <div v-if="error" class="text-red mt-4 text-center">
          {{ error }}
        </div>

      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter, useRoute } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const loading = ref(false);
const error = ref<string | null>(null);

const loginForm = ref();
const isValid = ref(false);

const form = reactive({
  user: "",
  password: ""
});

async function doLogin() {
  const result = await loginForm.value.validate();

  if (!result.valid) {
    return; // do not call API
  }

  error.value = null;
  loading.value = true;

  try {
    await auth.login({
      userNameOrEmail: form.user,
      password: form.password,
    });

    const redirect = (route.query.redirect as string) || "/todos";
    router.push(redirect);

  } catch (err: any) {
    error.value = err?.response?.data || err?.message || "Login failed";
  } finally {
    loading.value = false;
  }
}

</script>

<style scoped>
.text-red {
  color: #e53935;
}
</style>
