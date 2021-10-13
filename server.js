const express = require('express');
const app = express();


const PORT = 3333;

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
})

//шаблоны
class User {
  constructor(username, userId) {
    this.username = username;
    this.socketId = '';
    this.userId = userId;
  }
}

class Chatroom {
  constructor(chatname, chatId) {
    this.chatname = chatname;
    this.chatId = chatId;
    this.users = [];
    this.messages = [];
  }

  addUser(value) {
    this.users = [...this.users, value];
  }

  findUser(value) {
    return this.users.find(user => user.socketId === value);
  }

  addMessage(value) {
    this.messages = [...this.messages, value];
  }
}

class Message  {
  
  constructor(username, text) {
    this.username = username;
    this.text = text;
    this.date = new Date();
    this.messageId = (Math.random()*100000).toFixed();
  }
}

app.use(express.json());

// rooms будет базой данных со всеми существующими чатами
let rooms = [];

// на get-запросе проверяем, если ли уже такой чат и отправляем нужные данные
app.get('/room/:id', (req, res) => {
  const {id: chatId} = req.params;
  const room = rooms.find(room => room.chatId === chatId);
  const data = room ? 
    {
      chatId,
      chatname: room.chatname,
      users: [...room.users],
      messages: [...room.messages]
    }
    :
    { users: [], messages: [] }
  res.json(data);
})

//на post-запросе проверяем, создает ли пользователь новый чат или добавляется в 
// существующий и добавляем нового пользователя
app.post('/room', (req, res) => {
  const { chatname, chatId, username, userId } = req.body;
  
  if (chatname) {
    const room = new Chatroom(chatname, chatId);
    const user = new User(username, userId);
    rooms = [...rooms, room];
    room.addUser(user);
  } else {
    const room = rooms.find(room => room.chatId === chatId);
    const user = new User(username, userId);
    room.addUser(user);
  }

  res.send();
})

io.on('connection', (socket) => {
  // создаем подключение, присваеваем юзеру свой сокет, возвращаем данные о всех юзерах
  socket.on('LOGIN', ({chatId, userId}) => { 
    socket.join(chatId);
    const users = rooms.find(room => room.chatId === chatId).users;
    const user = users.find(user => user.userId === userId);
    user.socketId = socket.id;
    socket.to(chatId).emit('USERS', users); 
  })

  //добавляем в нашу базу сообщение и его же возравщаем
  socket.on('SEND MESSAGE', ({chatId, message}) => {
    const room = rooms.find(room => room.chatId === chatId);
    const user = room.findUser(socket.id);
    const newMessage = new Message(user.username, message);
    room.addMessage(newMessage);
    socket.to(chatId).emit('ADD MESSAGE', newMessage); 
  })

  // удаление пользователя при отключении
  socket.on('disconnect', () => {
    rooms.forEach(room => {
      room.users = room.users.filter(user => user.socketId !== socket.id);
      const users = room.users;
      socket.to(room.chatId).emit('USERS', users);
    })
  })
})

server.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('Server is running...');
})