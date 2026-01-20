const API_URL = "https://proyecto-final-poo-st-ii.onrender.com/api/peliculas";

const form = document.getElementById("form");
const tabla = document.getElementById("tabla");

form.addEventListener("submit", e => {
    e.preventDefault();
    guardar();
});

function listar() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            tabla.innerHTML = "";
            data.forEach(p => {
                tabla.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.titulo}</td>
                        <td>${p.genero}</td>
                        <td>${p.duracion}</td>
                        <td>${p.anioEstreno}</td>
                        <td>${p.disponible ? "Sí" : "No"}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick='editar(${JSON.stringify(p)})'>Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminar(${p.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function guardar() {
    const id = document.getElementById("id").value;

    const pelicula = {
        titulo: document.getElementById("titulo").value,
        genero: document.getElementById("genero").value,
        duracion: parseInt(document.getElementById("duracion").value),
        anioEstreno: parseInt(document.getElementById("anioEstreno").value),
        disponible: document.getElementById("disponible").value === "true"
    };

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pelicula)
    })
    .then(res => {
        if (!res.ok) throw new Error("Error en validación");
        return res.json();
    })
    .then(() => {
        form.reset();
        document.getElementById("id").value = "";
        listar();
    })
    .catch(() => alert("Error: revisa los datos"));
}

function editar(p) {
    document.getElementById("id").value = p.id;
    document.getElementById("titulo").value = p.titulo;
    document.getElementById("genero").value = p.genero;
    document.getElementById("duracion").value = p.duracion;
    document.getElementById("anioEstreno").value = p.anioEstreno;
    document.getElementById("disponible").value = p.disponible;
}

function eliminar(id) {
    if (confirm("¿Eliminar película?")) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then(() => listar());
    }
}

listar();
