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
                                    <router-link to="/venta" class="d-flex align-items-center p-3">
                                        <i class="fas fa-exchange-alt"></i>
                                        <span class="ms-3 d-none d-sm-flex">Venta</span>
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
                            <th>Logo</th>
                            <th>Nombre</th>
                            <th>Símbolo</th>
                            <th>Cantidad</th>
                            <th>Valor en ARS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="coin in monedasConValor" :key="coin.id">
                                <td><img :src="coin.image" alt="Logo" width="30" height="30"></td>
                                <td>{{ coin.name }}</td>
                                <td>{{ coin.symbol }}</td>
                                <td>{{ coin.cantidad }}</td>
                                <td>{{ coin.totalValue }}</td>
                            </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                                <td colspan="4" class="text-end"><strong>Total ARS:</strong></td>
                                <td>{{ totalARS }}</td>

                            </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

export default {
}
</script>

<style>
.full-screen-container {
    height: 100vh;
}

.todo-alto {
    height: 85%;
}
</style>
