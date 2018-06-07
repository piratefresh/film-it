const mongoose = require("mongoose");
const Conversation = require("./modules/Conversation");
const Message = require("./modules/Message");
const Profile = require("./modules/Profile");

function getId(socketUsers, mesg) {
  // Check if user is in socketUsers
  const found = socketUsers.some(el => {
    return el.username === mesg.senderHandle;
  });
}

/* function getSocketId(socketUsers, mesg) {
  socketUsers.map(id => {
    if (id.username === mesg.senderHandle) {
      console.log(id.socketId);
      return id.socketId;
    }
  });
} */

let socketUsers = [];
// Socket.Io
const socket = io => {
  io.on("connection", socket => {
    console.log("a user connected");

    socket.on("addUser", data => {
      user = {
        username: data.name,
        socketId: socket.id
      };
      if (data.name !== socketUsers.username) {
        socketUsers.push(user);
        console.log(socketUsers);
      }
      console.log("user exist already");
      console.log(socketUsers);
    });

    socket.on("privateMessage", mesg => {
      console.log(mesg);
      Profile.findOne({ handle: mesg.recieverHandle }).then(profile => {
        Conversation.findOneAndUpdate(
          {
            participants: {
              $all: [mesg.senderHandle, mesg.recieverHandle]
            }
          },
          {
            $push: {
              messages: {
                sender: mesg.senderHandle,
                message: mesg.message
              }
            }
          },
          { new: true },
          (err, res) => {
            if (res) {
              console.log("message with users exist, appending message");
              // Check for users in socketUsers array
              const socketReciever = socketUsers.find(id => {
                return id.username === mesg.recieverHandle.toString();
              });
              const socketSender = socketUsers.find(id => {
                return id.username === mesg.senderHandle.toString();
              });
              console.log(socketSender);
              if (socketReciever !== undefined) {
                io.to(socketReciever.socketId).emit("addMessage", res);
              }
              io.to(socketSender.socketId).emit("addMessage", res);
            } else {
              console.log("Creating new Message");
              const newConvo = new Conversation({
                participants: [mesg.senderHandle, mesg.recieverHandle],
                roomId: mesg.senderHandle + mesg.recieverHandle,
                avatars: [mesg.senderAvatar, profile.avatar],
                messages: {
                  sender: mesg.sender,
                  message: mesg.message
                }
              });
              newConvo.save();
              // Check for users in socketUsers array
              const socketReciever = socketUsers.find(id => {
                return id.username === mesg.recieverHandle.toString();
              });
              const socketSender = socketUsers.find(id => {
                return id.username === mesg.senderHandle.toString();
              });
              console.log(socketSender);
              if (socketReciever !== undefined) {
                io.to(socketReciever.socketId).emit("addMessage", res);
              }
              io.to(socketSender.socketId).emit("addMessage", res);
            }
          }
        );
      });
    });

    /*     // Read Message
    socket.on("readMessage", mesg => {
      Conversation.findOneAndUpdate(
        { "messages._id": mesg.id, "messages.read": false },
        {
          $set: {
            "messages.$.read": true
          }
        },
        { new: true },
        (err, doc) => {
          console.log(doc);
        }
      );
    }); */

    // Disconnects
    socket.on("disconnect", () => {
      socketUsers.map(user => {
        if (user.socketId === socket.id) {
          delete user;
        }
      });
      console.log("disconnected" + socketUsers);
    });
  });
};

module.exports = socket;
