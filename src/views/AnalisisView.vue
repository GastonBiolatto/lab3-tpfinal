<template>
  <div class="container-fluid bg-secondary-subtle full-screen-container">
    <div class="row">
      <div class="col">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item list-group-item">
                  <router-link
                    to="/inicio"
                    class="d-flex align-items-center p-3"
                  >
                    <i class="fas fa-home"></i>
                    <span class="ms-3 d-none d-sm-flex">Inicio</span>
                  </router-link>
                </li>
                <li class="nav-item list-group-item">
                  <router-link
                    to="/compra"
                    class="d-flex align-items-center p-3"
                  >
                    <i class="fas fa-shopping-cart"></i>
                    <span class="ms-3 d-none d-sm-flex">Compra/Venta</span>
                  </router-link>
                </li>
                <li class="nav-item list-group-item">
                  <router-link
                    to="/transaccion"
                    class="d-flex align-items-center p-3"
                  >
                    <i class="fas fa-exchange-alt"></i>
                    <span class="ms-3 d-none d-sm-flex">Transacciones</span>
                  </router-link>
                </li>
                <li class="nav-item list-group-item">
                  <router-link
                    to="/historial"
                    class="d-flex align-items-center p-3"
                  >
                    <i class="fas fa-history"></i>
                    <span class="ms-3 d-none d-sm-flex">Historial</span>
                  </router-link>
                </li>
                <li class="nav-item list-group-item">
                  <router-link
                    to="/analisis"
                    class="d-flex align-items-center p-3"
                  >
                    <i class="fa fa-line-chart"></i>
                    <span class="ms-3 d-none d-sm-flex">Análisis</span>
                  </router-link>
                </li>
              </ul>
              <button
                type="button"
                class="d-flex btn btn-outline-danger"
                @click="logout"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div class="row todo-alto">
      <div class="col-8 d-flex justify-content-center align-items-center">
        <h2>Análisis de Inversiones</h2>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Criptomoneda</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            
            <tr v-for="(resultado, cryptoCode) in resultados" :key="cryptoCode">
              <td>{{ cryptoCode}}</td>
              <td>
                {{ resultado > 0 ? "+" : "" }}{{ resultado.toFixed(2) }} ARS
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "@/services/apiClient";
import axios from "axios";

export default {
  data() {
    return {
      transacciones: [],
      coins: [],
      resultados: {},
      estado: {},
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
  created() {
    this.obtenerTransacciones();
    this.cargarDatos();
  },
  methods: {
    async obtenerTransacciones() {
      try {
        const respuesta = await apiClient.get("/transactions", {
          params: { q: { user_id: this.currentUser.id } },
        });
        this.transacciones = respuesta.data;
        this.calcularResultados();
      } catch (error) {
        console.error("Error al obtener las transacciones:", error);
      }
    },
    async cargarDatos() {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars"
        );
        this.coins = response.data;
      } catch (error) {
        console.error("Error al obtener los datos de CoinGecko:", error);
      }
    },
    calcularResultados() {
      const resultados = {};

      this.transacciones.forEach((transaccion) => {
        const { crypto_code, crypto_amount, money, action } = transaccion;
        const cantidad = parseFloat(crypto_amount);
        const precio = parseFloat(money);

        if (!resultados[crypto_code]) {
          resultados[crypto_code] = 0;
        }

        if (action === "purchase") {
          resultados[crypto_code] -= cantidad * precio;
        }

        if (action === "sale") {
          const precioActual = this.preciosActuales[crypto_code] || 0;
          resultados[crypto_code] +=
            cantidad * precioActual - cantidad * precio;
        }
      });

      this.resultados = resultados;
    },
  },
};
</script>

<style>
.full-screen-container {
  height: 100vh;
}
</style>