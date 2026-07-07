const apps = [

{
    id: "night-rush",
    name: "Night Rush",
    subtitle: "Jeu d'action rapide",
    developer: "Celtmen",
    version: "1.0",
    size: "82 Mo",
    age: "12+",
    description: "Night Rush est un jeu d'action où vous devez survivre le plus longtemps possible.",
    image: "https://celtmen-cpu.github.io/Night-Rush/assets/logoNightRush2.PNG",
    screenshots: [
        "https://celtmen-cpu.github.io/Night-Rush/assets/screenshot1.png",
        "https://celtmen-cpu.github.io/Night-Rush/assets/screenshot2.png"
    ],
    link: "https://celtmen-cpu.github.io/Night-Rush/"
},

{
    id: "havok",
    name: "HavoK",
    subtitle: "Application fan",
    developer: "AlvinDev",
    version: "1.0",
    size: "25 Mo",
    age: "4+",
    description: "Une version fan de l'application HavoK.",
    image: "app2.png",
    screenshots: [
        "app2.png"
    ],
    link:"#"
}

];


const container = document.getElementById("apps");
const search = document.getElementById("search");


function afficherApps(liste){


container.innerHTML = "";


if(liste.length === 0){

container.innerHTML = `

<div class="section">

<h2>Aucune application trouvée</h2>

</div>

`;

return;

}



liste.forEach(app => {


container.innerHTML += `

<div class="app">


<img src="${app.image}" alt="${app.name}">


<div class="info">

<h2>${app.name}</h2>

<p>${app.subtitle}</p>

</div>


<a class="button" href="app.html?id=${app.id}">

Voir

</a>


</div>

`;


});


}



afficherApps(apps);



search.addEventListener("input", () => {


const texte = search.value.toLowerCase();



const resultats = apps.filter(app =>

app.name.toLowerCase().includes(texte) ||

app.subtitle.toLowerCase().includes(texte) ||

app.description.toLowerCase().includes(texte)

);



afficherApps(resultats);


});