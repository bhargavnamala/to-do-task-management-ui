<template>
  <div class="toast-container">
    <transition-group name="toast">
      <div v-for="t in toasts" :key="t.id" class="toast" :class="t.type">
        {{ t.message }}
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { reactive, provide } from "vue";

const toasts = reactive<any[]>([]);

function show(message: string, type: "success" | "error" | "info" = "success") {
  const id = Date.now();
  toasts.push({ id, message, type });

  setTimeout(() => {
    const index = toasts.findIndex((t) => t.id === id);
    if (index !== -1) toasts.splice(index, 1);
  }, 2500);
}

provide("toast", { show });
</script>

<style>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

.toast {
  padding: 14px 18px;
  margin-bottom: 12px;
  border-radius: 10px;
  font-weight: 600;
  color: white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.toast.success {
  background: #16a34a;
}

.toast.error {
  background: #dc2626;
}

.toast.info {
  background: #2563eb;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
