

// Simulando la respuesta de la API con los datos de los objetos
const objetosDeArte = [
    {
        title: "One-dollar Liberty Head Coin",
        culture: "",
        dynasty: "",
        primaryImageSmall: "", // Reemplaza con la URL de la imagen si existe
    },
    // Otros objetos...
];

// Función para crear y agregar las cards al contenedor
export function crearCards(objetos) {

    const gallery = document.getElementById('gallery');

    if (!objetos || objetos.length === 0) {
        let error = document.createElement('h3')
        error.textContent = "No se encontraron datos para su busqueda"
        gallery.appendChild(error);

    } else {

        objetos.forEach(objeto => {
            // Crear el contenedor principal de la card
            const cardCol = document.createElement('div');
            cardCol.className = 'col';

            const card = document.createElement('div');
            card.className = 'card h-100';

            // Crear el elemento img para la imagen de la card
            const img = document.createElement('img');
            img.className = 'card-img-top';
            img.src = objeto.primaryImageSmall || 'https://via.placeholder.com/150';
            img.title = objeto.title;

            // Crear el cuerpo de la card
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            // Crear el título de la card
            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.textContent = objeto.title;

            // Crear el texto para la cultura
            const cardCulture = document.createElement('p');
            cardCulture.className = 'card-text';
            cardCulture.textContent = `Cultura: ${objeto.culture || 'N/A'}`;

            // Crear el texto para la dinastía
            const cardDynasty = document.createElement('p');
            cardDynasty.className = 'card-text';
            cardDynasty.textContent = `Dinastía: ${objeto.dynasty || 'N/A'}`;

            // Agregar los elementos al cuerpo de la card
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardCulture);
            cardBody.appendChild(cardDynasty);

            // Agregar la imagen y el cuerpo a la card
            card.appendChild(img);
            card.appendChild(cardBody);

            // Agregar la card al contenedor de la columna
            cardCol.appendChild(card);

            // Agregar la columna con la card al contenedor principal de la galería
            gallery.appendChild(cardCol);
        });
    }
}
