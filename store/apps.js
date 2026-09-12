const apps = [
  {
    id: "night-rush",
    name: "Night Rush",
    subtitle: "An awesome game",
    developer: "Celtmen",
    description: "An endless runner game with leaderboard, skins and more!!!",
    image: "https://raw.githubusercontent.com/celtmen-cpu/CeltmenApps/main/assets/source/Night%20Rush/logoNightRush.PNG",
    link: "../NightRush/",
    age: "4+",
    size: "89 Mo",
    version: "0.31",
    screenshots: [
      "https://raw.githubusercontent.com/celtmen-cpu/CeltmenApps/main/assets/source/Night%20Rush/ScreenShotGamePlay.jpeg",
      "https://raw.githubusercontent.com/celtmen-cpu/CeltmenApps/main/assets/source/Night%20Rush/ScreenShotSalon.png",
      "https://raw.githubusercontent.com/celtmen-cpu/CeltmenApps/main/assets/source/Night%20Rush/ScreenShotClassement.png"
    ]
  },
  {
    id: "havok-app",
    name: "HavoK App",
    subtitle: "A fan made app for Team HavoK",
    developer: "Alvin",
    description: "A fan made app for Team HavoK. It is not the official app.",
    image: "https://raw.githubusercontent.com/celtmen-cpu/CeltmenApps/main/assets/source/HavoKapp/Icon-havok-default.png",
    link: "https://github.com/celtmen-cpu/CeltmenApps/releases/download/1.1.0/havokAlvin.ipa",
    age: "4+",
    size: "14 Mo",
    version: "1.1.0",
    screenshots: [
      "https://raw.githubusercontent.com/celtmen-cpu/CeltmenApps/main/assets/source/HavoKapp/IMG_1087.jpeg",
      "https://raw.githubusercontent.com/celtmen-cpu/CeltmenApps/main/assets/source/HavoKapp/IMG_1088.jpeg",
      "https://raw.githubusercontent.com/celtmen-cpu/CeltmenApps/main/assets/source/HavoKapp/IMG_1089.jpeg",
      "https://raw.githubusercontent.com/celtmen-cpu/CeltmenApps/main/assets/source/HavoKapp/IMG_1090.jpeg"
    ]
  }
];

const container = document.getElementById("apps");
const searchInput = document.getElementById("search");

function renderApps(filter) {
  filter = filter || "";
  var query = filter.toLowerCase().trim();
  var filtered;
  if (query) {
    filtered = apps.filter(function(app) {
      return app.name.toLowerCase().indexOf(query) !== -1 ||
             app.subtitle.toLowerCase().indexOf(query) !== -1 ||
             app.developer.toLowerCase().indexOf(query) !== -1;
    });
  } else {
    filtered = apps;
  }

  if (filtered.length === 0) {
    container.innerHTML = '<p style="padding:20px;color:#6e6e73;font-size:16px;">Aucune application trouvée.</p>';
    return;
  }

  var html = "";
  for (var i = 0; i < filtered.length; i++) {
    var app = filtered[i];
    var page = "app.html?id=" + app.id;
    if (app.id === "night-rush") { page = "night-rush.html"; }
    if (app.id === "havok-app") { page = "havok-app.html"; }
    html += '<div class="app">' +
      '<img src="' + app.image + '" alt="' + app.name + '" loading="lazy">' +
      '<div class="info">' +
        '<h2>' + app.name + '</h2>' +
        '<p>' + app.subtitle + '</p>' +
        '<a class="button" href="' + page + '">Voir</a>' +
      '</div>' +
    '</div>';
  }
  container.innerHTML = html;
}

searchInput.addEventListener("input", function(e) {
  renderApps(e.target.value);
});

renderApps();