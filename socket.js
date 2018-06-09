const mongoose = require("mongoose");
const Conversation = require("./modules/Conversation");
const Message = require("./modules/Message");
const Profile = require("./modules/Profile");
const _ = require("lodash");

let socketUsers = [];
// Socket.Io
const socket = io => {
  io.on("connection", socket => {
    console.log("a user connected");

    socket.on("addUser", data => {
      // Make an user object with data recieved from client
      user = {
        username: data.name,
        socketId: socket.id
      };

      // Check if user already exist in sockted user object
      const found = socketUsers.filter(obj => {
        return obj.hasOwnProperty("username") && obj.username == data.name;
      });

      // if user does not exist in socket user object, push to object
      if (found.length === 0) {
        socketUsers.push(user);
        console.log(socketUsers);
      } else {
        // find item with lodash .findindex
        const index = _.findIndex(socketUsers, { username: data.name });
        // Replace socket.id if username already exist in list
        socketUsers[index] = user;
        console.log("user exist already " + socketUsers);
      }
    });

    // Count Unread messages
    socket.on("checkUnreadMessages", data => {
      // Find unread messages for user(data.name)
      Conversation.aggregate([
        {
          $match: {
            participants: data.name
          }
        },
        { $unwind: "$messages" },
        {
          $match: {
            "messages.read": false,
            "messages.sender": { $ne: data.name }
          }
        },
        { $group: { _id: null, count: { $sum: 1 } } }
      ]).exec((err, res) => {
        console.log(res);
        if (res.length > 0 && res[0].count !== undefined) {
          Profile.findOneAndUpdate(
            { handle: data.name },
            { $set: { unreadMessageCount: res[0].count } },
            (err, res) => {
              if (res) {
                console.log(res);
                socket.emit("addUnreadMessageCount", {
                  count: res.unreadMessageCount
                });
              } else {
                console.log(err);
              }
            }
          );
        } else {
          Profile.findOneAndUpdate(
            { handle: data.name },
            { $set: { unreadMessageCount: 0 } },
            (err, res) => {
              if (res) {
                console.log(res);
                socket.emit("addUnreadMessageCount", {
                  count: res.unreadMessageCount
                });
              } else {
                console.log(err);
              }
            }
          );
        }
      });
    });

    //Private Messaging, gets message form data from client, emits it to sender/ reciever and saves to db
    socket.on("privateMessage", mesg => {
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
            },
            $set: {
              date: new Date()
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

              // If Reciever is not online we dont send to reciever
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

              // If Reciever is not online we dont send to reciever
              if (socketReciever !== undefined) {
                io.to(socketReciever.socketId).emit("addMessage", res);
              }
              io.to(socketSender.socketId).emit("addMessage", res);
            }
          }
        );
      });
    });

    // Read Message
    socket.on("readMessage", mesg => {
      const convoId = mesg.chatId;
      Conversation.findOneAndUpdate(
        { _id: mesg.chatId, "messages._id": mesg.id },
        { $set: { "messages.$.read": true } },
        { new: true }
      ).exec(function(err, user) {});
    });

    // Disconnects
    socket.on("disconnect", data => {
      console.log(data);
      console.log("disconnected" + toString(socket.id));
    });
  });
};

module.exports = socket;
