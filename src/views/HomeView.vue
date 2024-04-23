<script setup>
import { useAuthStore } from "@/stores/authStore.js";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const loading = ref(false);

const logout = async () => {
  loading.value = true;
  try {
    await authStore.logout();
    await router.push("/");
  } catch(error) {
    toast.error(error.message);
  } finally {
    loading.value = false;
  }
}

</script>

<template>
  <main class="p-2">
    <h1 class="mb-2 text-3xl">Hello User</h1>
    <button
      class="border border-sky-600 py-1 px-4 rounded-md cursor-pointer text-sm bg-sky-600 text-white hover:bg-sky-700 transition font-bold"
      @click="logout"
    >
      Logout
    </button>
    <p v-if="loading">Loading...</p>
  </main>
</template>
