const url = "https://w-strapi-movies-app-9wxhf.ondigitalocean.app/api/movies";

const thisForm = document.getElementById('movieForm');
const formTitle = document.getElementById('title');
const formDescription = document.getElementById('description');
const formAuthor = document.getElementById('author');
const formYear = document.getElementById('year');
let available = document.getElementById('isAvailable');
const formAvailableError = document.getElementById('availableError');
const titleError = document.getElementById('titleError');
const submit = document.getElementById('submit');

thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (formTitle.value.length == 0) {
        titleError.classList.add("visible");
        formTitle.classList.add("invalid");
    } else if ('!available:checked') {
        formAvailableError.classList.add("visible");
    }

    if (available.value === 'true') {
        available = true
    }
    else {
        available = false
    };

    let movieData = {
        data: {
            title: formTitle.value,
            description: formDescription.value,
            author: formAuthor.value,
            year: formYear.value,
            available: available,
        },
    };

    const formData = new FormData(thisForm).entries();

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData)
    });

    const result = await response.json();
    console.log(response);
    console.log(result);
    
    if(response.status == 200) {
        movieAdded.classList.add("visible");
        movieAddedErr.classList.remove("visible");
        titleError.classList.remove("visible");
        formAvailableError.classList.remove("visible");
    } else if (response.status !== 200) {
        movieAddedErr.classList.add("visible");
    }
});

function resetFormFields() {
    window.location.reload(true);
}