const url = "https://w-strapi-movies-app-9wxhf.ondigitalocean.app/api/movies/";
const moviesTable = [];
let newMovie = '';
let tbody = document.querySelector('tbody');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');

async function loadMovies() {
   try {
      let res = await fetch(url);
      return await res.json();
   } catch (err) {
      console.log(err);
   }
}

async function renderMovies() {
   loadMovies().then(apiMovies => {
      apiMovies.data.forEach(movie => {
         moviesTable.push(movie);
         const availability = movie.attributes.available ? 'Dostępny' : 'Niedostępny';
         newMovie += `
                <tr id=${movie.id}>
                <td>${movie.id}</td>
                <td>${movie.attributes.title}</td>
                <td>${movie.attributes.author}</td>
                <td>${movie.attributes.year}</td>
                <td>${availability}</td>
                <td><button class="btn__modal" onclick="showModal">Szczegóły</button></td>       
                <td><button class="btn__delete" id="${movie.id}">Usuń</button></td>
            </tr>`;
      });
      tbody.innerHTML = newMovie;
      moviesTable.push(newMovie);

      const btns__delete = document.querySelectorAll(".btn__delete");

      for (let btn__delete of btns__delete) {
         btn__delete.addEventListener("click", () => {
            axios.delete(url + btn__delete.id);
            btn__delete.parentElement.parentElement.remove();
         });
      }
   })
}
renderMovies();

const showModal = function (modal) {
   const element = modal.target;
   const modalId = Number(element.parentElement.parentElement.id);
   if (element.classList.contains("btn__modal")) {
      const modalData = moviesTable.find(modal => modal.id === modalId);
      const {id, attributes: { title, author, year, available, description } } = modalData;
      const modalHTML = `
         <div class="modalContent">
         <p><span class="head">ID: </span>${id}</p>
         <p><span class="head">Tytuł:</span> ${title}</p>
         <p><span class="head">Autor:</span> ${author}</p>
         <p><span class="head">Rok:</span> ${year}</p>
         <p><span class="head">Dostępność:</span> ${available ? 'Dostępny' : 'Niedostępny'}</p>
         <p><span class="head">Opis:</span> ${description}</p>
         <td><button class="btn__close" id="btn__close">Zamknij</button></td>
         </div>
         `
      modalContent.innerHTML = modalHTML;
      const modal = document.getElementById('modal');
      modal.style.display = "block";

      const btnClose = document.querySelectorAll(".btn__close");
      for (let btn of btnClose) {
         btn.addEventListener("click", () => {
         modal.style.display = "none";
         });
      }

      window.onclick = (event) => {
         if (event.target == modal) {
            modal.style.display = "none";
         }
      };
   }
}

tbody.addEventListener('click', (event) => {
   showModal(event);
});
