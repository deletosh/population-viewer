const USADATA_API_URL = 'https://datausa.io/api/data?drilldowns=State&measures=Population';
//'&year=latest';
// ?drilldowns=Nation&measures=Population&year=latest

const searchInput = document.querySelector('#find-state');
const showStateEl = document.querySelector('#show-state');

searchInput.addEventListener('blur', async (event) => {
    const states = await getStateData(event.target.value, '2020');
    showStateEl.innerHTML = '';

    states.forEach(aState => showStateData(aState));
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

    showStateEl.appendChild(div);

}

async function getStatePopulation(year = 'latest') {
    const res = await fetch(`${USADATA_API_URL}&year=${year}`);
    const {data} = await res.json();

    // const states = data.map(state => {
    //     return state.State;
    // });
    const states = data.map(state => state.State);

    // const population = data.map(state => {
    //     return state.Population;
    // });
    const population = data.map(state => state.Population);

    // const newObj = {
    //     states: ['ededed','23343','233'],
    //     population: [1,2,2,4,5]
    // }

    // return {states: states, population: population};
    return {states, population};
}

// console.log(myObject);
(async () => {

// Draw charts
/// ### business logic::
    const {states} = await getStatePopulation();
    const {population} = await getStatePopulation(); // ?? getPopulation() // array

    // const labels = states; // states

    const data = {
        labels: states,
        datasets: [{
            label: 'Population by States',
            // backgroundColor: 'rgb(255, 99, 132)',
            // borderColor: 'rgb(255, 99, 132)',
            data: population, // population
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {}
    };


    const myChart = new Chart(
        document.getElementById('states-chart'),
        config
    );
})();



