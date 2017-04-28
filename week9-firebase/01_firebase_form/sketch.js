
var database;

var popupCoachData = {
  title: {
    "it-IT": "",
    "en-US": "",
    "de-DE": "",
    "es-ES": ""
  },
  webLink: {
    "it-IT": ""
  },
  cta: "false",
  ctaLink: {
    "it-IT": ""
  },
  ctaText: {
    "it-IT": ""
  },
  description: {
    "it-IT": ""
  },
  enable: true,
  img: "",
  repeat: 1,
  repeatTime: 10,
  startDate: "",
  endDate: ""
};

function setup() {

  var config = {
    apiKey: "AIzaSyAbrkbRGy78jECUfEaIDg8xrI_-PQ6FKso",
    authDomain: "spintrainer-test.firebaseapp.com",
    databaseURL: "https://spintrainer-test.firebaseio.com",
    projectId: "spintrainer-test",
    storageBucket: "spintrainer-test.appspot.com",
    messagingSenderId: "55154703846"
  };
  firebase.initializeApp(config);
  database = firebase.database();

  var submit = select('#submit');
  submit.mousePressed(sendToFirebase);

  loadFirebase();
}

function loadFirebase() {
  var ref = database.ref("popupCoach");
  ref.on("value", gotData, errData);
}

function errData(error) {
  console.log("Something went wrong.");
  console.log(error);
}

function gotData(data) {

  var popupCoach = data.val();

  var titleItIT = document.getElementById("title_it-IT");
  titleItIT.textContent = popupCoach.title["it-IT"];
  var titleEnUS = document.getElementById("title_en-US");
  titleEnUS.textContent = popupCoach.title["en-US"];
  var titleEsES = document.getElementById("title_es-ES");
  titleEsES.textContent = popupCoach.title["es-ES"];
  var titledeDE = document.getElementById("title_de-DE");
  titledeDE.textContent = popupCoach.title["de-DE"];

  popupCoachData.title["it-IT"] = popupCoach.title["it-IT"];
  popupCoachData.title["en-US"] = popupCoach.title["en-US"];
  popupCoachData.title["es-ES"] = popupCoach.title["es-ES"];
  popupCoachData.title["de-DE"] = popupCoach.title["de-DE"];

}


function sendToFirebase() {

  popupCoachData.title["it-IT"] = select('#title_it-IT').value();
  popupCoachData.title["en-US"] = select('#title_en-US').value(); 
  popupCoachData.title["es-ES"] = select('#title_es-ES').value();
  popupCoachData.title["de-DE"] = select('#title_de-DE').value(); 

  firebase.database().ref('popupCoach').update(popupCoachData);

  function finished(err) {
    if (err) {
      console.log("ooops, something went wrong.");
      console.log(err);
    } else {
      console.log('Data saved successfully');
    }
  }
}
