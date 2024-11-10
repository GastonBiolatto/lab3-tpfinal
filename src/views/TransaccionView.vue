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
                            </ul>
                            <button type="button" class="d-flex btn btn-outline-danger" @click="logout">Cerrar
                                sesión</button>
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
                            <th>Acción</th>
                            <th>Cantidad</th>
                            <th>Código</th>
                            <th>Fecha</th>
                            <th>Valor ARS</th>
                            <th>ID Transacción</th>
                            <th>Opciones</th>
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
                            <td>
                                <button @click="abrirModal(coin)" class="btn btn-warning btn-sm">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button @click="eliminarTransaccion(coin._id)" class="btn btn-danger btn-sm ms-2">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="modal fade" tabindex="-1" :class="{ 'show d-block': mostrarModal }"
            style="background: rgba(0, 0, 0, 0.5);">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Cantidad de Cripto</h5>
                        <button type="button" class="btn-close" @click="cerrarModal"></button>
                    </div>
                    <div class="modal-body">
                        <label for="cryptoAmount">Nueva cantidad:</label>
                        <input type="number" v-model="editarCrypto" id="cryptoAmount" class="form-control" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
                        <button type="button" class="btn btn-primary" @click="guardarCambios">Guardar cambios</button>
                    </div>
                </div>
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
            mostrarModal: false,
            idTransaccionSeleccionada: null,
            editarCrypto: null,
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
        abrirModal(transaccion) {
            this.idTransaccionSeleccionada = transaccion._id;
            this.editarCrypto = transaccion.crypto_amount;
            this.mostrarModal = true;
        },
        cerrarModal() {
            this.mostrarModal = false;
            this.idTransaccionSeleccionada = null;
            this.editarCrypto = null;
        },
        async guardarCambios() {
            try {
                await apiClient.patch(`/transactions/${this.idTransaccionSeleccionada}`, { crypto_amount: this.editarCrypto });

                const transaccion = this.monedasConValor.find(item => item._id === this.idTransaccionSeleccionada);
                if (transaccion) transaccion.crypto_amount = this.editarCrypto;

                alert("Modificado con éxito");
                this.cerrarModal();
            } catch (e) {
                console.error('Error al hacer la solicitud:', e);
                alert("Error al modificar la transacción");
            }
        },
        async eliminarTransaccion(idTransaccion) {
            if (confirm("¿Está seguro de eliminar esta transacción?")) {
                try {
                    await apiClient.delete(`/transactions/${idTransaccion}`);
                }catch (e) {alert("Error al eliminar transaccion")}
            }
        },

        logout() {
            this.$store.dispatch("logout");
            this.$router.push("/login");
        },
    }
};
</script>

<style>
.full-screen-container {
    height: 100vh;
}

.todo-alto {
    height: 85%;
}

.modal-backdrop {
    display: none;
}
</style>
