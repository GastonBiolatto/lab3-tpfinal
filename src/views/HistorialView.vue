<template>
    <div class="container-fluid bg-secondary-subtle full-screen-container">
        <div class="row">
            <div class="col">
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item list-group-item">
                                    <router-link to="/inicio" class="d-flex align-items-center p-3">
                                        <i class="fas fa-home"></i>
                                        <span class="ms-3 d-none d-sm-flex">Inicio</span>
                                    </router-link>
                                </li>
                                <li class="nav-item list-group-item">
                                    <router-link to="/compra" class="d-flex align-items-center p-3">
                                        <i class="fas fa-shopping-cart"></i>
                                        <span class="ms-3 d-none d-sm-flex">Compra/Venta</span>
                                    </router-link>
                                </li>
                                <li class="nav-item list-group-item">
                                    <router-link to="/transaccion" class="d-flex align-items-center p-3">
                                        <i class="fas fa-exchange-alt"></i>
                                        <span class="ms-3 d-none d-sm-flex">Transacciones</span>
                                    </router-link>
                                </li>
                                <li class="nav-item list-group-item">
                                    <router-link to="/historial" class="d-flex align-items-center p-3">
                                        <i class="fas fa-history"></i>
                                        <span class="ms-3 d-none d-sm-flex">Historial</span>
                                    </router-link>
                                </li>
                                <li class="nav-item list-group-item">
                                    <router-link to="/analisis" class="d-flex align-items-center p-3">
                                        <i class="fa fa-line-chart"></i>
                                        <span class="ms-3 d-none d-sm-flex">Análisis</span>
                                    </router-link>
                                </li>
                            </ul>
                            <button type="button" class="d-flex btn btn-outline-danger" @click="logout">Cerrar sesión</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <div class="row todo-alto">
            <div class="col-12 d-flex align-items-center justify-content-center">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Accion</th>
                            <th>Cantidad</th>
                            <th>Código</th>
                            <th>Fecha</th>
                            <th>Valor ARS</th>
                            <th>ID Transacción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(coin, index) in monedasConValor" :key="index">
                            <td>{{ coin.action }}</td>
                            <td>{{ coin.crypto_amount }}</td>
                            <td>{{ coin.crypto_code }}</td>
                            <td>{{ coin.datetime }}</td>
                            <td>{{ coin.money }}</td>
                            <td>{{ coin._id }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import apiClient from "@/services/apiClient";

export default {
    data() {
        return {
            monedasConValor: [],
        };
    },
    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        }
    },
    created() {
        this.obtenerDatos();
    },
    methods: {
        async obtenerDatos() {
            try {
                const respuesta = await apiClient.get('/transactions');
                const data = respuesta.data;

                this.monedasConValor = data.filter(
                    (item) => item.user_id === this.currentUser.id
                );
            } catch (e) {
                console.error('Error al hacer la solicitud:', e);
                this.monedasConValor = [];
            }
        },
        logout() {
            this.$store.dispatch("logout");
            this.$router.push("/login");
        }
    },
};
</script>

<style>
.full-screen-container {
    height: 100vh;
}

.todo-alto {
    height: 85%;
}
</style>
