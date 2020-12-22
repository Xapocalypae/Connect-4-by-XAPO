const socket = io('http://localhost:3000')
const messageForm = document.getElementById('form')
const messageContainer = document.getElementById('msgs')
const messageInput = document.getElementById('msg-box')
const sendButton =document.getElementById('send')

const name = prompt('What is your gamer tag?')
appendMessagefrom('You Joined')
socket.emit('new-user',name)


socket.on('chat-message', data => {
    appendMessageto(data)

})

socket.on('user-connected',name => {
    appendMessageto(`${name} connected`)

})

socket.on('user-disconnected',name => {
    appendMessageto(`${name} disconnected`)

})

sendButton.addEventListener('click', e=> {
    e.preventDefault()
    const message = messageInput.value
    appendMessagefrom(message)
    socket.emit('send-chat-message',message)
    messageInput.value = ""

})

function appendMessageto(message) {
    const messageElement = document.createElement('div')
    messageElement.className = 'msg to shadow'
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

function appendMessagefrom(message) {
    const messageElement = document.createElement('div')
    messageElement.className = 'msg from shadow'
    messageElement.innerText = message
    messageContainer.append(messageElement)
}