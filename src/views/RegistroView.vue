<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/"><i class="fas fa-home"></i></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div>
          <form class="d-flex">
            <a class="btn btn-primary me-2" href="/Login" role="button">Login</a>
          </form>
        </div>
      </div>
    </nav>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h2 class="text-center">Registro</h2>
          <form @submit.prevent="registerForm">
            <div class="mb-3">
              <label for="email" class="form-label">Mail</label>
              <input v-model="email" type="email" class="form-control" id="email" placeholder="..." required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Generar Código de Cuenta</button>
            <div v-if="generatedId" class="mt-3 alert alert-success text-center">
              Tu ID alfanumérico es: <strong>{{ generatedId }}</strong>
            </div>
          </form>
          <p class="mt-3 text-center">Ya tienes una cuenta? <router-link to="/login">Login</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      generatedId: null, 
    };
  },
  methods: {
    ...mapActions(['login']),

    registerForm() {
      this.generatedId = this.generateRandomId(); 
      
      this.login(this.generatedId); 

      localStorage.setItem('userId', this.generatedId);
    },

    generateRandomId() {
      const length = 8; 
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result; 
    },
  },
};
</script>

<style scoped>
/* Estilos para tu componente */
</style>
