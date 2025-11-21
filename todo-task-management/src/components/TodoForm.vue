<template>
  <div class="bg-white p-6">

    <!-- Success -->
    <p v-if="savedMessage" class="text-green-600 text-center font-medium mb-4">
      {{ savedMessage }}
    </p>

    

    <!-- Main form -->
    <v-form v-model="isValid" class="space-y-4" ref="todoForm">

      <!-- Title Row -->
      <div class="flex items-center gap-4">
        <div class="flex-1">
          <AppInput
            v-model="title"
            placeholder="Add your task"
            class="rounded-full !h-14 !px-6 bg-gray-100"
            required
          />
        </div>
      </div>

      <!-- Description -->
      <AppTextArea
        v-model="description"
        rows="2"
        placeholder="Description (optional)"
        class="mt-4 bg-gray-100"
      />

      <!-- Add Button -->
      <div class="d-flex justify-end">
        <AppButton
        @click="submit"
          class="!h-14 !w-14 rounded-full text-3xl flex mt-3 items-center justify-center"
          style="background:#22c55e; color:white;"
        >
          Add
        </AppButton>
      </div>
      <!-- Error -->
    <div v-if="error" class="text-red mt-4 text-center">
          {{ error }}
        </div>
    </v-form>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "../stores/todoStore";

const store = useTodoStore();

const title = ref("");
const description = ref("");
const error = ref("");
const savedMessage = ref("");
const isValid = ref(false);
const todoForm = ref();

async function submit() {
  const result = await todoForm.value.validate();

  if (!result.valid) {
    return; // do not call API
  }

  error.value = null;
  savedMessage.value = "";

  try {
    await store.add({
      title: title.value,
      description: description.value,
    });

    // Reset form
    title.value = "";
    description.value = "";

    savedMessage.value = "Todo item Created Successfully.";
    setTimeout(() => (savedMessage.value = ""), 2000);

    window.dispatchEvent(new CustomEvent("saved"));
  } catch (err: any) {
    error.value = err?.message || "Failed to create task. Please try again.";
  }
}
</script>
<style scoped>
.text-red {
  color: #e53935;
}
</style>