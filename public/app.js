const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');
let editingUserId = null; // Para almacenar el ID del usuario que se está editando

// Función para obtener usuarios de la API
async function fetchUsers() {
    try {
        const response = await fetch('/api/usuarios');
        const users = await response.json();
        userList.innerHTML = ''; // Limpiar la lista antes de mostrar nuevos usuarios
        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            userItem.innerHTML = `
                ${user.nombre} ${user.apellido} - ${user.correo} - ${user.edad} años
                <button onclick="editUser('${user._id}', '${user.nombre}', '${user.apellido}', '${user.correo}', ${user.edad})">Editar</button>
                <button onclick="deleteUser('${user._id}')">Eliminar</button>
            `;
            userList.appendChild(userItem);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Función para agregar un nuevo usuario
userForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar que se recargue la página
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const edad = document.getElementById('edad').value;

    try {
        if (editingUserId) {
            // Actualizar usuario
            const response = await fetch(`/api/usuarios/${editingUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, apellido, correo, edad })
            });
            if (response.ok) {
                editingUserId = null; // Limpiar ID de edición
                userForm.reset(); // Limpiar el formulario
                fetchUsers(); // Volver a cargar la lista de usuarios
            } else {
                const errorData = await response.json();
                console.error('Error updating user:', errorData.message);
            }
        } else {
            // Crear nuevo usuario
            const response = await fetch('/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, apellido, correo, edad })
            });
            if (response.ok) {
                userForm.reset(); // Limpiar el formulario
                fetchUsers(); // Volver a cargar la lista de usuarios
            } else {
                const errorData = await response.json();
                console.error('Error adding user:', errorData.message);
            }
        }
    } catch (error) {
        console.error('Error adding/updating user:', error);
    }
});

// Función para editar un usuario
function editUser(id, nombre, apellido, correo, edad) {
    editingUserId = id; // Guardar el ID del usuario a editar
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('correo').value = correo;
    document.getElementById('edad').value = edad;
    userForm.querySelector('button[type="submit"]').innerText = 'Actualizar Usuario'; // Cambiar texto del botón
}

// Función para eliminar un usuario
async function deleteUser(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        try {
            const response = await fetch(`/api/usuarios/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchUsers(); // Volver a cargar la lista de usuarios
            } else {
                const errorData = await response.json();
                console.error('Error deleting user:', errorData.message);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
}

// Cargar usuarios al inicio
fetchUsers();
