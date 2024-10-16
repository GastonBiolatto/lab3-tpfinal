<template>
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/"><i class="fas fa-home"></i></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div>
            <form class="d-flex">
              <a class="btn btn-primary me-2" href="/registro" role="button">Registro</a>
            </form>
          </div>
        </div>
      </nav>
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <h2 class="text-center">Login</h2>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="idUsuario" class="form-label">idUsuario</label>
                <input v-model="idUsuario" type="text" class="form-control" placeholder="..." id="idUsuario" required>
              </div>
              <button type="submit" class="btn btn-primary w-100">Login</button>
              <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
            </form>
            <p class="mt-3 text-center">No tienes una cuenta? <router-link to="/registro">Registrarse</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        idUsuario: '',
        errorMessage: ''
      };
    },
    methods: {
      async login() {
        const success = await this.$store.dispatch('login', { id: this.idUsuario });
  
        if (success) {
          const currentUser = this.$store.getters.currentUser;
  
          // Guardar ID del usuario en local storage
          localStorage.setItem('usuarioLogeado', currentUser.id);
          alert(`Bienvenido ${currentUser.name}`);
          this.$router.push('/inicio');
        } else {
          this.errorMessage = 'Usuario y/o contraseña incorrectos!';
        }
      },
      logout() {
        // Método para cerrar sesión
        localStorage.removeItem('currentUserId'); // Elimina el ID del local storage
        this.$router.push('/login'); // Redirige al usuario al login
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  