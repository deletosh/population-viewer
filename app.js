const USADATA_API_URL = 'https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest';
// ?drilldowns=Nation&measures=Population&year=latest

const searchInput = document.querySelector('#find-state');
const showStateEl = document.querySelector('#show-state');

// Testing the API that it returns the data we expect....
// fetch(USADATA_API_URL)
//     .then(res => res.json())
//     .then(ourData => {
//         console.log(ourData);
//         console.log(ourData.data);
//         console.log(ourData.source);
//     })
//     .catch(err => console.error(err));

// [[ Alaska ]]
searchInput.addEventListener('blur', async (event) => {
    // console.log(event.target.value);
    // console.log(searchInput.value);

    // we should get what the user types
    const state = await getStateData(event.target.value, '2020'); // { }


    showStateEl.innerHTML = ''
    // console.log(state);// {}
    // console.log(state);
    showStateData(state);
});

// const myData = await fetch('')
// fetch(USADATA_API_URL)
//     .then(res => res.json())
//     .then(ourData => {
//         console.log(ourData);
//         console.log(ourData.data);
//         console.log(ourData.source);
//     })
//     .catch(err => console.error(err));

// async / await
async function getStateData(stateName, year) {

    const response = await fetch(USADATA_API_URL);
    const stateObj = await response.json();

    const foundState = stateObj.data.filter(item => item.State === stateName);
    // return all the statistucs that matches Alaska
    // console.log(stateObj.data);
    // API????

    // console.log(foundState[0]);
    return foundState[0];
}

function showStateData(stateName) {

    const div = document.createElement('div');
    div.innerHTML = `
        <h2>${stateName.State}</h2>
        <h3>Population: ${stateName.Population}</h3>
        <h3>Year: ${stateName.Year}</h3>
    `;
``
    showStateEl.appendChild(div);

}
