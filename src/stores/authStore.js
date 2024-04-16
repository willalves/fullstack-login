import { ref, } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('api', () => {

  const router = useRouter();

  const error = ref(null);
  const isLoggedIn = ref(false);
  const token = ref(null);
  const user = ref(null);
  const data = ref(null);

  async function login(email, password) {
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    try {
      const res = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      });

      if (!res.ok) throw new Error(res.statusText);

      data.value = await res.json();

      if (data.value.success) {
        token.value = data.value.token;
        isLoggedIn.value = true;
        user.value = data.value.user;
        error.value = null;
        localStorage.setItem("token", data.value.token);
        await router.push("/");
      } else {
        throw new Error(res.statusText);
      }

    } catch (err) {
      error.value = err.message;
    }

  }

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:3333/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_token: localStorage.getItem("token"),
        })
      });
      if (res.ok) {
        localStorage.removeItem("token");
        token.value = null;
        isLoggedIn.value = false;
        user.value = null;
        error.value = null;
        await router.push("/login");
      } else {
        throw new Error("Internal server error");
      }
    } catch (err) {
      error.value = err.message;
    }
  }

    return { login, logout, error, token, user, isLoggedIn, data }
});