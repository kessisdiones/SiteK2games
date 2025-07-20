// config.js
const API_BASE_URL = "http://18.230.226.175:5000"; // só altere aqui

// Para compatibilidade com os dois scripts:
const AUTH_API_URL = `${API_BASE_URL}/api`;

function sanitizeHTML(text) {
  const temp = document.createElement("div");
  temp.textContent = text;
  return temp.innerHTML;
}
