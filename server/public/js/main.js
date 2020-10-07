const socket = io();
function addChat(name, msg) {
    if (name === msg.name) {
        const megCon = document.createElement('div');
        megCon.id = 'chats-left';
        const nameDiv = document.createElement('div');
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = msg.chat;
        nameDiv.innerHTML = 'You';
        megCon.appendChild(nameDiv);
        megCon.appendChild(msgDiv);
        document.getElementById('chat-view').appendChild(megCon);
    } else if (msg.name === 'bot') {
        const megCon = document.createElement('div');
        megCon.id = 'chats-center';
        const nameDiv = document.createElement('div');
        nameDiv.className = 'bot-msg';
        const line = document.createElement('div');
        const line1 = document.createElement('div');
        nameDiv.innerHTML = msg.chat;
        megCon.appendChild(line1);
        megCon.appendChild(nameDiv);
        megCon.appendChild(line);
        document.getElementById('chat-view').appendChild(megCon);

    } else {
        const megCon = document.createElement('div');
        megCon.id = 'chats-right';
        const nameDiv = document.createElement('div');
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = msg.chat;
        nameDiv.innerHTML = msg.name;
        megCon.appendChild(nameDiv);
        megCon.appendChild(msgDiv);
        document.getElementById('chat-view').appendChild(megCon);
    }
}

function updateScroll() {
    var element = document.getElementById("chat-view");
    element.scrollTop = element.scrollHeight;
}
if (JSON.parse(localStorage.getItem('user'))) {
    const { name } = JSON.parse(localStorage.getItem('user'));
    document.getElementById('auth-modals').style.display = 'none';
    const chatInput = document.getElementById('chat-input');

    socket.emit('get-meg');
    socket.on('get-meg', messages => {
        messages.map(msg => addChat(name, msg));
        updateScroll()
    })
    socket.on('message', message => {
        addChat(name, message);
        updateScroll();
    })

    if (chatInput) {
        chatInput.addEventListener('keypress', (event) => {
            if (event.keyCode === 13) {
                if (chatInput.value.trim() !== '') {
                    socket.emit('message', { name, chat: chatInput.value.trim() });
                    chatInput.value = '';
                }
            }
        })
    }

    document.getElementById('logout').addEventListener('click', (event) => {
        localStorage.clear();
        location.reload();
    })
} else {
    document.getElementById('container').style.display = 'none';

    document.getElementById('auth').addEventListener('click', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const password = document.getElementById('password').value.trim();

        if (name !== '' && password !== '') {
            socket.emit('add-user', { name, password });
            localStorage.setItem('user', JSON.stringify({ name }));
            location.reload();
        }
    })
}