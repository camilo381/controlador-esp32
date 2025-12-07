const ESP32_IP = "http://192.168.0.80";  // ← CAMBIA POR LA IP DE TU ESP32

function activar(dispositivo) {
    fetch(`${ESP32_IP}/on?dev=${dispositivo}`);
}

function desactivar(dispositivo) {
    fetch(`${ESP32_IP}/off?dev=${dispositivo}`);
}

// -----------------------------
// GRAFICAS
// -----------------------------

let humedadData = [];
let mqData = [];

const ctxH = document.getElementById('graficaHumedad');
const ctxMQ = document.getElementById('graficaMQ');

let graficaH = new Chart(ctxH, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: "Humedad del Suelo",
            data: humedadData
        }]
    }
});

let graficaM = new Chart(ctxMQ, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: "Calidad del Aire (MQ135)",
            data: mqData
        }]
    }
});

// Actualización automática cada 3 segundos
setInterval(() => {
    fetch(`${ESP32_IP}/lecturas`)
        .then(r => r.json())
        .then(d => {
            let tiempo = new Date().toLocaleTimeString();

            graficaH.data.labels.push(tiempo);
            graficaH.data.datasets[0].data.push(d.humedad);
            graficaH.update();

            graficaM.data.labels.push(tiempo);
            graficaM.data.datasets[0].data.push(d.mq);
            graficaM.update();
        });
}, 3000);
