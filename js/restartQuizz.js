
// Obtendo info de todos os Quizzes (Não sei o plural de quizz)
let infoAllQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
infoAllQuizz.then(obtainIDQuizz)

let arrayId = [];
let booleanContainerAnswers = [];
let containerAnswers = [];
let arrayCorrectWrong = [];

let answersContainer = [];
let contArrayCorrectWrong = 0;
let contUserAnswer = 0;
let auxarrayCorrectWrong = arrayCorrectWrong;
let cont = 0;

function obtainIDQuizz(messageAllQuizz) {

    idQuizz = messageAllQuizz.data;
    /* console.log(idQuizz) */
    for (let i = 0; i < idQuizz.length; i++) {
        arrayId[i] = idQuizz[i].id;
    }
    // Obtendo info do Quizz
    /* console.log(arrayId) */
    // Tem que passar essa info do ID com o clique na tela 1
    let infoOneQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${arrayId[10]}`);
    infoOneQuizz.then(processAxiosAnswer)
}


// No lugar do 2506 teria que ser o dataAnswerAxios.data... 
/* let infoOneQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/2506") */ // ID do quiz deve ser a variável a ser passada para montar o quizz certo
/* infoOneQuizz.then(processAxiosAnswer) */

// Recebendo os dados do get enviados pelo servidor
function processAxiosAnswer(messageOneQuizz) {
    dataAnswerAxios = messageOneQuizz.data;
    createPost_T2(dataAnswerAxios);
    /* funcaoteste(dataAnswerAxios); */
}

// Fazer um auxiliar para determinar quantas respostas ficaram em cada coluna

//

function createPost_T2(dataAnswerAxios) {

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
                /* console.log("Tô dentro desse for") */
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

/* 
let answersContainer = [];
let contArrayCorrectWrong = 0;
let contUserAnswer = 0;
let auxarrayCorrectWrong = arrayCorrectWrong; */

// Função selecionar resposta

function selectAnswer(div,num){

    if (booleanContainerAnswers[num]) {

        booleanContainerAnswers[num] = false;

        let numAnswer = parseFloat(div.id.replace(`block${num}_answer`,'')); 
        /* console.log(numAnswer) */
        let myElement = document.querySelector(`.blockQuizzT2 img`);
        /* console.log(myElement) */
        
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
        
        /* myElement.children.next.scrollIntoView({behavior: "smooth"}); */
}

    // Filtrando as respostas para mostrar o bloco de resultados...

    if(booleanContainerAnswers.filter(Boolean) == false){
        /* console.log(booleanContainerAnswers) */
        let resultInfo = document.querySelector(".finalOptions_T2");
        resultInfo.classList.remove("resultHidden_T2");
    }
    
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
    /* console.log(percRights); */
    let quizzFinalResult = document.querySelector(".finalOptions_T2");
    quizzFinalResult.innerHTML = "";
    /* dataAnswerAxios.levels.length; */
    /* dataAnswerAxios.levels[0].title */
    /* dataAnswerAxios.levels[0].minValue */
    for(let i = 0; i < dataAnswerAxios.levels.length; i++){
        
        if(dataAnswerAxios.levels[i].minValue < percRights){
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
}