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
    console.log(response.data);
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