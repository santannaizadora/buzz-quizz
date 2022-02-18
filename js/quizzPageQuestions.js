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

let infoAllQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");

function createPost_T2(idQuizz){

    idClicked = idQuizz;
    // Obtendo info de todos os Quizz
    
    infoAllQuizz.then(showQuizzes);
    /* let idQuizzClicked = idQuizz; */ 

    let back = document.getElementById("mainT2");
    back.classList.remove("resultHidden_T2");
    
    let home = document.querySelector(".container");
    home.classList.add("resultHidden_T2");

    window.scroll({
        top: 100,
        behavior: 'smooth'
    });

}

function showQuizzes(messageAllQuizz) {
    
    idQuizz = messageAllQuizz.data;
    console.log(idQuizz)
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
        console.log(messageOneQuizz)
        createPostQuizz(dataAnswerAxios);
    }

}

/* minhaArray.sort(comparador); 

function comparador() { 
	return Math.random() - 0.5; 
} */

// Fazer um auxiliar para determinar quantas respostas ficaram em cada coluna

function createPostQuizz(dataAnswerAxios) {
    console.log(idQuizz)
    for (let i = 0; i < dataAnswerAxios.questions.length; i++) {
        booleanContainerAnswers.push(true);
    }

    /* console.log(containerAnswers); */
    let oneQuizzTitle = document.querySelector(".quizzTitleT2");
    let quizzQuestionTitle = document.querySelector(".containerQuizz");
    
    oneQuizzTitle.innerHTML = "";
    quizzQuestionTitle.innerHTML = "";
    
    oneQuizzTitle.innerHTML += `<p>${dataAnswerAxios.title}</p>`

    oneQuizzTitle.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${dataAnswerAxios.image}')`;
    
        for(let i = 0; i < dataAnswerAxios.questions.length; i++){
            
            dataAnswerAxios.questions[i];
            quizzQuestionTitle.innerHTML += `<div id="questionTitle${i}" class="questionTitleT2">
                                                <p>${dataAnswerAxios.questions[i].title}</p>
                                            </div>`

        let questionTitle = document.getElementById(`questionTitle${i}`);
        questionTitle.style['backgroundColor'] = `${dataAnswerAxios.questions[i].color}`

            for(let j = 0; j < dataAnswerAxios.questions[i].answers.length; j++){
                
                auxCont = i;
                containerAnswers[i] = dataAnswerAxios.questions[i].answers.length;
                quizzQuestionTitle.innerHTML += `
                                                    <div id="blockQuizzT2__${j}" class="blockQuizzT2">
                                                        <div class="subBlockAnswer" id="block${i}_answer${j}" onclick="selectAnswer(this,'${i}')">
                                                            <img src="${dataAnswerAxios.questions[i].answers[j].image}" alt="">
                                                            <p>${dataAnswerAxios.questions[i].answers[j].text}</p>
                                                        </div>
                                                    </div>`;

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

// Função selecionar resposta



function selectAnswer(div,num){

    if (booleanContainerAnswers[num]) {

        booleanContainerAnswers[num] = false;

        let numAnswer = parseFloat(div.id.replace(`block${num}_answer`,'')); 
        /* console.log(numAnswer) */
        let myElement = document.querySelector(`.allInfoQuizz`);
        
/*         myElement.childNodes[myElement.children.length - 1].scrollIntoView();
        console.log(myElement.childNodes[myElement.children.length]) */

        for(let i = 0; i < containerAnswers.length; i++){
            answersContainer[i] = containerAnswers[i];
        }
            
            for(let j = 0; j < answersContainer[num]; j++){
                
                if(j!= (numAnswer)){
/*                     console.log(j);
                    console.log(num); */
                    let otherAnswers = document.getElementById(`block${num}_answer${j}`);
                    otherAnswers.classList.add("notSelected");
                    /* console.log(otherAnswers) */
                }

                if(arrayCorrectWrong[contArrayCorrectWrong]){
                    let correctWrongColor = document.getElementById(`block${num}_answer${j}`);
                    correctWrongColor.classList.add("correct");
                    contArrayCorrectWrong++;
                    cont++                    
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
        /* console.log(booleanContainerAnswers) */
        let resultInfo = document.querySelector(".finalOptions_T2");
        resultInfo.classList.remove("resultHidden_T2");
    }
    
/*     const elementoQueQueroQueApareca = document.querySelector('.containerQuizz');
    elementoQueQueroQueApareca.scrollTo(elementoQueQueroQueApareca.children) */

    pegandoocontador();
    return [contUserAnswer, cont];  
}

function pegandoocontador(){

    if(cont == dataAnswerAxios.questions.length){
        finalAnswer();
    }
}


function finalAnswer(){
    let percTotalRights = 100/dataAnswerAxios.questions.length;
    let auxLevelHists = 0;
    percRights = percTotalRights * contUserAnswer;
    
    let quizzFinalResult = document.querySelector(".finalOptions_T2");
    quizzFinalResult.innerHTML = "";

    for(let i = 0; i < dataAnswerAxios.levels.length; i++){
        
        if(dataAnswerAxios.levels[i].minValue <= percRights){
                console.log(dataAnswerAxios.levels[i].minValue);
                console.log(percRights);
                console.log(i)
                auxLevelHists = i;
        }
    }

    quizzFinalResult.innerHTML += ` <div class="quizzResult_T2">
                                                <div class="quizzResultTitle_T2">
                                                    <p>${dataAnswerAxios.levels[auxLevelHists].title}</p> <!--ESSA FRASE VAI MUDAR E VIR DA API-->
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
    /* startFirstScreen(); */
    
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

    let infoAllQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    infoAllQuizz.then(showQuizzes);
    
    selectAnswer();
    pegandoocontador();
    finalAnswer();

    window.scroll({
        top: 100,
        behavior: 'smooth'
    });

    document.getElementById("resetFinalResult").innerHTML = '';
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

    let infoAllQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    infoAllQuizz.then(showQuizzes);

    selectAnswer();
    pegandoocontador();
    finalAnswer();

    window.scroll({
        top: 100,
        behavior: 'smooth'
    });

    document.getElementById("resetFinalResult").innerHTML = '';
    
}
