<template>
  <div class="card">
    <h2 class="title">{{ isEdit ? "Edit Task" : "Add Task" }}</h2>

    <form @submit.prevent="submitForm">
      <input class="input" v-model="task.title" placeholder="Task Title" required />

      <textarea class="textarea" v-model="task.description" placeholder="Description"></textarea>

      <label class="checkbox">
        <input type="checkbox" v-model="task.isCompleted" />
        Completed
      </label>

      <div style="margin-top: 15px; display:flex; gap:15px;">
        <button type="submit" class="btn primary">{{ isEdit ? "Update" : "Save" }}</button>
        <button type="button" class="btn secondary" @click="resetForm">Clear</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useTodoStore } from "../stores/todoStore";
import type { ITodoTask } from "../types/ITodoTask";

const props = defineProps<{ modelValue: ITodoTask | null }>();
const emit = defineEmits(["update:modelValue", "reset"]);

const store = useTodoStore();
const isEdit = ref(false);

const task = ref<ITodoTask>({
  id: 0,
  title: "",
  description: "",
  isCompleted: false,
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      task.value = { ...val };
      isEdit.value = true;
    }
  }
);

function submitForm() {
  if (isEdit.value && task.value.id) {
    store.updateTask(task.value.id, task.value);
  } else {
    store.addTask(task.value);
  }
  resetForm();
}

function resetForm() {
  task.value = { id: 0, title: "", description: "", isCompleted: false };
  isEdit.value = false;
  emit("reset");
}
</script>
