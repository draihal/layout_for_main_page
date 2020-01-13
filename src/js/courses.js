const axios = require('axios');

const createCard = (course) => {
    // add courses details to `card`
    const divBeforeCard = document.createElement('div');
    divBeforeCard.className = 'col mb-4';

    const divCard = document.createElement('div');
    divCard.className = 'card .h-100 courses-card';
    divBeforeCard.appendChild(divCard);

    const divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';
    divCard.appendChild(divCardBody);

    const cardBodyTitle = document.createElement('h5');
    cardBodyTitle.className = 'card-title';
    cardBodyTitle.textContent = `${course.name}`;

    const urlCardBodyTitle = document.createElement('a');
    urlCardBodyTitle.setAttribute('href', `#`);
    urlCardBodyTitle.appendChild(cardBodyTitle);
    divCardBody.appendChild(urlCardBodyTitle);

    const cardBodyText = document.createElement('p');
    cardBodyText.className = 'card-text';
    cardBodyText.textContent = `${course.description}`;
    divCardBody.appendChild(cardBodyText);

    return divCard;
};

const appendToDOM = (courses) => {
    const coursesCards = document.querySelector('#courses-cards');
    //iterate over all courses
    courses.map(course => {
        coursesCards.appendChild(createCard(course));
    });
};

const fetchCourses = () => {
    axios.get('/api/v1/pages/courses/')
        .then(response => {
            const courses = response.data.results;
            // console.log(`GET list courses`, response, courses);
            // append to DOM
            appendToDOM(courses);
        })
        .catch(error => console.error(error));
};

fetchCourses();
