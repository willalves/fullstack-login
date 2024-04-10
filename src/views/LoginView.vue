<script setup>
/**
 * TO KEEP GOING LATER: https://www.youtube.com/watch?v=SweqIbsYZ94
 */
import BaseInput from "@/components/ui/BaseInput.vue";
import SignInIcon from "@/components/ui/icons/SignInIcon.vue";
import { ref } from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");

const loginUser = async () => {
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
}
</script>

<template>
  <main class="h-[100vh] flex items-center justify-center">
    <div class="auth-wrapper">
      <header class="p-2 flex flex-col items-center justify-center">
        <SignInIcon icon-class="w-8 h-8 fill-indigo-600" />
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

        <input
          type="submit"
          value="Login"
          class="mt-4 w-full border border-indigo-600 py-2 px-6 rounded cursor-pointer text-xs bg-indigo-600 text-white hover:bg-indigo-700 transition font-bold"
        />
      </form>

      <footer>
        Don't have an account yet?
        <RouterLink to="/register" class="text-indigo-500 hover:underline"> Register </RouterLink>
      </footer>
    </div>
  </main>
</template>

<style scoped></style>
