//SELECT PART
//API PART
// alert('Click on a country for more information')
async function Data() {
    let req = await fetch('https://restcountries.com/v2/all')
    let res = await req.json()
    renderData(res)
}
Data()




renderData()
//FUNCTIONS PART
function renderData(array=[]) {
    if(array.length==0){
        $('.card-wrapper').innerHTML = `<span class="loader1"></span>`
    }else{
    $('.card-wrapper').innerHTML = ''
    array.forEach(e => {
        let card = createElement('div', 'cards', `
        <img src="${e.flags.png}" alt="${e.name}">
        <h4>${e.name}</h4>
        <p>${(e.capital) ? e.capital : 'No capital'}</p>
        <p>${e.population} peoples</p> 
        `);
        $('.card-wrapper').appendChild(card);
        card.addEventListener('click', () => {
            modal(e)
        })
        $('.close').addEventListener('click', () => {
            $('.modal-wrapper').classList.add('none')

        })
    })
}
}
//OTHERS PART

function modal(e) {

    $('.nameC').innerHTML = ''
    $('.nameC').innerHTML = `${e.name}`
    $('.m-body').innerHTML = ''
    $('.m-body').innerHTML = `
    <p>Native name : <strong>${e.nativeName}</strong>  </p>
    <p>Borders : <strong>${(e.borders) ? e.borders : 'None'}</strong></p>
    <p>Region : <strong>${(e.region) ? e.region : 'None'}</strong></p>
    <p>Area : <strong>${e.area} km²</strong></p>
    <p>Phone code : <strong>${(e.callingCodes) ? "+" + e.callingCodes : None}</strong></p>
    <p>Population : <strong>${e.population} peoples</strong></p>
    <p>Time zone : <strong>${e.timezones}</strong></p>
    <p>Demonym : <strong>${(e.demonym == 'Uzbekistani') ? 'Uzbek' : e.demonym}</strong></p>
    <p>Currencies : <strong>${e.currencies[0].code}-${e.currencies[0].name}</strong></p>
    <p>Languages :<strong> ${e.languages.map(e => { return " " + e.name + " " })} </strong></p>
    `
    $('.modal-wrapper').classList.remove('none')
}

//SEARCH
$('.search').addEventListener('input', () => {
    renderData()

    let val = $('.search').value

    if (val.toUpperCase().trim()) {
        dataS(val.toUpperCase().trim())
    } else {
        Data()
    }
})


//API BY NAME

async function dataS(name) {
    let req = await fetch(`https://restcountries.com/v2/name/${name}`)
    let res = await req.json()
    if (req.status == 200) {
        renderData(res)
    } else {
        $('.card-wrapper').innerHTML = `
        <div class="note">
        <span class="loader"></span>
        <h2>Country not found</h2>
        </div>`
    }
}

