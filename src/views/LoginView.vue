<template>
    <div class="login-container">
        <h1>Login</h1>
        <input type="text" v-model="userId" placeholder="Ingrese su ID alfanumérico" />
        <button @click="handleLogin">Iniciar Sesión</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userId: ''
        };
    },
    methods: {
        handleLogin() {
            if (this.isValidId(this.userId)) {
                localStorage.setItem('userId', this.userId);

                this.$router.push('/home'); 
            } else {
                alert('Por favor, ingrese un ID válido.');
            }
        },
        isValidId(id) {
            return /^[a-zA-Z0-9]+$/.test(id);
        }
    }
}
    ;
</script>

<style scoped>
/* Estilos para tu componente */
</style>