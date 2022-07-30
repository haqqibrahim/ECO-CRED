// IMPORT MODULES
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const PORT = process.env.PORT || 3000;
const app = express();

const User = require("./models/Users");
const GreenProjects = require("./models/GreenProjects");
const Project = require("./models/Projects");

mongoose.connect(
  "mongodb+srv://haqq:haqq0000@cluster0.3goht.mongodb.net/?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);

// SETTING UP SESSION
app.use(
  session({
    secret: "This is the secret",
    resave: false,
    saveUninitialized: false,
  })
);

// PASSPORT CONFIGURATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(Project.createStrategy());
passport.serializeUser(function (project, done) {
  done(null, project);
});
passport.deserializeUser(function (project, done) {
  done(null, project);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// ROUTES
app.get("/", (req, res) => {
  res.render("home");
});

// GREEN PROJECT ROUTES
app.get("/green-project-register", (req, res) => {
  res.render("project-register");
});

app.post("/green-project-register", (req, res) => {
  const green_project = new GreenProjects({
    project_name: req.body.project_name,
    email: req.body.email,
    admin_name: req.body.admin_name,
    admin_email: req.body.admin_email,
    about_your_project: req.body.about_your_project,
    my_total_token_amount: 0,
    my_token_amount_withdrawn: 0,
    my_current_token_amount: 0,
  });
  green_project.save().then((result) => {
    res.redirect("/green-project-dashboard");
  });
});

app.get("/green-project-dashboard", (req, res) => {
  res.render("project-dashboard");
});

// USER ROUTES
app.get("/user-register", (req, res) => {
  res.render("user-register");
});
app.post("/user-register", (req, res) => {
  Project.register(
    {
      username: req.body.username,
      fullname: req.body.fullname,
      carbon_goal: req.body.carbon_goal,
      my_total_token_amount: 0,
      my_token_amount_sold: 0,
      my_current_token_amount: 0,
    },
    req.body.password,
    (err, project) => {
      if (err) {
        console.log(err);
        res.redirect("/project-register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/user-dashboard");
          console.log(project.username);
          console.log("Project registered");
        });
      }
    }
  );
});
app.get("/success", (req, res) => {
  res.render("success");
});
// app.post("/verify", (req, res) => {
//   Project.findOne({ username: req.body.username }, (err, project) => {
//     if (err) {
//       console.log(err);
//       res.redirect("/verify");
//     } else {
//       project.my_total_token_amount += 1;
//       project.save();
//       res.redirect("/user-dashboard");
//     }
//   });
// });

// prject signin
app.get("/user-signin", (req, res) => {
  res.render("user-signin");
  //   res.render("project-signin");
});

app.post("/user-signin", (req, res) => {
  const project = new Project({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(project, (err) => {
    if (err) {
      console.log(err);
      res.redirect("/user-signin");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/user-dashboard");
        console.log("User signed in");
      });
    }
  });
});
// project dashboard
app.get("/user-dashboard", (req, res) => {
  res.render("user-dashboard", { user: req.user });
});

// logout
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

// LISTENER
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
