const USADATA_API_URL = 'https://datausa.io/api/data?drilldowns=State&measures=Population'
    //'&year=latest';
// ?drilldowns=Nation&measures=Population&year=latest

const searchInput = document.querySelector('#find-state');
const showStateEl = document.querySelector('#show-state');

searchInput.addEventListener('blur', async (event) => {
    const states = await getStateData(event.target.value, '2020');
    showStateEl.innerHTML = ''

    // 1. v0.75 = state: {}
    // showStateData(state);

    // 2. state: []
    // console.log(state);
    states.forEach( aState => showStateData(aState) )
});

// async / await
async function getStateData(stateName, year) {

    const response = await fetch(USADATA_API_URL);
    const stateObj = await response.json();

    const foundState = stateObj.data.filter(item => item.State === stateName);


    return foundState;
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
