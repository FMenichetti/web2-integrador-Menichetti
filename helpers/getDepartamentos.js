
//array de departamentos//ok
export let departamentos = [];
/**
 * Consulta Todos los departamentos
 * @returns array de deptos
 */
export const listarTodosId = async () => {
    //Obtengo los Objetos de los departamentos
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/departments`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();

    return data.departments;

}

/**
 * restriccion de que si no tiene imagen no lo cargo
 * tengo la busqueda limitada en este metodo
 * @param {*array de IDs} obj 
 * @returns array con objetos depsrtamentos completos
 */
export const getObjPorId = async ( obj ) => {
    try {
        let deptos = [];

        // Si los IDs son más de 0
        if (obj.length > 0) {
            for (let id of obj) {
                const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
                const respuesta = await fetch(url);
                const data = await respuesta.json();

                if (data.primaryImageSmall !== '') { //Si tiene imagen lo agrego
                    deptos.push(data); // Agrego el objeto completo al array
                }

                if ( deptos.length > 10) { //limito la busqueda
                    return deptos;
                    break;
                }
            }
            return deptos; // Devuelvo el array con todos los objetos
        } else {
            console.log('No se encontraron objetos.');
            return []; // Devuelvo un array vacío si no hay IDs
        }
    } catch (error) {
        console.error('Error al obtener los objetos por ID:', error);
    }
}

/**
 * Funcion que recibe id y en base a ese id trae todos los departamentos
 * Los departamentos se los pasa a getObjectId
 * @param {*num} id 
 * @returns array con objetos depsrtamentos completos
 */
export const listarIdFiltrados = async ( id ) => {
    try {
        const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${id}`;
        const respuesta = await fetch(url);
        const data = await respuesta.json();

        // Limitar a los primeros 20 IDs 
        //decidi limitarlo en objectPorId
        // const limitedObjectIDs = data.objectIDs.slice(0, 20);

        const deptosFiltrados = await getObjPorId(data.objectIDs);
        return deptosFiltrados; 
    } catch (error) {
        console.error('Error al listar los IDs filtrados:', error);
    }
}


/**
 * Funcion de Carga departamentos en DDL//ok
 */
export const cargaDtosEnDdl = async () => {
    try {
        //Nombre de departamentos para llenar DDL
        departamentos = await listarTodosId();//array de obj
        const elemDepartmentos = document.getElementById('departmentSelect');//id de select

        for (const departamento of departamentos) {
            const option = document.createElement('option');

            // Tomo el nombre para el DDL
            option.textContent = departamento.displayName;

            // Le agrego el valor de ID a la opcion
            option.value = departamento.departmentId;

            // Agrego la opción al select
            elemDepartmentos.appendChild(option);
        }
    }
    catch (error) {
        console.error('Error al cargar departamentos:', error);
    }
}