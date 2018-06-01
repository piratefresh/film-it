const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
// Login Social
require("./modules/User");
require("./authentication/google");
require("./authentication/facebook");

// Get Routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const messages = require("./routes/api/messages");

const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

// log every request to the console
app.use(morgan("dev"));
// Image
app.use(express.static(__dirname + "/public"));
/* app.use(cookieParser()); */
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to mongodb through mongoose
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Sets cookie with the unqiue google id
app.use(
  cookieSession({
    name: "googlesession",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// User model added to req object as req.user
//  Turns id into user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Passport config
require("./authentication/local")(passport);

// Routes
app.get("/", (req, res) => res.send("Hello!"));
// Use Routes
require("./routes/authRoutes")(app);
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/messages", messages);

io.on("connection", function(socket) {
  console.log("a user connected");
});

// Server init
const port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Server running on port: ${port}`));
