<script setup>
import {useRouter} from "vue-router";
import { ref } from "vue";

const router = useRouter();
const loading = ref(false);

const logout = async () => {
  loading.value = true;
  const res = await fetch("http://localhost:3333/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_token: localStorage.getItem("token"),
    })
  }).then(res => res.json());

  if (res.success) {
    localStorage.removeItem("token");
    router.push("/login");
  } else {
    alert(res.message);
  }
  loading.value = false;
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
