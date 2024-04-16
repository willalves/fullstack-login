<script setup>
import BaseInput from "@/components/ui/BaseInput.vue";
import { CircleUserRound, Shell } from "lucide-vue-next";
import { ref } from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const conf_password = ref("");
const loading = ref(false);

const registerUser = async () => {
  loading.value = true;
  if (!email.value || !password.value || !conf_password.value) {
    return alert("All fields are required");
  }

  if (password.value !== conf_password.value) {
    return alert("Passwords don't match");
  }

  const res = await fetch("http://localhost:3333/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: { first_name: firstName.value, last_name: lastName.value },
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
        <CircleUserRound size="42" color="#4f46e5" absoluteStrokeWidth={true} />
        <h2 class="text-2xl">Create an account!</h2>
      </header>

      <form @submit.prevent="registerUser" class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <BaseInput
            v-model="firstName"
            label="First name"
            type="text"
            placeholder="William"
            input-class="auth-form-input"
          />
          <BaseInput
            v-model="lastName"
            label="Last name"
            type="text"
            placeholder="Silva"
            input-class="auth-form-input"
          />
        </div>
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
        <BaseInput
          v-model="conf_password"
          label="Confirm password"
          type="password"
          placeholder="••••••••"
          input-class="auth-form-input"
        />

        <button
          type="submit"
          class="mt-4 w-full border border-indigo-600 py-2 px-6 rounded cursor-pointer text-xs bg-indigo-600 text-white hover:bg-indigo-700 transition flex gap-2 items-center justify-center disabled:bg-gray-500 disabled:border-gray-500 disabled:cursor-not-allowed"
          :disabled="!!loading"
        >
          <Shell size="18" color="#fff" absoluteStrokeWidth={true} class="animate-spin" v-if="loading" />
          <span class="font-bold" v-else>Register</span>
        </button>
      </form>

      <footer>
        Already have an account?
        <RouterLink to="/login" class="text-indigo-500 hover:underline"> Login </RouterLink>
      </footer>
    </div>
  </main>
</template>

<style scoped></style>
