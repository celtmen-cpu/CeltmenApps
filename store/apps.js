container.innerHTML += `

<div class="app">


<img src="${app.image}" alt="${app.name}">


<div class="info">

<h2>${app.name}</h2>

<p>${app.subtitle}</p>


<a class="button" href="app.html?id=${app.id}">

Voir

</a>


</div>


</div>

`;