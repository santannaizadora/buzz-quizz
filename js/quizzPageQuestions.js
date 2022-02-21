//Inicialização das variáveis globais

let arrayId = [];
let arrayCorrectWrong = [];
let booleanContainerAnswers = [];
let containerAnswers = [];
let answersContainer = [];
let contArrayCorrectWrong = 0;
let contUserAnswer = 0;
let auxarrayCorrectWrong = arrayCorrectWrong;
let contClicked = 0;
let idClicked = 0;
let auxScrollingQuestions = 0;

// Obtendo informações de todos os Quizzes

let infoAllQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");

// Função que interliga as telas 1 e 3 com a tela 2 -- obtem o id do quizz desejado  
function createPost_T2(idQuizz){

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    // limpa a variável global quando chama a função e atribui o valor do id do quizz clicado
    idClicked = 0;
    idClicked = idQuizz;
    
    // pega a promessa do get de quizzes
    infoAllQuizz.then(showQuizzes);

    // Mostrando a tela 2 quando a tela 1 ou 3 chama a função
    let back = document.getElementById("mainT2");
    back.classList.remove("resultHidden_T2");
    
    // Integração com a tela 1 -- quando chama essa função
    let home = document.querySelector(".container");
    home.classList.add("resultHidden_T2");
}

// Função para obter infos dos quizzes
function showQuizzes(messageAllQuizz) {

    // limpando variáveis
    arrayId = [];
    booleanContainerAnswers = [];
    containerAnswers = [];
    arrayCorrectWrong = [];

    answersContainer = [];
    contArrayCorrectWrong = 0;
    contUserAnswer = 0;
    auxarrayCorrectWrong = arrayCorrectWrong;
    contClicked = 0;
    auxScrollingQuestions = 0;

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    
    idQuizz = messageAllQuizz.data;
    
    for (let i = 0; i < idQuizz.length; i++) {
        arrayId[i] = idQuizz[i].id;
    }
    
    // Obtendo info do Quizz clicado
    let infoOneQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idClicked}`);
    infoOneQuizz.then(processAxiosAnswer)

    // Recebendo os dados do get enviados pelo servidor
    function processAxiosAnswer(messageOneQuizz) {
        dataAnswerAxios = messageOneQuizz.data;
        createPostQuizz(dataAnswerAxios);
    }

}

// Função para criar o Quizz na tela
function createPostQuizz(dataAnswerAxios) {

    // Array booleano para controlar o clique na resposta
    for (let i = 0; i < dataAnswerAxios.questions.length; i++) {
        booleanContainerAnswers.push(true);
    }

    //Identificação das classes para atribuição no local correto
    let oneQuizzTitle = document.querySelector(".quizzTitleT2");
    let quizzContainerAll = document.querySelector(".containerQuizz");
    let quizzQuestions = "";

    oneQuizzTitle.innerHTML = "";
    quizzContainerAll.innerHTML = "";
    
    //Atribuindo o título do Quizz
    oneQuizzTitle.innerHTML += `<p>${dataAnswerAxios.title}</p>`

    //Atribuindo a img de background do Quizz
    oneQuizzTitle.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${dataAnswerAxios.image}')`;
    
        //Percorrendo as questões
        for(let i = 0; i < dataAnswerAxios.questions.length; i++){
            
            //Deixando as questões aleatórias
            dataAnswerAxios.questions[i].answers.sort(randQuestions);

            //Percorrendo as respostas de cada questão
            for(let j = 0; j < dataAnswerAxios.questions[i].answers.length; j++){
                
                containerAnswers[i] = dataAnswerAxios.questions[i].answers.length;
                quizzQuestions += `
                                                        <div data-identifier="answer" class="subBlockAnswer" id="block${i}_answer${j}" onclick="selectAnswer(this,'${i}')">
                                                            <img src="${dataAnswerAxios.questions[i].answers[j].image}" alt="">
                                                            <p>${dataAnswerAxios.questions[i].answers[j].text}</p>
                                                        </div>
                                                    `;
            }
            
            quizzContainerAll.innerHTML += `<div class="containAllQuizz" id=q${i}>
                                                <div data-identifier="question" id="questionTitle${i}" class="questionTitleT2">
                                                    <p>${dataAnswerAxios.questions[i].title}</p>
                                                </div>
                                                    <div id="blockQuizzT2__${i}" class="blockQuizzT2">
                                                        ${quizzQuestions}
                                                    </div>
                                            </div>`

        let questionTitle = document.getElementById(`questionTitle${i}`);
        questionTitle.style['backgroundColor'] = `${dataAnswerAxios.questions[i].color}`
        
        quizzQuestions = ""; 
        
    }
        //Lógica para identificar as questões corretas e erradas dadas pelo usuário
        for(let i = 0; i < dataAnswerAxios.questions.length; i++){
            for(let j = 0; j < dataAnswerAxios.questions[i].answers.length; j++){
                if(dataAnswerAxios.questions[i].answers[j].isCorrectAnswer){
                    arrayCorrectWrong.push(true);
                } else {
                        arrayCorrectWrong.push(false);
                }
            }
        }

    // Retorno dos Arrays
    return [booleanContainerAnswers, containerAnswers, arrayCorrectWrong];
}

// Função para randomizar as respostas
function randQuestions() { 
	return Math.random() - 0.5; 
}

// Função selecionar resposta
function selectAnswer(div,num){

    // Lógica para identificar o clique da resposta e não deixar voltar para estado antes do clique e
    // contar os cliques
    if (booleanContainerAnswers[num]) {

        booleanContainerAnswers[num] = false;
        
        if(booleanContainerAnswers[num] == false){
            contClicked++;
        }

        //identificar o clique
        let numAnswer = parseFloat(div.id.replace(`block${num}_answer`,'')); 

        for(let i = 0; i < containerAnswers.length; i++){
            answersContainer[i] = containerAnswers[i];
        }
            //Percorrendo as respostas
            for(let j = 0; j < answersContainer[num]; j++){
                
                if(j!= (numAnswer)){

                    let otherAnswers = document.getElementById(`block${num}_answer${j}`);
                    otherAnswers.classList.add("notSelected");

                }

                if(arrayCorrectWrong[contArrayCorrectWrong]){

                    let correctWrongColor = document.getElementById(`block${num}_answer${j}`);
                    correctWrongColor.classList.add("correct");
                    contArrayCorrectWrong++;
                    
                } else{
                    let correctWrongColor = document.getElementById(`block${num}_answer${j}`);
                    correctWrongColor.classList.add("wrong");
                    contArrayCorrectWrong++;
                }
    }
        //Array com as respostas correstas e erradas... Contando quantas respostas foram corretas
        if(auxarrayCorrectWrong[numAnswer]){
            auxarrayCorrectWrong = auxarrayCorrectWrong.slice(answersContainer[num],auxarrayCorrectWrong.length);
            contUserAnswer++;
        } else {
            auxarrayCorrectWrong = auxarrayCorrectWrong.slice(answersContainer[num],auxarrayCorrectWrong.length);
        }
        
}

    // Filtrando as respostas para mostrar o bloco de resultados...

    if(booleanContainerAnswers.filter(Boolean) == false){
        let resultInfo = document.querySelector(".finalOptions_T2");
        resultInfo.classList.remove("resultHidden_T2");
    }

    // Scrolando automaticamente depois do clique para a próxima questão
    setTimeout(() =>{
        if(document.getElementById(`q${parseInt(num)+1}`) != null){
            document.getElementById(`q${parseInt(num)+1}`).scrollIntoView(false)  }
    }, 2000);

    pegandoocontador();
    return [contUserAnswer, contClicked];  
}

// Elemento resultado final-- Scrollando para lá depois que as perguntas foram respondidas
let myElement = document.getElementById('resetFinalResult');
function scrollToFinalAnswer(){
    
    myElement.scrollIntoView();
}

// Analisando se todas as questões foram respondidas
function pegandoocontador(){
    
    if(contClicked == dataAnswerAxios.questions.length){
        finalAnswer();
        setTimeout(scrollToFinalAnswer, 2000);
    }
}

// Função do resultado final
function finalAnswer(){
    
    // Inicialização das variáveis
    let percTotalRights = 0;
    percTotalRights = 100/dataAnswerAxios.questions.length;
    let auxLevelHists = 0;
    percRights = percTotalRights * contUserAnswer;
    let auxContMinValue = 1;
    let levelsComp = null;
    let auxLevelAnswers = (dataAnswerAxios.levels.length - 1);

    let quizzFinalResult = document.querySelector(".finalOptions_T2");
    quizzFinalResult.innerHTML = "";

    // Análise para identificar possível inversão de input do usuário
    // Caso o usuário coloque o valor minimo do nível zero como o maior
    levelsComp = dataAnswerAxios.levels[0].minValue > dataAnswerAxios.levels[auxContMinValue].minValue;
        
    // Lógica para mostrar resultado correto independente de como o usuário informa os níveis
        if(levelsComp){
            
            for(let i = 0; i < dataAnswerAxios.levels.length; i++){

                if(dataAnswerAxios.levels[auxLevelAnswers].minValue <= Math.floor(percRights)){
                    console.log(auxLevelAnswers)
                    auxLevelHists = auxLevelAnswers;
                }
                auxLevelAnswers--;
            }
        } else {
            for(let i = 0; i < dataAnswerAxios.levels.length; i++){

                if(dataAnswerAxios.levels[i].minValue <= Math.floor(percRights)){
                    auxLevelHists = i;
                }
            }
        }
        
        //Inserção do resultado final na tela
    quizzFinalResult.innerHTML += ` <div data-identifier="quizz-result" class="quizzResult_T2">
                                                <div class="quizzResultTitle_T2">
                                                    <p>${Math.floor(percRights)}% de acerto: ${dataAnswerAxios.levels[auxLevelHists].title}</p> 
                                                </div>
                                                <div class="quizzResultInfo_T2">
                                                    <img src="${dataAnswerAxios.levels[auxLevelHists].image}" alt="">
                                                <p>${dataAnswerAxios.levels[auxLevelHists].text}</p>
                                                </div>
                                            </div>
                                            <!-- Restart Buttom -->
                                                <div class="restartQuizz_T2" onclick="restartButtom()">
                                                    <p>Reiniciar Quizz</p>
                                                </div>
                                
                                            <!-- Home Buttom -->
                                                <div class="homeButtom_T2" onclick="backHome()">
                                                    <p>Voltar pra home</p>
                                                </div>`

    return quizzFinalResult;
}

// Função para voltar a tela principal quando o botão Voltar pra Home for clicado
function backHome(){

    let back = document.getElementById("mainT2");
    back.classList.add("resultHidden_T2");

    arrayId = [];
    booleanContainerAnswers = [];
    containerAnswers = [];
    arrayCorrectWrong = [];

    answersContainer = [];
    contArrayCorrectWrong = 0;
    contUserAnswer = 0;
    auxarrayCorrectWrong = arrayCorrectWrong;
    contClicked = 0;
    auxScrollingQuestions = 0;

    let infoAllQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    infoAllQuizz.then(showQuizzes);
    
    selectAnswer();
    pegandoocontador();
    finalAnswer();

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    document.querySelector(".finalOptions_T2").innerHTML = "";
    document.querySelector(".quizzTitleT2").innerHTML = "";
    document.querySelector(".containerQuizz").innerHTML = "";

    window.clearTimeout(scrollToFinalAnswer);

    window.location.reload();
}

// Função para reiniciar o quizz
function restartButtom(){
    
    arrayId = [];
    booleanContainerAnswers = [];
    containerAnswers = [];
    arrayCorrectWrong = [];

    answersContainer = [];
    contArrayCorrectWrong = 0;
    contUserAnswer = 0;
    auxarrayCorrectWrong = arrayCorrectWrong;
    contClicked = 0;
    auxScrollingQuestions = 0;

    let infoAllQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    infoAllQuizz.then(showQuizzes);

    selectAnswer();
    pegandoocontador();
    finalAnswer();
    
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    document.querySelector(".finalOptions_T2").innerHTML = "";
    document.querySelector(".quizzTitleT2").innerHTML = "";
    document.querySelector(".containerQuizz").innerHTML = "";

    window.clearTimeout(scrollToFinalAnswer);

    
}
