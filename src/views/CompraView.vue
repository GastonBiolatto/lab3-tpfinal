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
                            <button type="button" class="d-flex btn btn-outline-danger" @click="logout">Cerrar sesión</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <div class="row todo-alto">
            <div class="col-8 d-flex justify-content-center align-items-center">
                <div class="table-responsive" style="height: 550px; overflow-y: auto;">
                    <input type="text" class="form-control my-input bg-dark text-light rounded-0 border-0 my-4"
                        placeholder="Buscar moneda" @keyup="buscarMoneda" v-model="textoBuscado">
                    <table class="table table-striped table-hover table-bordered">
                        <thead class="table-dark">
                            <tr>
                                <th>Logo</th>
                                <th>Moneda</th>
                                <th>Simbolo</th>
                                <th>Precio (ARS)</th>
                                <th>Elegir</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="coin in coins" :key="coin.id">
                                <td>
                                    <img :src="coin.image" alt="coin image" width="30" height="30">
                                </td>
                                <td>{{ coin.name }}</td>
                                <td>{{ coin.symbol }}</td>
                                <td>{{ coin.current_price }}</td>
                                <td><button class="btn btn-sm btn-primary"
                                        @click="seleccionarMoneda(coin)">Seleccionar</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-4 d-flex justify-content-center align-items-center">
                <div class="card" style="width: 18rem" v-if="monedaSeleccionada">
                    <img :src="monedaSeleccionada.image" alt="coin image" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">{{ monedaSeleccionada.name }}</h5>
                        <p class="card-text">
                            Símbolo: {{ monedaSeleccionada.symbol }} <br>
                            Precio: {{ monedaSeleccionada.current_price }} ARS
                        </p>
                        <div class="mb-3">
                            <label for="cantidad" class="form-label">Cantidad</label>
                            <input type="number" class="form-control" id="cantidad" v-model.number="cantidad" min="0" step="any">
                        </div>
                        <button class="btn btn-success me-2" @click="comprarMoneda">Comprar</button>
                        <button class="btn btn-danger" @click="venderMoneda">Vender</button>
                    </div>
                </div>
                <div v-else>
                    <p>Selecciona una moneda para ver los detalles aquí</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiClient from '@/services/apiClient';
import axios from 'axios';

export default {
    data() {
        return {
            coins: [], 
            monedaSeleccionada: null, 
            cantidad: 0, 
            textoBuscado: "" 
        }
    },
    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        }
    },
    mounted() {
        this.cargarDatos();
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/login');
        },
        async cargarDatos() {
            try {
                const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars");
                this.coins = response.data;
            } catch (error) {
                console.error('Error al obtener los datos de CoinGecko:', error);
            }
        },
        seleccionarMoneda(coin) {
            this.monedaSeleccionada = coin;
            this.cantidad = 0; 
        },
        buscarMoneda() {
            if (this.textoBuscado.length > 0) {
                this.coins = this.coins.filter(coin => coin.name.toLowerCase().includes(this.textoBuscado.toLowerCase()));
            } else {
                this.cargarDatos(); 
            }
        },
        async comprarMoneda() {
            if (this.cantidad <= 0 || !this.monedaSeleccionada) {
                alert('Por favor, ingresa una cantidad válida y selecciona una moneda.');
                return;
            }

            const transactionData = {
                user_id: this.currentUser.id,
                action: "purchase",
                crypto_code: this.monedaSeleccionada.symbol.toLowerCase(),
                crypto_amount: this.cantidad,
                money: (this.cantidad * this.monedaSeleccionada.current_price).toFixed(2),
                datetime: new Date()
            };

            try {
                await apiClient.post('/transactions', transactionData); 
                alert('Compra registrada con éxito!');
                this.monedaSeleccionada = null;
                this.cantidad = 0;
                this.textoBuscado = '';
                await this.cargarDatos();
            } catch (error) {
                console.error('Error al registrar la compra:', error);
                alert('Hubo un error al registrar la compra. Intenta nuevamente más tarde.');
            }
        },
        async venderMoneda() {
            if (this.cantidad <= 0 || !this.monedaSeleccionada) {
                alert('Por favor, ingresa una cantidad válida y selecciona una moneda.');
                return;
            }

            const transactionData = {
                user_id: this.currentUser.id,
                action: "sale",
                crypto_code: this.monedaSeleccionada.symbol.toLowerCase(),
                crypto_amount: this.cantidad,
                money: (this.cantidad * this.monedaSeleccionada.current_price).toFixed(2),
                datetime: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires', hour12: false })
            };

            try {
                await apiClient.post('/transactions', transactionData); 
                alert('Venta registrada con éxito!');
                this.monedaSeleccionada = null;
                this.cantidad = 0;
                this.textoBuscado = '';
                await this.cargarDatos();
            } catch (error) {
                console.error('Error al registrar la venta:', error);
                alert('Hubo un error al registrar la venta. Intenta nuevamente más tarde.');
            }
        }
    }
}
</script>

<style scoped>
.full-screen-container {
    height: 100vh;
}

.todo-alto {
    height: 85%;
}

.my-input::placeholder {
    color: white;
}
</style>
