
// Info do axios
/* [
	{
		id: 1,
		title: "Título do quizz",
		image: "https://http.cat/411.jpg",
		questions: [
			{
				title: "Título da pergunta 1",
				color: "#123456",
				answers: [
					{
						text: "Texto da resposta 1",
						image: "https://http.cat/411.jpg",
						isCorrectAnswer: true
					},
					{
						text: "Texto da resposta 2",
						image: "https://http.cat/412.jpg",
						isCorrectAnswer: false
					}
				]
			},
			{
				title: "Título da pergunta 2",
				color: "#123456",
				answers: [
					{
						text: "Texto da resposta 1",
						image: "https://http.cat/411.jpg",
						isCorrectAnswer: true
					},
					{
						text: "Texto da resposta 2",
						image: "https://http.cat/412.jpg",
						isCorrectAnswer: false
					}
				]
			},
			{
				title: "Título da pergunta 3",
				color: "#123456",
				answers: [
					{
						text: "Texto da resposta 1",
						image: "https://http.cat/411.jpg",
						isCorrectAnswer: true
					},
					{
						text: "Texto da resposta 2",
						image: "https://http.cat/412.jpg",
						isCorrectAnswer: false
					}
				]
			}
		],
		levels: [
			{
				title: "Título do nível 1",
				image: "https://http.cat/411.jpg",
				text: "Descrição do nível 1",
				minValue: 0
			},
			{
				title: "Título do nível 2",
				image: "https://http.cat/412.jpg",
				text: "Descrição do nível 2",
				minValue: 50
			}
		]
	}
] */


// Obtendo info de todos os Quizzes (Não sei o plural de quizz)
let infoAllQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
infoAllQuizz.then(obtainIDQuizz)
let arrayId = [];
let booleanContainerAnswers = [];
let containerAnswers = 0;

function obtainIDQuizz(messageAllQuizz){
    idQuizz = messageAllQuizz.data;
    console.log(idQuizz)
    for(let i = 0; i < idQuizz.length; i++){
        arrayId[i] = idQuizz[i].id;
    }
    // Obtendo info do Quizz
    /* console.log(arrayId) */
    // Tem que passar essa info do ID com o clique na tela 1
    let infoOneQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${arrayId[0]}`);
    infoOneQuizz.then(processAxiosAnswer)
}


// No lugar do 2506 teria que ser o dataAnswerAxios.data... 
/* let infoOneQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/2506") */ // ID do quiz deve ser a variável a ser passada para montar o quizz certo
/* infoOneQuizz.then(processAxiosAnswer) */

// Recebendo os dados do get enviados pelo servidor
function processAxiosAnswer(messageOneQuizz) {
	dataAnswerAxios = messageOneQuizz.data;
    createPost_T2(dataAnswerAxios);
}

// Fazer um auxiliar para determinar quantas respostas ficaram em cada coluna

//

function createPost_T2(dataAnswerAxios){

    for(let i = 0; i < dataAnswerAxios.questions.length; i++){ 
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
            quizzQuestionTitle.innerHTML += `<div class="questionTitleT2">
                                                <p>${dataAnswerAxios.questions[i].title}</p>
                                            </div>`
            for(let j = 0; j < dataAnswerAxios.questions[i].answers.length; j++){

                containerAnswers += dataAnswerAxios.questions[i].answers.length;
                quizzQuestionTitle.innerHTML += `
                                                    <div id="blockQuizzT2__${j}" class="blockQuizzT2">
                                                        <div class="subBlockAnswer" id="block${i}_answer${j}" onclick="selectAnswer(this,'${i}')">
                                                            <img src="${dataAnswerAxios.questions[i].answers[j].image}" alt="">
                                                            <p>${dataAnswerAxios.questions[i].answers[j].text}</p>
                                                        </div>
                                                    </div>
                                                `;
                    for(let k = 0; k < dataAnswerAxios.questions[i].answers[j].length; k++){
                            console.log("Tô dentro desse for")
                            arrayCorrectWrong[k] = true;
                    }
    }

    
    quizzQuestionTitle.innerHTML +=    ` <div class="finalOptions_T2 resultHidden_T2">
                                            <div class="quizzResult_T2">
                                                <div class="quizzResultTitle_T2">
                                                    <p>88% de acerto: Você é praticamente um aluno de Hogwarts!</p> <!--ESSA FRASE VAI MUDAR E VIR DA API-->
                                                </div>
                                                <div class="quizzResultInfo_T2">
                                                    <img src="https://http.cat/412.jpg" alt="">
                                                <p>Parabéns Potterhead! Bem-vindx a Hogwarts, aproveite o loop infinito de comida e clique no botão abaixo para usar o vira-tempo e reiniciar este teste.</p>
                                                </div>
                                            </div>
                                        <!-- Restart Buttom -->
                                            <div class="restartQuizz_T2">
                                                <p>Reiniciar Quizz</p>
                                            </div>
                                        <!-- Home Buttom -->
                                            <div class="homeButtom_T2">
                                                <p>Voltar pra home</p>
                                            </div>
                                        </div>`
            
    }

    return booleanContainerAnswers;
}

// Função selecionar resposta
function selectAnswer(div,num){

/*     console.log(containerAnswers);
    console.log(div)
    console.log(num)
    console.log(containerAnswers)  */

    if(booleanContainerAnswers[num]){

        booleanContainerAnswers[num] = false;

        let numAnswer = parseFloat(div.id.replace(`block${num}_answer`, '')); 
        
        let myElement = document.querySelector(`.blockQuizzT2 img`);
        console.log(myElement)

        for (let i = 0; i < Math.ceil(containerAnswers/2); i++){
            /* console.log(i); */
            if(i != (numAnswer)){
                let otherAnswers = document.getElementById(`block${num}_answer${i}`);
                console.log(otherAnswers)
                otherAnswers.classList.add("notSelected");
            }
        
        }

        /* myElement.children.next.scrollIntoView({behavior: "smooth"}); */
    }

    // Filtrando as respostas para mostrar o bloco de resultados...
    if(booleanContainerAnswers.filter(Boolean) == false){
        let resultInfo = document.querySelector(".finalOptions_T2");
        resultInfo.classList.remove("resultHidden_T2");
    }

    
    // fazer comparador com a resposta que vem do axios-- para saber se é true ou false a resposta
}

/* setInterval(selectAnswer, 2000); */

/* function scrollToBottom(number) {
    console.log(number);
    let myElement = document.querySelector(`.blockQuizzT2__${number}`);
    myElement.scrollIntoView(false); // Bottom
} */




