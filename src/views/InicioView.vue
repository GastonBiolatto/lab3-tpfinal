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
                                        <span class="ms-3 d-none d-sm-flex">Compra</span>
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
            <div class="col-12 d-flex align-items-center justify-content-center">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Crypto</th>
                            <th>Cantidad</th>
                            <th>Valor en ARS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(coin, key) in valorFinal" :key="key">
                            <td>{{ coin.crypto_code }} </td>
                            <td>{{ coin.crypto_final }}</td>
                            <td>{{ coin.cantArs }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2" class="text-right">Total</td>
                            <td>{{ total }}</td>
                        </tr>
                    </tfoot>
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
            valorFinal: {},
            totalArs: 0,
        };
    },
    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        },
        total() {
            return Object.values(this.valorFinal).reduce((total, coin) => {
                return total + coin.cantArs;
            }, 0);
        },
    },
    created() {
        this.obtenerDatos();
    },
    mounted() {
        this.cargarDatos();
    },
    methods: {
        async cargarDatos() {
            try {
                const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars");
                this.todasCrypto = response.data;
            } catch (error) {
                console.error('Error al obtener los datos de CoinGecko:', error);
            }
        },
        async obtenerDatos() {
            try {
                const respuesta = await apiClient.get('/transactions');
                const data = respuesta.data;

                this.monedasConValor = data.filter(
                    (item) => item.user_id == this.currentUser.id
                );
console.log(this.monedasConValor);
                this.monedasConValor.forEach((transaction) => {
                    const cryptoCode = transaction.crypto_code;

                    if (!this.valorFinal[cryptoCode]) {
                        this.valorFinal[cryptoCode] = {
                            crypto_code: cryptoCode,
                            crypto_final: 0,
                            cantArs: 0,
                        };
                    }
                    const cryptoAmount = parseFloat(transaction.crypto_amount) ;
                    const value = parseFloat(transaction.money);
console.log(value);
                    if (transaction.action === 'purchase') {
                        this.valorFinal[cryptoCode].crypto_final += cryptoAmount;
                        this.valorFinal[cryptoCode].cantArs += cryptoAmount * value;
                    } else if (transaction.action === 'sale') {
                        this.valorFinal[cryptoCode].crypto_final -= cryptoAmount;
                        this.valorFinal[cryptoCode].cantArs -= cryptoAmount * value;
                    }
                });

                console.log(this.valorFinal);
            } catch (e) {
                console.error('Error al hacer la solicitud:', e);
                this.monedasConValor = [];
            }
        },
        logout() {
            this.$store.dispatch("logout");
            this.$router.push("/login");
        },
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
