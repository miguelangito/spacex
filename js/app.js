const container = document.querySelector(".container")
const containermodal = document.querySelector(".modal-body")

const URL = "https://api.spacexdata.com/v3/launches";
const respuesta = await fetch(URL);
const datos = await respuesta.json();
console.log(datos);
imprimirDatos(datos.slice(0, 50))

function imprimirDatos(datos) {
  datos.forEach((element) => {
    console.log(element);
    container.innerHTML += `
        <div class="g-col-4">
        <div class="card" style="width: 18rem;">
        <img src="${element.links.mission_patch}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${element.mission_name}</h5>
        <h6 class="card-title">${element.launch_year}</h6>
        <button type="button" id="btn-modal" class="btn btn-primary" data-bs-toggle="modal" data-id="${element.flight_number}" data-bs-target="#exampleModal">
        Specification
        </button>
        </div>
        </div>   
        `;
  });
}

document.querySelectorAll("#btn-modal").forEach(btn => {

  btn.addEventListener("click",async () => {

    const dataID = btn.getAttribute("data-id")
    const URL2 = `https://api.spacexdata.com/v3/launches/${dataID}`
    const respuesta = await fetch(URL2)
    const datosvi = await respuesta.json()

    containermodal.innerHTML = `
      <iframe src="http://www.youtube.com/embed//${datosvi.links.youtube_id}"autoplay class="video"></iframe>
      <table class="table">
      <thead>
      <tr>
      <th scope="col">Cohete</th>
      <th scope="col">Tipo</th>
      <th scope="col">Exito</th>
      </tr>
      </thead>
      <tbody class="table-group-divider">
      <tr>
      <td>${datosvi.rocket.rocket_name}</td>
      <td>${datosvi.rocket.rocket_type}</td>
      <td>${datosvi.launch_success}</td>
      </tr>
      </tbody>
      </table>
      `;
  })
})
