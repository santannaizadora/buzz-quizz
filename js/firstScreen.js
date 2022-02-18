startFirstScreen();

//iniciando tela 1
function startFirstScreen(){
    document.querySelector(".container").innerHTML = `
        <main class="first-screen">
            <section class="box-without-quizzes">
                <p>Você não criou nenhum quizz ainda :(</p>
                <button class="button-create-quizz" onclick="">Criar Quizz</button>
            </section>
            <section class="all-quizzes-list">
                <p>Todos os quizzes</p>
                <div class="all-quizzes">
                </div>
            </section>
        </main>
    `;
    fetchServerQuizzes();
}

//Buscando quizzes do servidor
function fetchServerQuizzes(){
    let promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(showQuizzes);
    
}
// mostrando os quizzes do servidor
function showQuizzes(response){
    const serverQuizzes = response.data; 
    console.log(response.data); //vendo a array de quizzes que ele retorna
    let quizzesList = document.querySelector(".all-quizzes");
    quizzesList.innerHTML = "";

    for(let i = 0; i < serverQuizzes.length; i++){
        quizzesList.innerHTML += `
        <article class="individual-quizz element${serverQuizzes[i].id}" onclick="createPost_T2(${serverQuizzes[i].id})">
            <img src="${serverQuizzes[i].image}" alt="${serverQuizzes[i].title}">
            <div class="shadow"></div> 
            <h1>${serverQuizzes[i].title}</h1>
        </article>
        `;
    }    
}

function loading(){
    document.querySelector(".container").innerHTML = `
    <div class="loading">
        <img src="./img/loading.gif" alt="loading gif">
        <h2>Carregando</h2>
    </div>
    `;
}
// //inserir as telas 2 e 3 dinamicamente
// //verificar com as meninas


// //inserir a tela 1 com os quizzes do usuario
// // caso já tenha criado os itens, deve substituir a section box-without-quizzes por esta aqui-->
// function startUserQuizzes() {
//     document.querySelector(".box-without-quizzes").innerHTML = `
//         <div class="user-quizzes-T1">
//             <p>Seus quizzes</p>
//             <ion-icon class="add-quizz-button" name="add-circle-sharp"></ion-icon>
//         </div>
//         <div class="all-quizzes"></div>
//     `;
//     fetchUserQuizzes();
// }    

// function fetchUserQuizzes(){
    // const listaSerializada = localStorage.getItem("lista"); // Pegando de volta a string armazenada na chave "lista"
//}

// function showUserQuizzes(){
//     let arrayUserQuizzes = [];
//     for (let i = 0; i<arrayUserQuizzes.length; i++){
//         let userQuizzId = document.getElementById(arrayUserQuizzes);
//         let serverQuizzId = document.getElementById(serverQuizzes[i]);
//         if (userQuizzId !== serverQuizzId){
//             document.querySelector(".all-user-quizzes").innerHTML += `
//             <article class="individual-quizz element${arrayUserQuizzes[i].id}" onclick="createPost_T2(${serverQuizzes[i].id})">
//                 <img src="${arrayUserQuizzes[i].image}" alt="${arrayUserQuizzes[i].title}">
//                 <div class="shadow"></div> 
//                 <h1>${arrayUserQuizzes[i].title}</h1>
//             </article>
//             `;
//         }
//     }
// }




//PARA ARMAZENAR OS QUIZZES DO USUARIO
// const exemplo = ["João", "Maria", "José"];  // Array que você quer salvar
// const exemploSerializado = JSON.stringify(exemplo); // Array convertida pra uma string

// localStorage.setItem("lista", exemploSerializado); // Armazenando a string na chave "lista" do Local Storage

// const listaSerializada = localStorage.getItem("lista"); // Pegando de volta a string armazenada na chave "lista"

// const lista = JSON.parse(listaSerializada); // Transformando a string de volta na array original

