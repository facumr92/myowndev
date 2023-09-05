const poke_todos = document.getElementById("poke-todos");
let url = "https://pokeapi.co/api/v2/pokemon/";
const botones_tipos= document.querySelectorAll("button");
const btn_buscador= document.getElementById("poke-buscar");
const input_buscar= document.getElementById("poke-input");
const elemento_error= document.getElementById("error-no-encontrado");


for (let i = 1; i <= 151; i++) {


    fetch(url + i).then((response) => response.json()).then(data => mostrarPokemon(data))

}

function mostrarPokemon(objeto_pokemon) {

    let tipos = objeto_pokemon.types.map(type => `<p class="${
        type.type.name
    } tipos">${
        type.type.name
    }</p>`);
    tipos = tipos.join('');
   // console.log(tipos);


    const div = document.createElement("div");
    div.classList.add("poke-card");
    div.innerHTML = `
    <div class="poke-card">
        <div></div>
        <div class="poke-id-nombre">
            <p class="poke-id"># ${
        objeto_pokemon.id
    }</p>
            <p class="poke-nombre"> ${
        objeto_pokemon.name
    } </p>
        </div>
        <img src="${
        objeto_pokemon.sprites.other["official-artwork"].front_default
    }" alt="${
        objeto_pokemon.name
    }" srcset="" class="poke-img">
        <div class="poke-tipo">
            ${tipos}
        </div>
        <div class="poke-datos">
            <p class="tipo">${
        objeto_pokemon.weight
    } kg</p>
            <p class="tipo">${
        objeto_pokemon.height
    } m</p>
        </div>
    </div>
`;
    poke_todos.append(div);
}

botones_tipos.forEach(boton=> boton.addEventListener('click', (event)=>{

    const id_boton= event.currentTarget.id;
     console.log(id_boton);

    poke_todos.innerHTML="";
    for (let i = 1; i <= 151; i++) {


        fetch(url + i)
        .then((response) => response.json())
        .then(data => {

            if(id_boton==="todos"){
                mostrarPokemon(data);
            } else{
             const tipos = (data.types.map(type => type.type.name));
             if(tipos.some(tipo=> tipo.includes(id_boton))){

                mostrarPokemon(data);  
            }
             }
        });
       
    }
}))

btn_buscador.addEventListener("click", () => {
    const nombre = input_buscar.value;
    console.log(nombre);
    poke_todos.innerHTML="";
    let encontrado=false;


    for (let i = 1; i <= 151; i++) {

        fetch(url + i)
        .then((response) => response.json())
        .then(data => {
        let busqueda=(data.name).toLowerCase(); 
        if ((busqueda === nombre)){
            encontrado=true;
            mostrarPokemon(data);
    }   
 });
}
      if(!encontrado){

        elemento_error.classList.add("mensaje-error");
        elemento_error.innerText=`No se encontro el pokemon ${nombre}`;
        input_buscar.value="";
        
        setTimeout(()=>{
            elemento_error.remove("mensaje-error")},2000 );
  
    }
  



});
