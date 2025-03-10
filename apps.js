const scriptURL = 'https://script.google.com/macros/s/AKfycbwL6k3p7hjP4URsioxiAWolaYVWBEYHA8Uc6xLCC6nUYnV_CaCWCvkxKXdRJm4rjDFxew/exec';
const form = document.forms['cancún'];
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Deshabilita el botón para evitar múltiples envíos
    submitButton.disabled = true;
    submitButton.innerText = "Enviando...";

    // Validación adicional antes del envío
    if (!validateForm()) {
        alert("Por favor, completa todos los campos obligatorios correctamente.");
        submitButton.disabled = false;
        submitButton.innerText = "Realizar pago";
        return;
    }

    try {
        const formData = new FormData(form);
        const response = await fetch(scriptURL, { method: 'POST', body: formData });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.result === "success") {
            showSuccessMessage();
            form.reset();
        } else {
            throw new Error("No se pudo procesar la solicitud correctamente.");
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        showErrorMessage(error.message);
    } finally {
        // Reactivar el botón después de procesar la solicitud
        submitButton.disabled = false;
        submitButton.innerText = "Realizar pago";
    }
});

// Validación de los campos antes de enviar
function validateForm() {
    let valid = true;
    const inputs = form.querySelectorAll("input[required], select[required]");
    inputs.forEach((input) => {
        if (!input.value.trim()) {
            valid = false;
            input.style.border = "2px solid red";
        } else {
            input.style.border = "1px solid #ccc";
        }
    });
    return valid;
}

// Muestra mensaje de éxito
function showSuccessMessage() {
    const message = document.createElement("p");
    message.innerText = "✅ ¡Formulario enviado con éxito!";
    message.style.color = "green";
    message.style.fontWeight = "bold";
    form.appendChild(message);
}

// Muestra mensaje de error
function showErrorMessage(errorText) {
    const message = document.createElement("p");
    message.innerText = `❌ Error: ${errorText}`;
    message.style.color = "red";
    message.style.fontWeight = "bold";
    form.appendChild(message);
}



