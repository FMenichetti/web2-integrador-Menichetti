import * as getPalabra from './helpers/getPalabra.js';
import * as getLocation from './helpers/getLocation.js';
import * as getDepartamentos from './helpers/getDepartamentos.js';
import * as getCard from './helpers/card.js';


//Carga de DDL y carga de array de dtos//ok
(async () => {
    try {
        await getDepartamentos.cargaDtosEnDdl();
    } catch (error) {
        console.error('Error al cargar los departamentos:', error);
    }
})();

//referencias elementos HTML
//const elemForm = document.getElementById('form');
const spinner = document.getElementById('spinner');

// Agrega un evento al formulario para el submit
form.addEventListener('submit', async function (event) {

    event.preventDefault();
    //Muestro spinner
    spinner.style.display = 'block';

    //Elementos html
    const indice = document.getElementById('departmentSelect').selectedIndex;
    const localizacion = document.getElementById('locationInput').value;
    const palabra = document.getElementById('keywordInput').value;

    // obtener valor departamento//
    let depto = await getDepartamentos.departamentos[indice].displayName;


    console.log('el indice del depto seleccionado es: ' + indice);
    console.log('el nombre del depto seleccionado es: ' + depto);

    //Array filtrados para mandar a card
    let museosFiltradosDepto = [];
    let museosFiltradosLocal = [];
    let museosFiltradosPalabra = [];

    //Condicionales para ver la cantidad de filtros seleccionados

    //Solo filtro de depto
    // museosFiltradosDepto = await getDepartamentos.listarIdFiltrados(indice); //ok
    // console.log(museosFiltradosDepto)

    //Filtro por localizacion
    // museosFiltradosLocal = await getLocation.buscarPorLocalizacion( localizacion )
    // console.log(museosFiltradosLocal)

    //Filtro por palabra
    museosFiltradosPalabra = await getPalabra.getIdPorPalabra(palabra);
    console.log(museosFiltradosPalabra)


    getCard.crearCards(museosFiltradosPalabra)



    //Oculto spinner
    spinner.style.display = 'none';


})

//Consulta con todos los parametros ???
// const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${palabra}/search?geoLocation=${localizacion}&q=''/objects?departmentIds=${depto}}`


