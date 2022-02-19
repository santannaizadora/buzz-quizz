let arrayId = [];
let arrayCorrectWrong = [];
let booleanContainerAnswers = [];
let containerAnswers = [];
let answersContainer = [];
let contArrayCorrectWrong = 0;
let contUserAnswer = 0;
let auxarrayCorrectWrong = arrayCorrectWrong;
let cont = 0;
let idClicked = 0;
let auxScrollingQuestions = 0;

let infoAllQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");

function createPost_T2(idQuizz){

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    idClicked = idQuizz;
    // Obtendo info de todos os Quizz
    
    infoAllQuizz.then(showQuizzes);
    /* let idQuizzClicked = idQuizz; */ 

    let back = document.getElementById("mainT2");
    back.classList.remove("resultHidden_T2");
    
    let home = document.querySelector(".container");
    home.classList.add("resultHidden_T2");
}

function showQuizzes(messageAllQuizz) {

    arrayCorrectWrong = [];
    auxarrayCorrectWrong = arrayCorrectWrong;
    auxScrollingQuestions = 0;

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    
    idQuizz = messageAllQuizz.data;
    /* console.log(idQuizz) */
    for (let i = 0; i < idQuizz.length; i++) {
        arrayId[i] = idQuizz[i].id;
    }
    // Obtendo info do Quizz
    // Tem que passar essa info do ID com o clique na tela 1
    let infoOneQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idClicked}`);
    infoOneQuizz.then(processAxiosAnswer)

    // Recebendo os dados do get enviados pelo servidor
    function processAxiosAnswer(messageOneQuizz) {
        dataAnswerAxios = messageOneQuizz.data;
        /* console.log(messageOneQuizz) */
        createPostQuizz(dataAnswerAxios);
    }

}

/* minhaArray.sort(comparador); 

function comparador() { 
	return Math.random() - 0.5; 
} */

// Fazer um auxiliar para determinar quantas respostas ficaram em cada coluna




function createPostQuizz(dataAnswerAxios) {

    for (let i = 0; i < dataAnswerAxios.questions.length; i++) {
        booleanContainerAnswers.push(true);
    }

    /* console.log(containerAnswers); */
    let oneQuizzTitle = document.querySelector(".quizzTitleT2");
    let quizzContainerAll = document.querySelector(".containerQuizz");
    let quizzQuestions = "";

    oneQuizzTitle.innerHTML = "";
    quizzContainerAll.innerHTML = "";
    
    
    oneQuizzTitle.innerHTML += `<p>${dataAnswerAxios.title}</p>`

    oneQuizzTitle.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${dataAnswerAxios.image}')`;
    
        for(let i = 0; i < dataAnswerAxios.questions.length; i++){
            
            dataAnswerAxios.questions[i];

            dataAnswerAxios.questions[i].answers.sort(randQuestions);

            for(let j = 0; j < dataAnswerAxios.questions[i].answers.length; j++){
                
                auxCont = i;
                containerAnswers[i] = dataAnswerAxios.questions[i].answers.length;
                quizzQuestions += `<div id="blockQuizzT2__${j}" class="blockQuizzT2">
                                                        <div class="subBlockAnswer" id="block${i}_answer${j}" onclick="selectAnswer(this,'${i}')">
                                                            <img src="${dataAnswerAxios.questions[i].answers[j].image}" alt="">
                                                            <p>${dataAnswerAxios.questions[i].answers[j].text}</p>
                                                        </div>
                                                    </div>`;
            }
            
            quizzContainerAll.innerHTML += `<div class="containAllQuizz" id=q${i}>
                                                <div id="questionTitle${i}" class="questionTitleT2">
                                                    <p>${dataAnswerAxios.questions[i].title}</p>
                                                </div>
                                                    ${quizzQuestions}
                                            </div>`

        let questionTitle = document.getElementById(`questionTitle${i}`);
        questionTitle.style['backgroundColor'] = `${dataAnswerAxios.questions[i].color}`
        
        quizzQuestions = ""; 
        
    }

        for(let i = 0; i < dataAnswerAxios.questions.length; i++){
            for(let j = 0; j < dataAnswerAxios.questions[i].answers.length; j++){
                if(dataAnswerAxios.questions[i].answers[j].isCorrectAnswer){
                    arrayCorrectWrong.push(true);
                } else {
                        arrayCorrectWrong.push(false);
                }
            }
        }

        // Final Results
    return [booleanContainerAnswers, containerAnswers, arrayCorrectWrong];
}

// Esta função pode ficar separada do código acima, onde você preferir
function randQuestions() { 
	return Math.random() - 0.5; 
}

// Função selecionar resposta

function selectAnswer(div,num){

    
    if (booleanContainerAnswers[num]) {

        booleanContainerAnswers[num] = false;

        let numAnswer = parseFloat(div.id.replace(`block${num}_answer`,'')); 


        for(let i = 0; i < containerAnswers.length; i++){
            answersContainer[i] = containerAnswers[i];
        }
            
            for(let j = 0; j < answersContainer[num]; j++){
                
                if(j!= (numAnswer)){

                    let otherAnswers = document.getElementById(`block${num}_answer${j}`);
                    otherAnswers.classList.add("notSelected");

                }

                if(arrayCorrectWrong[contArrayCorrectWrong]){

                    let correctWrongColor = document.getElementById(`block${num}_answer${j}`);
                    correctWrongColor.classList.add("correct");
                    contArrayCorrectWrong++;
                    cont++;    
                    
                } else{
                    let correctWrongColor = document.getElementById(`block${num}_answer${j}`);
                    correctWrongColor.classList.add("wrong");
                    contArrayCorrectWrong++;
                }
    }
        
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

    setTimeout(() =>{
        if(document.getElementById(`q${parseInt(num)+1}`) != null){
            document.getElementById(`q${parseInt(num)+1}`).scrollIntoView()  }
    }, 2000);

    pegandoocontador();
    return [contUserAnswer, cont];  
}


let myElement = document.getElementById('resetFinalResult');
function scrollToFinalAnswer(){
    
    myElement.scrollIntoView();
}

function pegandoocontador(){

    if(cont == dataAnswerAxios.questions.length){
        finalAnswer();
        setTimeout(scrollToFinalAnswer, 2000);
    }
}


function finalAnswer(){
    
    let percTotalRights = 0;
    percTotalRights = 100/dataAnswerAxios.questions.length;
    let auxLevelHists = 0;
    percRights = percTotalRights * contUserAnswer;
    let auxCont = 0;

    let quizzFinalResult = document.querySelector(".finalOptions_T2");
    quizzFinalResult.innerHTML = "";

    for(let i = 0; i < dataAnswerAxios.levels.length; i++){
        auxCont++;
        if(auxCont < dataAnswerAxios.levels.length){
            if(dataAnswerAxios.levels[i].minValue > dataAnswerAxios.levels[auxCont].minValue){
                auxLevelHists = i;
            }
        }
            if(i>0 && dataAnswerAxios.levels[i-1].minValue > dataAnswerAxios.levels[i].minValue && dataAnswerAxios.levels[i-1].minValue <= Math.floor(percRights)){
                        auxLevelHists = i-1;
                        console.log(auxLevelHists)
                    } else{
                        auxLevelHists = i;
                }
        
        
    }
    

    quizzFinalResult.innerHTML += ` <div class="quizzResult_T2">
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

function backHome(){

    let back = document.getElementById("mainT2");
    back.classList.add("resultHidden_T2");
        
    let home = document.querySelector(".container");
    home.classList.remove("resultHidden_T2");

    arrayId = [];
    booleanContainerAnswers = [];
    containerAnswers = [];
    arrayCorrectWrong = [];

    answersContainer = [];
    contArrayCorrectWrong = 0;
    contUserAnswer = 0;
    auxarrayCorrectWrong = arrayCorrectWrong;
    cont = 0;
    auxScrollingQuestions = 0;

    let infoAllQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    infoAllQuizz.then(showQuizzes);
    
    selectAnswer();
    pegandoocontador();
    finalAnswer();

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    document.getElementById("resetFinalResult").innerHTML = "";
    document.querySelector(".quizzTitleT2").innerHTML = "";
    document.querySelector(".containerQuizz").innerHTML = "";

    window.clearTimeout(scrollToFinalAnswer);
}


function restartButtom(){
    
    arrayId = [];
    booleanContainerAnswers = [];
    containerAnswers = [];
    arrayCorrectWrong = [];

    answersContainer = [];
    contArrayCorrectWrong = 0;
    contUserAnswer = 0;
    auxarrayCorrectWrong = arrayCorrectWrong;
    cont = 0;
    auxScrollingQuestions = 0;

    let infoAllQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    infoAllQuizz.then(showQuizzes);

    selectAnswer();
    pegandoocontador();
    finalAnswer();
    
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    document.getElementById("resetFinalResult").innerHTML = "";
    document.querySelector(".quizzTitleT2").innerHTML = "";
    document.querySelector(".containerQuizz").innerHTML = "";

    window.clearTimeout(scrollToFinalAnswer);
    
}
