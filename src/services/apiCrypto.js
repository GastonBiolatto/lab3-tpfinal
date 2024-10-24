// services/apiCrypto.js
import axios from "axios";

export async function getCryptoPrices() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars"
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los precios de las criptomonedas:", error);
    return [];
  }
}
