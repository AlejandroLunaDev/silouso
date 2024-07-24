const userName = document.getElementById('userName');
const input = document.getElementById('message');
const chatMessage = document.querySelector('.messagesContainer');
const form = document.querySelector('form');

const socket = io();

const scrollToBottom = () => {
    chatMessage.scrollTop = chatMessage.scrollHeight;
}


socket.on('message', (data) => {
    const item = `<li class="message"><strong>${data.userName}:</strong> ${data.message}</li>`;
    chatMessage.insertAdjacentHTML('beforeend', item);
    scrollToBottom();
    console.log(data.message);
});

socket.on('previousMessages', (messages) => {
    messages.forEach((message) => {
        const item = `<li class="message"><strong>${message.user}:</strong> ${message.message}</li>`;
        chatMessage.insertAdjacentHTML('beforeend', item);
    });
    scrollToBottom();
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim()) {
        socket.emit('message', { userName: userName.textContent, message: input.value });
        input.value = '';
    }
});


Swal.fire({
    title: "Ingresa tu Nombre",
    input: "text",
    inputAttributes: {
        autocapitalize: "on"
    },
    showCancelButton: false,
    confirmButtonText: "Ingresar",
}).then((result) => {
    console.log(`Bienvenido ${result.value}`);
    userName.textContent = `${result.value}`;
    socket.emit('nuevo-usuario', {
        userName: result.value
    });
});