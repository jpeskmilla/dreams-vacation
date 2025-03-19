// URLs de las APIs de Colombia
const DEPARTMENTS_API = "https://api-colombia.com/api/v1/Department";
const CITIES_API_BASE = "https://api-colombia.com/api/v1/Department";

// Datos locales de respaldo en caso de que fallen las APIs
const datosRespaldo = {
    "Amazonas": ["Leticia", "Puerto Nariño"],
    "Antioquia": ["Medellín", "Envigado", "Bello", "Itagüí", "Rionegro", "Sabaneta", "Caldas", "La Estrella", "Copacabana"],
    // ... resto de los datos de respaldo como en el código anterior ...
};

// Variable para almacenar los datos
let departments = [];
let usandoRespaldo = false;

// Elementos DOM
const departmentSelect = document.getElementById("department");
const citySelect = document.getElementById("city");
const departmentLoading = document.getElementById("departmentLoading");
const cityLoading = document.getElementById("cityLoading");

// Función para cargar los departamentos
async function loadDepartments() {
    try {
        const response = await fetch(DEPARTMENTS_API);
        if (!response.ok) {
            throw new Error('Error en la respuesta del API');
        }
        
        departments = await response.json();
        
        // Limpiar el select
        departmentSelect.innerHTML = '<option value="">Seleccione un departamento</option>';
        
        // Añadir los departamentos ordenados
        departments.sort((a, b) => a.name.localeCompare(b.name)).forEach(dep => {
            let option = document.createElement("option");
            option.value = dep.id;
            option.textContent = dep.name;
            departmentSelect.appendChild(option);
        });
        
        // Ocultar el mensaje de carga
        departmentLoading.style.display = "none";
    } catch (error) {
        console.error("Error cargando departamentos:", error);
        console.log("Usando datos de respaldo locales");
        usandoRespaldo = true;
        loadLocalDepartments();
        departmentLoading.style.display = "none";
    }
}

// Función para cargar departamentos desde datos locales (respaldo)
function loadLocalDepartments() {
    departmentSelect.innerHTML = '<option value="">Seleccione un departamento</option>';
    Object.keys(datosRespaldo).sort().forEach(dep => {
        let option = document.createElement("option");
        option.value = dep;
        option.textContent = dep;
        departmentSelect.appendChild(option);
    });
}

// Función para cargar ciudades según el departamento seleccionado
async function loadCities(departmentId) {
    // Mostrar mensaje de carga y deshabilitar el select mientras carga
    cityLoading.style.display = "block";
    citySelect.disabled = true;
    citySelect.innerHTML = '<option value="">Cargando ciudades...</option>';
    
    if (usandoRespaldo) {
        loadLocalCities(departmentId);
        return;
    }
    
    try {
        const response = await fetch(`${CITIES_API_BASE}/${departmentId}/cities`);
        if (!response.ok) {
            throw new Error('Error en la respuesta del API');
        }
        
        const cities = await response.json();
        
        // Limpiar el select
        citySelect.innerHTML = '<option value="">Seleccione una ciudad</option>';
        
        // Habilitar el select
        citySelect.disabled = false;
        
        // Añadir las ciudades ordenadas
        cities.sort((a, b) => a.name.localeCompare(b.name)).forEach(city => {
            let option = document.createElement("option");
            option.value = city.id;
            option.textContent = city.name;
            citySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error cargando ciudades:", error);
        usandoRespaldo = true;
        loadLocalCities(departmentId);
    } finally {
        // Ocultar mensaje de carga
        cityLoading.style.display = "none";
    }
}

// Función para cargar ciudades desde datos locales (respaldo)
function loadLocalCities(departmentName) {
    citySelect.innerHTML = '<option value="">Seleccione una ciudad</option>';
    
    let cities = datosRespaldo[departmentName] || [];
    cities.sort().forEach(cityName => {
        let option = document.createElement("option");
        option.value = cityName;
        option.textContent = cityName;
        citySelect.appendChild(option);
    });
    
    citySelect.disabled = false;
    cityLoading.style.display = "none";
}

// Evento para cargar ciudades cuando se selecciona un departamento
departmentSelect.addEventListener("change", function () {
    let selectedDepartmentId = this.value;
    
    if (!selectedDepartmentId) {
        citySelect.innerHTML = '<option value="">Primero seleccione un departamento</option>';
        citySelect.disabled = true;
        return;
    }
    
    if (usandoRespaldo) {
        // Si estamos usando datos de respaldo, el value es el nombre del departamento
        loadLocalCities(selectedDepartmentId);
    } else {
        // Si estamos usando la API, el value es el ID del departamento
        loadCities(selectedDepartmentId);
    }
});

// Manejar el envío del formulario
document.getElementById("locationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const departamento = departmentSelect.options[departmentSelect.selectedIndex].textContent;
    const ciudad = citySelect.options[citySelect.selectedIndex].textContent;
    
    alert(`Formulario enviado con éxito!\nDepartamento: ${departamento}\nCiudad: ${ciudad}`);
    // Aquí puedes enviar los datos a tu servidor
});

// Iniciar carga de departamentos cuando carga la página
document.addEventListener("DOMContentLoaded", loadDepartments);