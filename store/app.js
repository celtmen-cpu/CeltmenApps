const params = new URLSearchParams(window.location.search);

const id = params.get("id");


const app = apps.find(a => a.id === id);


const container = document.getElementById("app");



if(!app){


container.innerHTML = `

<div class="section">

<h1>Application introuvable</h1>

<p>Cette application n'existe pas.</p>

</div>

`;

}

else{


document.title = app.name + " - Celtmen Apps";



container.innerHTML = `


<div class="hero">


<img src="${app.image}" alt="${app.name}">


<div>

<h1>${app.name}</h1>

<p>${app.subtitle}</p>

<p>Par ${app.developer}</p>


<a class="button" href="${app.link}" target="_blank">

Obtenir

</a>


</div>


</div>




<div class="section">


<div class="info-grid">


<div class="info-box">

<strong>${app.age}</strong>

<br>

Âge

</div>



<div class="info-box">

<strong>${app.size}</strong>

<br>

Taille

</div>



<div class="info-box">

<strong>${app.version}</strong>

<br>

Version

</div>



</div>


</div>





<div class="section">


<h2>Captures d'écran</h2>


<br>


<div class="screens">


${app.screenshots.map(img => `

<img src="${img}" alt="Capture ${app.name}">

`).join("")}


</div>


</div>






<div class="section">


<h2>Description</h2>


<br>


<p>

${app.description}

</p>


</div>



`;

}
