//originaaaaaaaal

if(localStorage.getItem("userQuizzes") === null){
    let userQuizzesArray = [];
    let arraySerializada =JSON.stringify(userQuizzesArray);
    localStorage.setItem("userQuizzes", arraySerializada);
}

startFirstScreen();

//iniciando tela 1
function startFirstScreen(){
    let pegandoChave = localStorage.getItem("userQuizzes");
    let chaveDesserializada = JSON.parse(pegandoChave);
    document.querySelector(".container").innerHTML = `
        <main class="first-screen">
            <section class="quizzUser"></section>
            <section class="all-quizzes-list">
                <p>Todos os quizzes</p>
                <div class="all-quizzes">
                </div>
            </section>
        </main>
    `;
    fetchServerQuizzes();

    if (chaveDesserializada.length === 0 || localStorage.getItem("userQuizzes") === null){
        startFirstScreenWithoutUserQuizzes();
    } else {
        startUserQuizzes(chaveDesserializada);
    }
}

//Buscando quizzes do servidor
function fetchServerQuizzes(){
    let promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(showQuizzes);
    
}

// mostrando os quizzes do servidor
function showQuizzes(response){
    const serverQuizzes = response.data; 
    //console.log(response.data); //vendo a array de quizzes que ele retorna
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

function startFirstScreenWithoutUserQuizzes(){
    document.querySelector(".quizzUser").innerHTML = `
        <section class="box-without-quizzes">
            <p>Você não criou nenhum quizz ainda :(</p>
            <button class="button-create-quizz" onclick="enviarDadosQuizz();">Criar Quizz</button>
        </section> 
    `;
}

function loading(){
    document.querySelector(".container").innerHTML = `
        <div class="loading">
            <img src="./img/loading.gif" alt="loading gif">
            <h2>Carregando</h2>
        </div>
    `;
}

function startUserQuizzes(){
    document.querySelector(".quizzUser").innerHTML = `
        <div class="user-quizzes-T1">
            <p>Seus quizzes</p>
            <ion-icon class="add-quizz-button" name="add-circle-sharp"  onclick=""></ion-icon>
        </div>
        <div class="all-user-quizzes"></div>
    `;
    showUserQuizzes();
}  

function showUserQuizzes(arrayUserQuizzes){
    for (let i = 0; i<arrayUserQuizzes.length; i++){
        document.querySelector(".all-user-quizzes").innerHTML += `
            <article class="individual-quizz element${arrayUserQuizzes[i].id}" onclick="createPost_T2(${serverQuizzes[i].id})">
                <img src="${arrayUserQuizzes[i].image}" alt="${arrayUserQuizzes[i].title}">
                <div class="shadow"></div> 
                <h1>${arrayUserQuizzes[i].title}</h1>
            </article>
        `;
    }
}





//PARA ARMAZENAR OS QUIZZES DO USUARIO
// const exemplo = ["João", "Maria", "José"];  // Array que você quer salvar
// const exemploSerializado = JSON.stringify(exemplo); // Array convertida pra uma string

// localStorage.setItem("lista", exemploSerializado); // Armazenando a string na chave "lista" do Local Storage

// const listaSerializada = localStorage.getItem("lista"); // Pegando de volta a string armazenada na chave "lista"

// const lista = JSON.parse(listaSerializada); // Transformando a string de volta na array original

