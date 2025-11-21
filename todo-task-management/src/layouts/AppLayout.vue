<template>
<div class="drawer lg:drawer-open">
<input id="sidebar" type="checkbox" class="drawer-toggle" />
<div class="drawer-content flex flex-col">
<div class="navbar bg-primary text-primary-content justify-between px-4">
<label for="sidebar" class="btn btn-ghost lg:hidden">
<i class="fas fa-bars"></i>
</label>
<h1 class="text-xl font-bold">My Todos App</h1>
<button @click="logout" class="btn btn-sm btn-error">Logout</button>
</div>


<main class="p-6 bg-base-200 min-h-screen">
<slot />
</main>
</div>


<div class="drawer-side">
<label for="sidebar" class="drawer-overlay"></label>
<ul class="menu bg-base-100 w-64 p-4">
<li><router-link to="/todos">Todos</router-link></li>
<li><router-link to="/todos/add">Add Todo</router-link></li>
</ul>
</div>
</div>
</template>


<script setup>
import { useAuthStore } from "../stores/authStore";
const auth = useAuthStore();
const logout = () => auth.logout();
</script>