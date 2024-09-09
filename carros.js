Parse.initialize("ziF0QzwENpNeDImCmQ6BicKnwIB2dYCO035Em9pL", "9Pz6oMi7vMZOZNB7i68s4vJq2TFxR6qEZsSJp6id");
Parse.serverURL = 'https://parseapi.back4app.com/';

const carForm = document.getElementById('carForm');
const carList = document.getElementById('carList');

// Função para buscar carros
async function fetchCars() {
    const Car = Parse.Object.extend('Carros');
    const query = new Parse.Query(Car);
    try {
        const results = await query.find();
        carList.innerHTML = '';
        results.forEach((car) => {
            const carElement = document.createElement('div');
            carElement.innerText = `${car.get('modelo')} - ${car.get('cor')} - ${car.get('ano')} - R$${car.get('valor')}`;
            carList.appendChild(carElement);
        });
    } catch (error) {
        alert('Erro ao buscar carros: ' + error.message);
    }
}

// Função para adicionar um carro
carForm.addEventListener('post', async (event) => {
    event.preventDefault();
    const modelo = document.getElementById('modelo').value;
    const cor = document.getElementById('cor').value;
    const ano = parseInt(document.getElementById('ano').value);
    const valor = parseFloat(document.getElementById('valor').value);

    const Car = Parse.Object.extend('Carros');
    const car = new Car();
    car.set('modelo', modelo);
    car.set('cor', cor);
    car.set('ano', ano);
    car.set('valor', valor);

    try {
        await car.save();
        alert('Carro adicionado com sucesso');
        fetchCars();
    } catch (error) {
        alert('Erro ao adicionar carro: ' + error.message);
    }
});

// Carregar carros ao abrir a página
fetchCars();
