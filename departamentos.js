document.addEventListener("DOMContentLoaded", function () {
    const departamentos = {
        "Amazonas": ["Leticia", "Puerto Nariño"],
        "Antioquia": ["Medellín", "Envigado", "Bello", "Itagüí"],
        "Atlántico": ["Barranquilla", "Soledad", "Malambo"],
        "Bogotá D.C.": ["Bogotá"],
        "Bolívar": ["Cartagena", "Magangué", "Turbaco"],
        "Boyacá": ["Tunja", "Duitama", "Sogamoso"],
        "Caldas": ["Manizales", "Chinchiná", "Villamaría"],
        "Caquetá": ["Florencia", "Puerto Rico"],
        "Casanare": ["Yopal", "Aguazul"],
        "Cauca": ["Popayán", "Santander de Quilichao"],
        "Cesar": ["Valledupar", "Aguachica"],
        "Córdoba": ["Montería", "Cereté"],
        "Cundinamarca": ["Soacha", "Zipaquirá", "Girardot"],
        "Huila": ["Neiva", "Pitalito"],
        "La Guajira": ["Riohacha", "Maicao"],
        "Magdalena": ["Santa Marta", "Ciénaga"],
        "Meta": ["Villavicencio", "Acacías"],
        "Nariño": ["Pasto", "Ipiales"],
        "Norte de Santander": ["Cúcuta", "Ocaña"],
        "Quindío": ["Armenia", "Circasia"],
        "Risaralda": ["Pereira", "Dosquebradas"],
        "Santander": ["Bucaramanga", "Floridablanca", "Girón"],
        "Sucre": ["Sincelejo", "Corozal"],
        "Tolima": ["Ibagué", "Espinal"],
        "Valle del Cauca": ["Cali", "Palmira", "Buenaventura"]
    };

    // Usa el select de departamento existente en lugar de crear uno nuevo
    const departamentoSelect = document.getElementById("department");
    
    // Verificar si el elemento existe
    if (!departamentoSelect) {
        console.error("No se encontró el elemento select de departamento");
        return;
    }
    
    // Conserva la primera opción (Seleccione un departamento) y agrega el resto
    const primeraOpcion = departamentoSelect.innerHTML;
    departamentoSelect.innerHTML = primeraOpcion;
    
    // Agrega las opciones de departamentos
    for (const departamento in departamentos) {
        let option = document.createElement("option");
        option.value = departamento;
        option.textContent = departamento;
        departamentoSelect.appendChild(option);
    }
    
    // Usa el select de ciudad existente
    const ciudadSelect = document.getElementById("city");
    if (!ciudadSelect) {
        console.error("No se encontró el elemento select de ciudad");
        return;
    }
    
    // Configura el evento change para cuando se seleccione un departamento
    departamentoSelect.addEventListener("change", function () {
        const selectedDepartamento = this.value;
        ciudadSelect.innerHTML = '<option value="">Seleccione una ciudad</option>';
        
        if (selectedDepartamento && departamentos[selectedDepartamento]) {
            departamentos[selectedDepartamento].forEach(ciudad => {
                let option = document.createElement("option");
                option.value = ciudad;
                option.textContent = ciudad;
                ciudadSelect.appendChild(option);
            });
        }
    });
});
