import * as getPalabra from './helpers/getPalabra.js';
import * as getLocation from './helpers/getLocation.js';
import * as getDepartamentos from './helpers/getDepartamentos.js';
import * as getCard from './helpers/card.js';

//Funciones
const elijoFiltro = () => {
    const rbIndividual = document.getElementById('filtroIndividual');
    const rbAnidado = document.getElementById('filtroAnidado');

    if (rbIndividual.checked) {
        btnSubmit.style.display = 'none';
        btnDepto.style.display = 'block';
        btnLocation.style.display = 'block';
        btnPalabra.style.display = 'block';
    } else if (rbAnidado.checked) {
        btnSubmit.style.display = 'block';
        btnDepto.style.display = 'none';
        btnLocation.style.display = 'none';
        btnPalabra.style.display = 'none';
    }
}

const evaluarFiltros = (filtro1, filtro2, filtro3, depto, local, palabra )=>  {
    if (filtro1 && filtro2 && filtro3) {
        url = `https://collectionapi.metmuseum.org/public/collection/v1/search?geoLocation=${ local }&q=${ palabra }&DepartmentId=${ depto }`
    } else if (filtro1 && filtro2 && !filtro3) {
        url = `https://collectionapi.metmuseum.org/public/collection/v1/search?geoLocation=${ local }&q=*&DepartmentId=${ depto }`
    } else if (filtro1 && !filtro2 && filtro3) {
        url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${ palabra }&DepartmentId=${ depto }`
    } else if (filtro1 && !filtro2 && !filtro3) {
       url = `https://collectionapi.metmuseum.org/public/collection/v1/objects?DepartmentId=${ depto }`
    } else if (!filtro1 && filtro2 && filtro3) {
       url = `https://collectionapi.metmuseum.org/public/collection/v1/search?geoLocation=${ local }&q=${ palabra }`
    } else if (!filtro1 && filtro2 && !filtro3) {
        url = `https://collectionapi.metmuseum.org/public/collection/v1/search?geoLocation=${ local }&q=*`
    } else if (!filtro1 && !filtro2 && filtro3) {
        url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${ palabra }`
    } else if (!filtro1 && !filtro2 && !filtro3) {
        //Ningun filtro seleccionado
    }
}

//referencias elementos HTML
//const elemForm = document.getElementById('form');
const spinner = document.getElementById('spinner');
//botones
const btnDepto = document.getElementById('btnBuscarDepto');
const btnLocation = document.getElementById('btnBuscarLacation');
const btnPalabra = document.getElementById('btnBuscarPalabra');
const btnSubmit = document.getElementById('btnSubmit');
//galeria
const galeria = document.getElementById('gallery');
//rb
const rbIndividual = document.getElementById('filtroIndividual');
const rbAnidado = document.getElementById('filtroAnidado');

//Carga de DDL y carga de array de dtos//ok
(async () => {
    try {
        await getDepartamentos.cargaDtosEnDdl();
    } catch (error) {
        console.error('Error al cargar los departamentos:', error);
    }
})();

//Escucho los cambios de estado en los rb
rbIndividual.addEventListener('change', elijoFiltro);
rbAnidado.addEventListener('change', elijoFiltro);

//Buscar por depto
btnDepto.addEventListener('click', async () => {

    galeria.innerHTML = '';
    spinner.style.display = 'block';

    const indice = document.getElementById('departmentSelect').selectedIndex;
    let depto = await getDepartamentos.departamentos[indice-1].displayName;

    console.log('el indice del depto seleccionado es: ' + indice);
    console.log('el nombre del depto seleccionado es: ' + depto);

    let museosFiltradosDepto = [];

    //Solo filtro de depto
    museosFiltradosDepto = await getDepartamentos.listarIdFiltrados(indice); //ok
    console.log(museosFiltradosDepto)

    getCard.crearCards(museosFiltradosDepto)

    //Oculto spinner
    spinner.style.display = 'none';
})
//Buscar por Location
btnLocation.addEventListener('click', async () => {

    galeria.innerHTML = '';
    spinner.style.display = 'block';

    const localizacion = document.getElementById('locationInput').value;
    let museosFiltradosLocal = [];

    museosFiltradosLocal = await getLocation.buscarPorLocalizacion(localizacion)
    console.log(museosFiltradosLocal)

    getCard.crearCards(museosFiltradosLocal)

    //Oculto spinner
    spinner.style.display = 'none';
})
//Buscar por palabra
btnPalabra.addEventListener('click', async () => {

    galeria.innerHTML = '';
    spinner.style.display = 'block';

    const palabra = document.getElementById('keywordInput').value;
    let museosFiltradosPalabra = [];

    museosFiltradosPalabra = await getPalabra.getIdPorPalabra(palabra);
    console.log(museosFiltradosPalabra)

    getCard.crearCards(museosFiltradosPalabra)

    //Oculto spinner
    spinner.style.display = 'none';

})


// Agrega un evento al formulario para el submit
btnSubmit.addEventListener('click', async (event)=> {

    event.preventDefault();
    //Muestro spinner
    spinner.style.display = 'block';

    //Elementos html
    const indice = document.getElementById('departmentSelect').selectedIndex;
    const localizacion = document.getElementById('locationInput').value;
    const palabra = document.getElementById('keywordInput').value;
    let filtro1 = false;
    let filtro2 = false;
    let filtro3 = false;

    if ( indice !== 0 ) {
        filtro1 = true;
    }
    if ( localizacion !== '' ) {
        filtro2 = true;
    }
    if ( palabra !== '' ) {
        filtro3 = true;
    }

    
    









    // obtener valor departamento//
    //let depto = await getDepartamentos.departamentos[indice].displayName;


    // console.log('el indice del depto seleccionado es: ' + indice);
    // console.log('el nombre del depto seleccionado es: ' + depto);

    //Array filtrados para mandar a card
    //let museosFiltradosDepto = [];
    // let museosFiltradosLocal = [];
    // let museosFiltradosPalabra = [];

    //Condicionales para ver la cantidad de filtros seleccionados

    //Solo filtro de depto
    // museosFiltradosDepto = await getDepartamentos.listarIdFiltrados(indice); //ok
    // console.log(museosFiltradosDepto)

    //Filtro por localizacion
    // museosFiltradosLocal = await getLocation.buscarPorLocalizacion( localizacion )
    // console.log(museosFiltradosLocal)

    //Filtro por palabra
    // museosFiltradosPalabra = await getPalabra.getIdPorPalabra(palabra);
    // console.log(museosFiltradosPalabra)

    getCard.crearCards(museosFiltradosPalabra)

    //Oculto spinner
    spinner.style.display = 'none';

})

//Consulta con todos los parametros ???
// const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${palabra}/search?geoLocation=${localizacion}&q=''/objects?departmentIds=${depto}}`


