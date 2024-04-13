<script setup>
import BaseInput from "@/components/ui/BaseInput.vue";
import { ref } from "vue";
import {useRouter} from "vue-router";
import { LogIn, Shell } from 'lucide-vue-next';

const router = useRouter();
const email = ref("");
const password = ref("");
const loading = ref(false);

const loginUser = async () => {
  loading.value = true;
  if (!email.value || !password.value) {
    return alert("All fields are required");
  }

  const res = await fetch("http://localhost:3333/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    })
  }).then(res => res.json())

  if (res.success) {
    localStorage.setItem("token", res.token);
    router.push("/");
  } else {
    alert(res.message);
  }
  loading.value = false;
}
</script>

<template>
  <main class="h-[100vh] flex items-center justify-center">
    <div class="auth-wrapper">
      <header class="p-2 flex flex-col items-center justify-center">
        <LogIn size="42" color="#4f46e5" absoluteStrokeWidth={true} />
        <h2 class="text-2xl">Welcome!</h2>
        <p class="">Sign in to your account</p>
      </header>

      <form @submit.prevent="loginUser" class="flex flex-col gap-4">
        <BaseInput
          v-model="email"
          label="Email"
          type="email"
          placeholder="your@email.com"
          input-class="auth-form-input"
        />
        <BaseInput
          v-model="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          input-class="auth-form-input"
        />

        <button
          type="submit"
          class="mt-4 w-full border border-indigo-600 py-2 px-6 rounded cursor-pointer text-xs bg-indigo-600 text-white hover:bg-indigo-700 transition font-bold flex gap-2 items-center justify-center disabled:bg-gray-500 disabled:border-gray-500 disabled:cursor-not-allowed"
          :disabled="!!loading"
        >
          <Shell size="18" color="#fff" absoluteStrokeWidth={true} class="animate-spin" v-if="loading" />
          <span class="font-bold" v-else>Login</span>
        </button>
      </form>

      <footer>
        Don't have an account yet?
        <RouterLink to="/register" class="text-indigo-500 hover:underline"> Register </RouterLink>
      </footer>
    </div>
  </main>
</template>

<style scoped></style>
