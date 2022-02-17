let quizzObj = {
    title: '',
    image: '',
    questions: [
        /*{
            title: '',
			color: '',
			answers: [
				{
					text: '',
					image: '',
					isCorrectAnswer: true
				}
			]
		}*/
    ],
    levels: [
        /*{
        	title: '',
        	image: '',
        	text: '',
        	minValue: 0
        }*/
    ]
}

let numQuestions = 0
let numLevels = 0

//VALIDAÇÃO DE CADA INPUT

const isQuizzTitleValid = (title) => {
    if (title.length >= 20 && title.length <= 65) {
        return true
    }
    return false
}

const isValidUrl = (url) => {
    let isValid = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (isValid !== null)
}

const isNumQuestionsValid = (numQuestions) => {
    if (numQuestions >= 3) {
        return true
    }
    return false
}

const isNumLevelsValid = (numLevels) => {
    if (numLevels >= 2) {
        return true
    }
    return false
}

const isQuestionTextValid = (questionText) => {
    if (questionText.length >= 20) {
        return true
    }
    return false
}

const isValidHexColor = (hexColor) => {
    let isValid = hexColor.match(/^#([0-9a-f]{3}){1,2}$/i)
    return (isValid !== null)
}

const isAnswerValid = (answer) => {
    if (answer != '') {
        return true
    }
    return false
}

//PEGA OS DADOS QUE SERÃO ENVIADOS AO SERVIDOR/ DADOS USADOS PARA RENDERIZAR OS INPUTS DE PERGUNTAS/NÍVEIS
const getBasicInfos = () => {
    quizzObj.title = document.getElementById('create-title').value
    quizzObj.image = document.getElementById('create-img-url').value
    numQuestions = document.getElementById('create-num-questions').value
    numLevels = document.getElementById('create-num-levels').value
}

//VALIDA SE TODOS OS INPUTS DAS INFORMAÇÕES BÁSICAS POSSUEM DADOS VÁLIDOS

const validateBasicInfos = () => {
    getBasicInfos()
    if (isQuizzTitleValid(quizzObj.title) && isValidUrl(quizzObj.image) && isNumQuestionsValid(numQuestions) && isNumLevelsValid(numLevels)) {
        return true
    }
    return false
}

//APARECE MENSAGEM DE ERRO PARA OS INPUTS QUE NÃO POSSUEM DADOS VÁLIDOS

const invalidBasicInfos = () => {
    let invalidTitleMessage = document.getElementById('ivalid-quizz-tile')
    let invalidTitleInput = document.getElementById('create-title')
    if (!isQuizzTitleValid(quizzObj.title)) {
        invalidTitleMessage.classList.remove('hidden')
        invalidTitleInput.classList.add('invalid-input')
    } else {
        invalidTitleMessage.classList.add('hidden')
        invalidTitleInput.classList.remove('invalid-input')
    }

    let invalidUrlMessage = document.getElementById('ivalid-img-url')
    let invalidUrlInput = document.getElementById('create-img-url')
    if (!isValidUrl(quizzObj.image)) {
        invalidUrlMessage.classList.remove('hidden')
        invalidUrlInput.classList.add('invalid-input')
    } else {
        invalidUrlMessage.classList.add('hidden')
        invalidUrlInput.classList.remove('invalid-input')
    }

    let invalidQuestionsMessage = document.getElementById('invalid-num-questions')
    let invalidQuestionsInput = document.getElementById('create-num-questions')

    if (!isNumQuestionsValid(numQuestions)) {
        invalidQuestionsMessage.classList.remove('hidden')
        invalidQuestionsInput.classList.add('invalid-input')
    } else {
        invalidQuestionsMessage.classList.add('hidden')
        invalidQuestionsInput.classList.remove('invalid-input')
    }

    let invalidLevelsMessage = document.getElementById('invalid-num-levels')
    let invalidLevelsInput = document.getElementById('create-num-levels')

    if (!isNumLevelsValid(numLevels)) {
        invalidLevelsMessage.classList.remove('hidden')
        invalidLevelsInput.classList.add('invalid-input')
    } else {
        invalidLevelsMessage.classList.add('hidden')
        invalidLevelsInput.classList.remove('invalid-input')
    }
}

//LIBERA (OU NÃO) A PROXIMA PAGINA PARA CRIAR AS PERGUNTAS QUIZZ

const goToQuestions = () => {
    let isAllValid = validateBasicInfos()
    if (isAllValid) {
        loadQuestionsInputs()
        document.querySelector('.create-quizz-info').classList.add('hidden')
        document.querySelector('.create-quizz-questions').classList.remove('hidden')
    } else {
        invalidBasicInfos()
    }
}

//CARREGA OS CAMPOS NECESSÁRIOS PARA A QUANTIDADE DE PERGUNTAS

const loadQuestionsInputs = () => {
    questionsInputs = ''
    createQuestionsContainer = document.getElementById('questions-inputs')
    for (let i = 0; i < (numQuestions - 1); i++) {
        console.log(i + 2)
        questionsInputs += `
        <div id="min-${i+2}" class="min-question-inputs" onclick="showQuestionInputs('min-${i+2}','question-${i+2}')">
            <div>
                <p>Pergunta ${i+2}</p>
                <img src="./img/Vector.png" alt="editar">
            </div>        
        </div>
        <div id="question-${i+2}" class="inputs inputs-separate hidden show-input">
            <h3>Pergunta ${i+2}</h3>
            <div class="group-inputs">
                <input id="${i+2}-question-text" class="create-quizz-input" type="text" placeholder="Texto da pergunta">
                <input id="${i+2}-question-background" class="create-quizz-input" type="text" placeholder="Cor de fundo da pergunta">
            </div>

            <h3>Resposta correta</h3>
            <div class="group-inputs">
                <input id="${i+2}-correct-answer" class="create-quizz-input" type="text" placeholder="Resposta correta">
                <input id="${i+2}-correct-url-img" class="create-quizz-input" type="text" placeholder="URL da imagem">
            </div>

            <h3>Respostas incorretas</h3>
            <div class="group-inputs">
                <input id="${i+2}-first-wrong-answer" class="create-quizz-input" type="text" placeholder="Resposta incorreta 1">
                <input id="${i+2}-first-wrong-url-img" class="create-quizz-input" type="text" placeholder="URL da imagem 1">
            </div>

            <div class="group-inputs">
                <input id="${i+2}-second-wrong-answer" class="create-quizz-input" type="text" placeholder="Resposta incorreta 2">
                <input id="${i+2}-second-wrong-url-img" class="create-quizz-input" type="text" placeholder="URL da imagem 2">
            </div>

            <div class="group-inputs">
                <input id="${i+2}-third-wrong-answer" class="create-quizz-input" type="text" placeholder="Resposta incorreta 3">
                <input id="${i+2}-third-wrong-url-img" class="create-quizz-input" type="text" placeholder="URL da imagem 3">
            </div>
        </div>`
    }
    createQuestionsContainer.innerHTML += questionsInputs
}

//MINIMIZA OS INPUTS DAS QUESTOES QUE NÃO ESTÃO SENDO EDITADAS

const showQuestionInputs = (minDiv, maxDiv) => {
    let maxSelected = document.querySelector('.question-selected')
    let minSelected = document.querySelector('.min-selected')
    let min = document.getElementById(minDiv)
    let max = document.getElementById(maxDiv)

    if (maxSelected != null && minSelected != null) {
        maxSelected.classList.add('hidden')
        maxSelected.classList.remove('question-selected')
        minSelected.classList.remove('hidden', 'min-selected')
    }

    min.classList.add('hidden', 'min-selected')
    max.classList.add('question-selected')
    max.classList.remove('hidden')
}