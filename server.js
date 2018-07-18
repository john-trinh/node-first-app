var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var methodOverride = require("method-override");
var cors = require("cors");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);
const seatConfig = {
  x: 12,
  y: 8
};
let defaultDb = {
  meeting: [
    {
      id: "sapa",
      name: "Sapa",
      img: "/assets/imgs/sapa.jpg",
      status: 1
    },
    {
      id: "cantho",
      name: " Can Tho",
      img: "/assets/imgs/cantho.jpg",
      status: 1
    }
  ],
  booking: [
    {
      room: "cantho",
      start: "9:00",
      end: "9:30",
      title: "Brie daily meeting",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam reiciendis accusantium incidunt saepe facilis illum adipisci.",
      author: "nguyen.tlc"
    },
    {
      room: "cantho",
      start: "10:00",
      end: "10:30",
      title: "OC3 Leaders meeting",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam reiciendis accusantium incidunt saepe facilis illum adipisci.",
      author: "an.lam"
    },
    {
      room: "cantho",
      start: "10:45",
      end: "11:45",
      title: "Brie FE team internal meeting",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam reiciendis accusantium incidunt saepe facilis illum adipisci.",
      author: "tan.vo"
    },
    {
      room: "sapa",
      start: "13:30",
      end: "14:00",
      title: "SU1 meeting",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam reiciendis accusantium incidunt saepe facilis illum adipisci.",
      author: "someone.surname"
    },
    {
      room: "sapa",
      start: "16:00",
      end: "17:30",
      title: "Meeting something for some other things",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam reiciendis accusantium incidunt saepe facilis illum adipisci.",
      author: "holy moly fucking asshole"
    }
  ],
  staff: [],
  config: {
    project: [
      {
        text: "BRIE",
        value: "brie"
      },
      {
        text: "OC3",
        value: "oc3"
      },
      {
        text: "Sale Agent",
        value: "sag"
      }
    ],
    role: [
      {
        text: "Frontend Developer",
        value: "fe"
      },
      {
        text: "Frontend Team Leader",
        value: "fetl"
      },
      {
        text: "Backend Developer",
        value: "be"
      },
      {
        text: "Backend Team Leader",
        value: "betl"
      },
      {
        text: "QC",
        value: "qc"
      },
      {
        text: "QC Team Leader",
        value: "qctl"
      },
      {
        text: "Backend Team Leader",
        value: "betl"
      },
      {
        text: "Architect",
        value: "ar"
      },
      {
        text: "Project Manager",
        value: "pm"
      }
    ]
  }
};
let seatArray = [];
let i = 0,
  j = 0;
while (i < seatConfig.x) {
  j = 0;
  let rowArray = [];
  while (j < seatConfig.y) {
    rowArray.push({
      status: 0,
      x: parseInt(i),
      y: parseInt(j)
    });
    j++;
  }
  seatArray.push(rowArray);
  i++;
}
defaultDb.seat = seatArray;
db.defaults(defaultDb).write();

var app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cors());

var langApi = require("./api/lang");
var encryptApi = require("./api/encrypt");
var loginApi = require("./api/login");
var changePasswordApi = require("./api/changePassword");
var resetUserApi = require("./api/resetUser");
global.users = require("./data/user");

// Auth - loginUser
// http://tgt-api-docs.herokuapp.com/#api-Auth-PostEndpointApiLogin
app.post("/api/login", loginApi.login);

// User - changePassword
// http://tgt-api-docs.herokuapp.com/#api-User-PutEndpointApiUserPassword
app.post("/api/user/password", changePasswordApi.changePassword);

//Utility - encrypt
// http://tgt-api-docs.herokuapp.com/#api-Utility-PostEndpointApiUtilsEncrypt
app.post("/api/utils/encrypt", encryptApi.encrypt);

//lang
app.get("/api/lang", langApi.lang);

app.get("/api/listroom", function(req, res) {
  let listRoom = db.get("meeting").value();
  res.json(listRoom);
});

app.get("/api/listmeeting", function(req, res) {
  let listMeeting = db
    .get("booking")
    .filter({ room: req.query.room })
    .value();
  console.log(req.query);
  res.json(listMeeting);
});

app.get("/api/config", function(req, res) {
  let config = db.get("config").value();
  res.json(config);
});

app.post("/api/bookmeeting", function(req, res) {
  let booking = {
    room: req.body.room,
    start: req.body.start,
    end: req.body.end,
    title: req.body.title,
    description: req.body.description,
    author: req.body.author
  };
  console.log(booking);
  db.get("booking")
    .push(booking)
    .write();
  res.json(
    db
      .get("booking")
      .filter({ room: req.body.room })
      .value()
  );
});

app.post("/api/addstaff", function(req, res) {
  let staff = {
    name: req.body.name,
    email: req.body.email,
    user: req.body.user,
    project: req.body.project,
    role: req.body.role,
    serviceUnit: req.body.serviceUnit,
    phone: req.body.phone,
    skype: req.body.skype,
    coordinates: {
      x: parseInt(req.body.coordinatesX),
      y: parseInt(req.body.coordinatesY)
    },
    avatar: req.body.avatar
  };
  console.log(staff);
  db.get("seat")
    .nth(parseInt(req.body.coordinatesX))
    .nth(parseInt(req.body.coordinatesY))
    .assign({
      status: 1,
      x: parseInt(req.body.coordinatesX),
      y: parseInt(req.body.coordinatesY),
      user: req.body.user
    })
    .write();
  db.get("staff")
    .push(staff)
    .write();
  res.json(staff);
});

app.get("/api/getallstaff", function(req, res) {
  res.json(db.get("staff").value());
});

app.get("/api/getstaff", function(req, res) {
  if (req.query) {
    res.json(
      db
        .get("staff")
        .filter(req.query)
        .value()
    );
  }
});

app.get("/api/seat", function(req, res) {
  res.json(db.get("seat").value());
});

app.post("/api/updatestaff", function(req, res) {
  let staff = {
    name: req.body.name,
    email: req.body.email,
    user: req.body.user,
    project: req.body.project,
    role: req.body.role,
    serviceUnit: req.body.serviceUnit,
    phone: req.body.phone,
    skype: req.body.skype,
    coordinates: {
      x: parseInt(req.body.coordinatesX),
      y: parseInt(req.body.coordinatesY)
    },
    avatar: req.body.avatar
  };
  db.get("staff")
    .find({ user: req.body.user })
    .assign(staff)
    .write();
  res.json(staff);
});

// User - resetUser
// http://tgt-api-docs.herokuapp.com/#api-User-GetEndpointApiUserResetId
app.get("/api/user/reset/:userId", resetUserApi.resetUser);

// app.all('/oauth/token', app.oauth.getAccessToken());
app.get("/", function(req, res) {
  app.oauth.token(request, {}, () => {
    console.log("abc");
  });
  res.send("Secret area");
});

app.listen(process.env.PORT || 3000);
