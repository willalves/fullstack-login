<script setup>
import BaseInput from "@/components/ui/BaseInput.vue";
import SignUpIcon from "@/components/ui/icons/SignUpIcon.vue";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const conf_password = ref("");
</script>

<template>
  <main class="h-[100vh] flex items-center justify-center">
    <div class="auth-wrapper">
      <header class="p-2 flex flex-col items-center justify-center">
        <SignUpIcon icon-class="w-8 h-8 fill-indigo-600" />
        <h2 class="text-2xl">Create an account!</h2>
      </header>

      <form @submit.prevent="" class="flex flex-col gap-4">
        <BaseInput
          v-model="email"
          label="Email"
          type="email"
          placeholder="your@email.com"
          input-class="text-sm border-b py-1 px-2 placeholder:italic hover:border-indigo-600 transition-colors focus:outline-none focus:border-indigo-600"
        />
        <BaseInput
          v-model="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          input-class="text-sm border-b py-1 px-2 placeholder:italic hover:border-indigo-600 transition-colors focus:outline-none focus:border-indigo-600"
        />
        <BaseInput
          v-model="conf_password"
          label="Confirm password"
          type="password"
          placeholder="••••••••"
          input-class="text-sm border-b py-1 px-2 placeholder:italic hover:border-indigo-600 transition-colors focus:outline-none focus:border-indigo-600"
        />

        <input
          type="submit"
          value="Register"
          class="mt-4 w-full border border-indigo-600 py-2 px-6 rounded cursor-pointer text-xs bg-indigo-600 text-white hover:bg-indigo-700 transition font-bold"
        />
      </form>

      <footer>
        Already have an account?
        <RouterLink to="/login" class="text-indigo-500 hover:underline"> Login </RouterLink>
      </footer>
    </div>
  </main>
</template>
