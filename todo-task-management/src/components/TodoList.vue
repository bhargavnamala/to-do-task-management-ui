<template>
  <div class="space-y-4">

    <div v-if="store.loading" class="text-center py-4 text-gray-500">
      Loading…
    </div>

    <div v-else-if="store.tasks.length === 0" class="text-center text-gray-600 py-6">
      No tasks found.
    </div>

    <ol class="space-y-4">
      <li
        v-for="t in store.tasks"
        :key="t.id"
        class="p-5 bg-white flex justify-between items-start"
      >
        <!-- Display Mode -->
        <div
          v-if="editId !== t.id"
          class="flex-1 pr-4"
        >
          <div
            :class="{ 'line-through text-gray-400': t.isCompleted }"
            class="font-semibold text-lg"
          >
            {{ t.title }}
          </div>
        </div>

        <!-- Edit Mode -->
        <div v-else class="flex-1 space-y-3 pr-4">
          <AppInput v-model="editTitle" />
          <AppTextArea v-model="editDescription" rows="2" />
        </div>

        <!-- Buttons -->
        <div class="flex flex-col gap-3">

          <!-- Toggle -->
          
          <v-btn
  :icon="t.isCompleted? 'mdi-undo': 'mdi-check'"
  color="blue"
  variant="text"
  class="px-3 py-1"
            @click="toggle(t.id)"
></v-btn>

          <!-- Edit or Save -->
          
          <v-btn
  icon="mdi-pencil"
  color="blue"
  variant="text"
  class="px-3 py-1"
            v-if="editId !== t.id"
            @click="startEdit(t)"
></v-btn>


           <v-btn
           v-else
  icon="mdi-content-save"
  color="green"
  variant="text"
  class="px-3 py-1"
            @click="save(t.id)"
></v-btn>

          <!-- Delete -->
          
          <v-btn
  icon="mdi-delete"
  color="red"
  variant="text"
  class="px-3 py-1"
            @click="remove(t.id)"
></v-btn>

        </div>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "../stores/todoStore";

const store = useTodoStore();
const editId = ref<number | null>(null);
const editTitle = ref("");
const editDescription = ref("");

function toggle(id: number) {
  store.toggle(id);
}

function remove(id: number) {
  store.remove(id);
}

function startEdit(t: any) {
  editId.value = t.id;
  editTitle.value = t.title;
  editDescription.value = t.description;
}

function save(id: number) {
  store.update(id, {
    title: editTitle.value,
    description: editDescription.value,
  });

  editId.value = null;
}
</script>
