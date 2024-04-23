import { defineStore } from 'pinia';
import { useRouter } from "vue-router";

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    error: null,
    isLoggedIn: false,
    token: null,
    user: null,
    data: null,
  }),
  actions: {
    async login(email, password) {
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

        this.data = await res.json();
        console.log("this.data: ", this.data);

        if (this.data.success) {
          this.token = this.data.token;
          this.isLoggedIn = true;
          this.user = this.data.user;
          this.error = null;
          localStorage.setItem("token", this.data.token);
        } else {
          throw new Error(res.statusText);
        }

      } catch (err) {
        this.error = err.message;
      }

    },

    async logout() {
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
          this.token = null;
          this.isLoggedIn = false;
          this.user = null;
          this.error = null;
        } else {
          throw new Error("Internal server error");
        }
      } catch (err) {
        this.error = err.message;
      }
    }
  }
});