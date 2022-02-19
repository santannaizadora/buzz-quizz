let quizzObj = {
    title: '',
    image: '',
    questions: [],
    levels: []
}

let numQuestions = 0
let numLevels = 0

let postResponse = ''

//VALIDAÇÃO DE CADA INPUT

const isQuizzTitleValid = (title) => {
    if (title.length >= 20 && title.length <= 65) {
        return true
    }
    return false
}

const isValidUrl = (url) => {
    let isValid = url.match(/(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png|gif)/i);
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
    let isValid = hexColor.match(/^#[0-9a-f]{6}$/i)
    return (isValid !== null)
}

const isAnswerValid = (answer) => {
    if (answer != '') {
        return true
    }
    return false
}

const isNotEmpty = (data) => {
    if (data != '') {
        return true
    }
    return false
}

const isLevelTitleValid = (title) => {
    if (title.length >= 10) {
        return true
    }
    return false
}

const isPercentageValid = (percentage) => {
    if (percentage >= 0 && percentage <= 100) {
        return true
    }
    return false
}

const isLevelDescriptionValid = (description) => {
    if (description.length >= 30) {
        return true
    }
    return false
}

const findZero = (value) => {
    return value == 0
}

const thereIsZeroPercent = () => {
    values = []
    quizzObj.levels.forEach(level => {
        values.push(level.minValue)
    })

    return values.find(findZero)
}

//PEGA OS DADOS QUE SERÃO ENVIADOS AO SERVIDOR/ DADOS USADOS PARA RENDERIZAR OS INPUTS DE PERGUNTAS/NÍVEIS
const getBasicInfos = () => {
    quizzObj.title = document.getElementById('create-title').value
    quizzObj.image = document.getElementById('create-img-url').value
    numQuestions = document.getElementById('create-num-questions').value
    numLevels = document.getElementById('create-num-levels').value
}

//PEGA AS INFORMAÇÕES DE CADA PERGUNTA
const getQuestionInfos = () => {
    quizzObj.questions = []


    let correctAnswerObj = {
        text: '',
        image: '',
        isCorrectAnswer: true
    }
    let firstWrongAnswerObj = {
        text: '',
        image: '',
        isCorrectAnswer: false
    }
    let secondWrongAnswerObj = {
        text: '',
        image: '',
        isCorrectAnswer: false
    }
    let thirdWrongAnswerObj = {
        text: '',
        image: '',
        isCorrectAnswer: false
    }
    for (let i = 0; i < numQuestions; i++) {
        let questionObj = {
            title: '',
            color: '',
            answers: []
        }

        const index = i + 1;

        const secondWrongInputs = document.getElementById(`second-${index}`)
        const thirdWrongInputs = document.getElementById(`third-${index}`)

        let titleQuestion = document.getElementById(`${index}-question-text`).value
        let colorQuestion = document.getElementById(`${index}-question-background`).value
        let correctAnswerText = document.getElementById(`${index}-correct-answer`).value
        let correctAnswerUrl = document.getElementById(`${index}-correct-url-img`).value
        let firstWrongAnswer = document.getElementById(`${index}-first-wrong-answer`).value
        let firstWrongUrl = document.getElementById(`${index}-first-wrong-url-img`).value
        let secondWrongAnswer = document.getElementById(`${index}-second-wrong-answer`).value
        let secondWrongUrl = document.getElementById(`${index}-second-wrong-url-img`).value
        let thirdWrongAnswer = document.getElementById(`${index}-third-wrong-answer`).value
        let thirdWrongUrl = document.getElementById(`${index}-third-wrong-url-img`).value

        questionObj.title = titleQuestion
        questionObj.color = colorQuestion

        correctAnswerObj.text = correctAnswerText
        correctAnswerObj.image = correctAnswerUrl
        questionObj.answers.push(correctAnswerObj)

        firstWrongAnswerObj.text = firstWrongAnswer
        firstWrongAnswerObj.image = firstWrongUrl
        questionObj.answers.push(firstWrongAnswerObj)

        if (!secondWrongInputs.classList.contains('hidden')) {
            secondWrongAnswerObj.text = secondWrongAnswer
            secondWrongAnswerObj.image = secondWrongUrl
            questionObj.answers.push(secondWrongAnswerObj)
        }

        if (!thirdWrongInputs.classList.contains('hidden')) {
            thirdWrongAnswerObj.text = thirdWrongAnswer
            thirdWrongAnswerObj.image = thirdWrongUrl
            questionObj.answers.push(thirdWrongAnswerObj)
        }

        quizzObj.questions.push(questionObj)
    }
    console.log(quizzObj)
}

const getLevelInfos = () => {
    quizzObj.levels = []

    for (let i = 0; i < numLevels; i++) {
        const index = i + 1
        let levelObj = {
            title: `${document.getElementById(`level-title-${index}`).value}`,
            image: `${document.getElementById(`level-img-url-${index}`).value}`,
            text: `${document.getElementById(`level-description-${index}`).value}`,
            minValue: parseFloat(document.getElementById(`rating-level-${index}`).value)
        }
        quizzObj.levels.push(levelObj)
    }
}

//VALIDA SE TODOS OS INPUTS DAS INFORMAÇÕES BÁSICAS POSSUEM DADOS VÁLIDOS

const validateBasicInfos = () => {
    getBasicInfos()
    if (isQuizzTitleValid(quizzObj.title) && isValidUrl(quizzObj.image) && isNumQuestionsValid(numQuestions) && isNumLevelsValid(numLevels)) {
        return true
    }
    return false
}

const verifyError = (verify) => {
    return verify === false
}

//VALIDA SE TODAS OS INPUTS DAS INFORMAÇÕES DAS PERGUNTAS SÃO VÁLIDOS
let isValidQuestion = () => {
    let verify = []
    for (let i = 0; i < numQuestions; i++) {
        const index = i + 1;
        let invalidText = document.getElementById(`invalid-question-${index}`)
        verify.push(invalidText.classList.contains('hidden'))
        let invalidColor = document.getElementById(`invalid-color-${index}`)
        verify.push(invalidColor.classList.contains('hidden'))
    }
    return verify.find(verifyError)
}

const isValidMandatoryAnswers = () => {
    let verify = []
    for (let i = 0; i < numQuestions; i++) {
        const index = i + 1;
        let invalidCorrect = document.getElementById(`invalid-correct-${index}`)
        let invalidCorrectUrl = document.getElementById(`invalid-correct-url-${index}`)
        let invalidFirstWrong = document.getElementById(`invalid-first-wrong-${index}`)
        let invalidFirstUrl = document.getElementById(`invalid-first-url-${index}`)

        verify.push(invalidCorrect.classList.contains('hidden'))
        verify.push(invalidCorrectUrl.classList.contains('hidden'))
        verify.push(invalidFirstWrong.classList.contains('hidden'))
        verify.push(invalidFirstUrl.classList.contains('hidden'))
    }
    return verify.find(verifyError)
}

const isValidOptionalAnswers = () => {
    let verify = []
    for (let i = 0; i < numQuestions; i++) {
        const index = i + 1;
        let secondWrongInputs = document.getElementById(`second-${index}`)
        let thirdWrongInputs = document.getElementById(`third-${index}`)
        let invalidSecondWrong = document.getElementById(`invalid-second-wrong-${index}`)
        let invalidSecondUrl = document.getElementById(`invalid-second-url-${index}`)
        let invalidThirdWrong = document.getElementById(`invalid-third-wrong-${index}`)
        let invalidThirdUrl = document.getElementById(`invalid-third-url-${index}`)

        if (!secondWrongInputs.classList.contains('hidden')) {
            verify.push(invalidSecondWrong.classList.contains('hidden'))
            verify.push(invalidSecondUrl.classList.contains('hidden'))
        }
        if (!thirdWrongInputs.classList.contains('hidden')) {
            verify.push(invalidThirdWrong.classList.contains('hidden'))
            verify.push(invalidThirdUrl.classList.contains('hidden'))
        }
    }
    return verify.find(verifyError)
}

//VALIDA SE OS INPUTS DE LEVEL SÃO VÁLIDOS
const IsValidLevel = () => {
    let verify = []
    for (let i = 0; i < numLevels; i++) {
        const index = i + 1;
        const invalidLevelTitle = document.getElementById(`invalid-level-title-${index}`)
        const invalidLevelRating = document.getElementById(`invalid-level-rating-${index}`)
        const invalidLevelImage = document.getElementById(`invalid-level-image-${index}`)
        const invalidLevelDescription = document.getElementById(`invalid-level-description-${index}`)

        verify.push(invalidLevelTitle.classList.contains('hidden'))
        verify.push(invalidLevelRating.classList.contains('hidden'))
        verify.push(invalidLevelImage.classList.contains('hidden'))
        verify.push(invalidLevelDescription.classList.contains('hidden'))
    }
    return verify.find(verifyError)
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

const validateQuestion = () => {
    for (let i = 0; i < numQuestions; i++) {
        index = i + 1
        const titleQuestion = document.getElementById(`${index}-question-text`).value
        const errorTitleQuestion = document.getElementById(`invalid-question-${index}`)
        const inputTitleQuestion = document.getElementById(`${index}-question-text`)

        if (!isQuestionTextValid(titleQuestion)) {
            errorTitleQuestion.classList.remove('hidden')
            inputTitleQuestion.classList.add('invalid-input')
        } else {
            errorTitleQuestion.classList.add('hidden')
            inputTitleQuestion.classList.remove('invalid-input')
        }

        const colorQuestion = document.getElementById(`${index}-question-background`).value
        const errorColorQuestion = document.getElementById(`invalid-color-${index}`)
        const inputColorQuestion = document.getElementById(`${index}-question-background`)

        if (!isValidHexColor(colorQuestion)) {
            errorColorQuestion.classList.remove('hidden')
            inputColorQuestion.classList.add('invalid-input')
        } else {
            errorColorQuestion.classList.add('hidden')
            inputColorQuestion.classList.remove('invalid-input')
        }
    }
}

const validateMandatoryAnswers = () => {
    for (let i = 0; i < numQuestions; i++) {
        index = i + 1
        const correctAnswer = document.getElementById(`${index}-correct-answer`).value
        const errorCorrectAnswer = document.getElementById(`invalid-correct-${index}`)
        const inputCorrectAnswer = document.getElementById(`${index}-correct-answer`)
        if (!isNotEmpty(correctAnswer)) {
            errorCorrectAnswer.classList.remove('hidden')
            inputCorrectAnswer.classList.add('invalid-input')
        } else {
            errorCorrectAnswer.classList.add('hidden')
            inputCorrectAnswer.classList.remove('invalid-input')
        }

        const firstWrongAnswer = document.getElementById(`${index}-first-wrong-answer`).value
        const errorFirstWrongAnswer = document.getElementById(`invalid-first-wrong-${index}`)
        const inputFirstWrongAnswer = document.getElementById(`${index}-first-wrong-answer`)
        if (!isNotEmpty(firstWrongAnswer)) {

            errorFirstWrongAnswer.classList.remove('hidden')
            inputFirstWrongAnswer.classList.add('invalid-input')
        } else {
            errorFirstWrongAnswer.classList.add('hidden')
            inputFirstWrongAnswer.classList.remove('invalid-input')
        }

        const correctUrl = document.getElementById(`${index}-correct-url-img`).value
        const errorCorrectUrl = document.getElementById(`invalid-correct-url-${index}`)
        const inputCorrectUrl = document.getElementById(`${index}-correct-url-img`)
        if (!isValidUrl(correctUrl)) {
            errorCorrectUrl.classList.remove('hidden')
            inputCorrectUrl.classList.add('invalid-input')
        } else {
            errorCorrectUrl.classList.add('hidden')
            inputCorrectUrl.classList.remove('invalid-input')
        }

        const firstWrongUrl = document.getElementById(`${index}-first-wrong-url-img`).value
        const errorFirstWrongUrl = document.getElementById(`invalid-first-url-${index}`)
        const inputFirstWrongUrl = document.getElementById(`${index}-first-wrong-url-img`)
        if (!isValidUrl(firstWrongUrl)) {
            errorFirstWrongUrl.classList.remove('hidden')
            inputFirstWrongUrl.classList.add('invalid-input')
        } else {
            errorFirstWrongUrl.classList.add('hidden')
            inputFirstWrongUrl.classList.remove('invalid-input')
        }
    }
}
const validateOptionalAnswers = () => {
    for (let i = 0; i < numQuestions; i++) {
        index = i + 1

        let secondWrongInputs = document.getElementById(`second-${index}`)
        let thirdWrongInputs = document.getElementById(`third-${index}`)

        if (!secondWrongInputs.classList.contains('hidden')) {
            const secondWrongAnswer = document.getElementById(`${index}-second-wrong-answer`).value
            const errorSecondWrongAnswer = document.getElementById(`invalid-second-wrong-${index}`)
            const inputSecondWrongAnswer = document.getElementById(`${index}-second-wrong-answer`)
            if (!isNotEmpty(secondWrongAnswer)) {

                errorSecondWrongAnswer.classList.remove('hidden')
                inputSecondWrongAnswer.classList.add('invalid-input')
            } else {
                errorSecondWrongAnswer.classList.add('hidden')
                inputSecondWrongAnswer.classList.remove('invalid-input')
            }

            const secondWrongUrl = document.getElementById(`${index}-second-wrong-url-img`).value
            const errorSecondWrongUrl = document.getElementById(`invalid-second-url-${index}`)
            const inputSecondWrongUrl = document.getElementById(`${index}-second-wrong-url-img`)
            if (!isValidUrl(secondWrongUrl)) {
                errorSecondWrongUrl.classList.remove('hidden')
                inputSecondWrongUrl.classList.add('invalid-input')
            } else {
                errorSecondWrongUrl.classList.add('hidden')
                inputSecondWrongUrl.classList.remove('invalid-input')
            }
        }

        if (!thirdWrongInputs.classList.contains('hidden')) {
            const thirdWrongAnswer = document.getElementById(`${index}-third-wrong-answer`).value
            const errorthirdWrongAnswer = document.getElementById(`invalid-third-wrong-${index}`)
            const inputthirdWrongAnswer = document.getElementById(`${index}-third-wrong-answer`)

            if (!isNotEmpty(thirdWrongAnswer)) {
                errorthirdWrongAnswer.classList.remove('hidden')
                inputthirdWrongAnswer.classList.add('invalid-input')
            } else {
                errorthirdWrongAnswer.classList.add('hidden')
                inputthirdWrongAnswer.classList.remove('invalid-input')
            }

            const thirdWrongUrl = document.getElementById(`${index}-third-wrong-url-img`).value
            const errorthirdWrongUrl = document.getElementById(`invalid-third-url-${index}`)
            const inputthirdWrongUrl = document.getElementById(`${index}-third-wrong-url-img`)

            if (!isValidUrl(thirdWrongUrl)) {
                errorthirdWrongUrl.classList.remove('hidden')
                inputthirdWrongUrl.classList.add('invalid-input')
            } else {
                errorthirdWrongUrl.classList.add('hidden')
                inputthirdWrongUrl.classList.remove('invalid-input')
            }

        }
    }

}

const validateLevel = () => {
    for (let i = 0; i < numLevels; i++) {
        const index = i + 1;

        const levelTitle = document.getElementById(`level-title-${index}`).value
        const levelTitleInput = document.getElementById(`level-title-${index}`)
        const levelTitleError = document.getElementById(`invalid-level-title-${index}`)

        if(!isLevelTitleValid(levelTitle)){
            levelTitleInput.classList.add('invalid-input')
            levelTitleError.classList.remove('hidden')
        }else {
            levelTitleInput.classList.remove('invalid-input')
            levelTitleError.classList.add('hidden')
        }

        const levelRating = parseFloat(document.getElementById(`rating-level-${index}`).value)
        const levelRatingInput = document.getElementById(`rating-level-${index}`)
        const levelRatingError = document.getElementById(`invalid-level-rating-${index}`)
        if(!isPercentageValid(levelRating)){
            levelRatingInput.classList.add('invalid-input')
            levelRatingError.classList.remove('hidden')
        }else {
            levelRatingInput.classList.remove('invalid-input')
            levelRatingError.classList.add('hidden')
        }

        const levelImage = document.getElementById(`level-img-url-${index}`).value
        const levelImageInput = document.getElementById(`level-img-url-${index}`)
        const levelImageError = document.getElementById(`invalid-level-image-${index}`)
        if(!isValidUrl(levelImage)){
            levelImageInput.classList.add('invalid-input')
            levelImageError.classList.remove('hidden')
        }else {
            levelImageInput.classList.remove('invalid-input')
            levelImageError.classList.add('hidden')
        }

        const levelDescription = document.getElementById(`level-description-${index}`).value
        const levelDescriptionInput = document.getElementById(`level-description-${index}`)
        const levelDescriptionError = document.getElementById(`invalid-level-description-${index}`)
        if(!isLevelDescriptionValid(levelDescription)){
            levelDescriptionInput.classList.add('invalid-input')
            levelDescriptionError.classList.remove('hidden')
        }else {
            levelDescriptionInput.classList.remove('invalid-input')
            levelDescriptionError.classList.add('hidden')
        }
    }
}

//LIBERA (OU NÃO) AS PROXIMAS PAGINAS
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

const goToLevels = () => {
    getQuestionInfos()
    validateQuestion()
    validateMandatoryAnswers()
    validateOptionalAnswers()
    if (isValidQuestion() != false && isValidMandatoryAnswers() != false && isValidOptionalAnswers != false) {
        loadLevelsInputs()
        document.querySelector('.create-quizz-questions').classList.add('hidden')
        document.querySelector('.create-quizz-levels').classList.remove('hidden')
    }
}

const finishCreateQuizz = () => {
    getLevelInfos()
    validateLevel()
    if(thereIsZeroPercent() != 0){
        alert("Pelo menos um nível deve ter acerto mínimo igual a 0%")
    }

    if(IsValidLevel() != false && thereIsZeroPercent() == 0){
        postResponse = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', quizzObj)
        document.querySelector('.create-quizz-levels').classList.add('hidden')
        document.querySelector('.create-quizz-success').classList.remove('hidden')
        cleanCreateQuizzInfos()
    }

    console.log(quizzObj)
}

//CARREGA OS CAMPOS NECESSÁRIOS DE ACORDO COM O VALOR INFORMADO PELO USUÁRIO
const loadQuestionsInputs = () => {
    let questionsInputs = ''
    let createQuestionsContainer = document.getElementById('questions-inputs')
    for (let i = 0; i < (numQuestions - 1); i++) {
        let index = i + 2
        questionsInputs += `
        <div id="min-${index}" class="min-question-inputs" onclick="showQuestionInputs('min-${index}','question-${index}')">
            <div>
                <p>Pergunta ${index}</p>
                <img src="./img/Vector.png" alt="editar">
            </div>        
        </div>
        <div id="question-${index}" class="inputs inputs-separate hidden">
            <h3>Pergunta ${index}</h3>
            <div class="group-inputs">
                <input id="${index}-question-text" class="create-quizz-input" type="text" placeholder="Texto da pergunta">
                <p id="invalid-question-${index}" class="invalid-error-message hidden">O texto da pergunta deve ter no mínimo 20 caracteres</p>

                <input id="${index}-question-background" class="create-quizz-input" type="text" placeholder="Cor de fundo da pergunta">
                <p id="invalid-color-${index}" class="invalid-error-message hidden">O valor informado deve ser uma cor em hexadecimal</p>
            </div>

            <h3>Resposta correta</h3>
            <div class="group-inputs">
                <input id="${index}-correct-answer" class="create-quizz-input" type="text" placeholder="Resposta correta">
                <p id="invalid-correct-${index}" class="invalid-error-message hidden">O campo não pode estar vazio</p>

                <input id="${index}-correct-url-img" class="create-quizz-input" type="text" placeholder="URL da imagem">
                <p id="invalid-correct-url-${index}" class="invalid-error-message hidden">O valor informado não é uma url válida</p>
            </div>

            <h3>Respostas incorretas</h3>
            <div class="group-inputs">
                <input id="${index}-first-wrong-answer" class="create-quizz-input" type="text" placeholder="Resposta incorreta 1">
                <p id="invalid-first-wrong-${index}" class="invalid-error-message hidden">O campo não pode estar vazio</p>

                <input id="${index}-first-wrong-url-img" class="create-quizz-input" type="text" placeholder="URL da imagem 1">
                <p id="invalid-first-url-${index}" class="invalid-error-message hidden">O valor informado não é uma url válida</p>
            </div>

            <div id="second-${index}" class="group-inputs hidden">
                <input id="${index}-second-wrong-answer" class="create-quizz-input" type="text" placeholder="Resposta incorreta 2">
                <p id="invalid-second-wrong-${index}" class="invalid-error-message hidden">O campo não pode estar vazio</p>

                <input id="${index}-second-wrong-url-img" class="create-quizz-input" type="text" placeholder="URL da imagem 2">
                <p id="invalid-second-url-${index}" class="invalid-error-message hidden">O valor informado não é uma url válida</p>
            </div>

            <div id="third-${index}" class="group-inputs hidden">
                <input id="${index}-third-wrong-answer" class="create-quizz-input" type="text" placeholder="Resposta incorreta 3">
                <p id="invalid-third-wrong-${index}" class="invalid-error-message hidden">O campo não pode estar vazio</p>

                <input id="${index}-third-wrong-url-img" class="create-quizz-input" type="text" placeholder="URL da imagem 3">
                <p id="invalid-third-url-${index}" class="invalid-error-message hidden">O valor informado não é uma url válida</p>
            </div>
            <div id="add-answer-${index}" class="min-question-inputs" onclick="addAnswer('second-${index}', 'third-${index}', 'add-answer-${index}')">
                <div>
                    <p>Adicionar resposta</p>
                    <ion-icon name="add-outline"></ion-icon>
                </div>        
            </div>
        </div>`
    }
    createQuestionsContainer.innerHTML += questionsInputs
}

const loadLevelsInputs = () => {
    let levelsInputs = ''
    let createLevelsContainer = document.getElementById('levels-inputs')
    for (let i = 0; i < (numLevels - 1); i++) {
        const index = i + 2
        levelsInputs += `
        <div id="min-level-${index}" class="min-level-inputs min-level-selected" onclick="showLevelInputs('min-level-${index}','level-${index}')">
                <div>
                    <p>Nível ${index}</p>
                    <img src="./img/Vector.png" alt="editar">
                </div>
            </div>
            <div id="level-${index}" class="inputs hidden">
                <h3>Nível ${index}</h3>
                <div class="group-inputs">
                        <input id="level-title-${index}" class="create-quizz-input" type="text" placeholder="Título do nível">
                        <p id="invalid-level-title-${index}" class="invalid-error-message hidden">O título do nível deve ter no mínimo 20 caracteres</p>
                    </div>                   
                    <div class="group-inputs">
                        <input id="rating-level-${index}" class="create-quizz-input" type="text" placeholder="% acerto mínima">
                        <p id="invalid-level-rating-${index}" class="invalid-error-message hidden">O valor informado deve ser entre 0 e 100</p>
                    </div>
                    <div class="group-inputs">
                        <input id="level-img-url-${index}" class="create-quizz-input" type="text" placeholder="URL da imagem do nível">
                        <p id="invalid-level-image-${index}" class="invalid-error-message hidden">O valor informado não é uma url válida</p>
                    </div>
                    
                    <div class="group-inputs">
                        <textarea id="level-description-${index}" class="create-quizz-textarea" type="text" placeholder="Descrição do nível"></textarea>
                        <p id="invalid-level-description-${index}" class="invalid-error-message hidden">A descrição deve ter no mínimo 30 caracteres</p>
                    </div>
            </div>
        `
    }
    createLevelsContainer.innerHTML += levelsInputs
}

//MINIMIZA OS INPUTS DAS INFORMAÇÕES QUE NÃO ESTÃO SENDO EDITADAS
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
    max.scrollIntoView({ block: "end", behavior: "smooth" })
}

const showLevelInputs = (minDiv, maxDiv) => {
    let maxSelected = document.querySelector('.level-selected')
    let minSelected = document.querySelector('.min-level-selected')
    let min = document.getElementById(minDiv)
    let max = document.getElementById(maxDiv)
    if (maxSelected != null && minSelected != null) {
        console.log('tem min/max selected')
        minSelected.classList.remove('hidden', 'min-level-selected')
        maxSelected.classList.add('hidden')
        maxSelected.classList.remove('level-selected')
    } 
    min.classList.add('hidden', 'min-level-selected')
    max.classList.add('level-selected')
    max.classList.remove('hidden')
    max.scrollIntoView({ block: "end", behavior: "smooth" })
}

//ADICIONA OS INPUTS PARA AS RESPOSTAS NÃO OBRIGATÓRIAS
const addAnswer = (secondAnswer, thirdAnswer, button) => {
    const second = document.getElementById(`${secondAnswer}`)
    const third = document.getElementById(`${thirdAnswer}`)
    const addButton = document.getElementById(`${button}`)

    if (second.classList.contains('hidden')) {
        second.classList.remove('hidden')
        second.scrollIntoView({ block: "start", behavior: "smooth" })
    } else if (!second.classList.contains('hidden') && third.classList.contains('hidden')) {
        third.classList.remove('hidden')
        third.scrollIntoView({ block: "start", behavior: "smooth" })
        addButton.classList.add('hidden')
    }
}

//LIMPA AS INFORMAÇÕES SALVAS DO QUIZZ CRIADO
const cleanCreateQuizzInfos = () => {
    quizzObj = {
        title: '',
        image: '',
        questions: [],
        levels: []
    }

    let inputs = document.querySelectorAll('.create-quizz input')
    inputs.forEach(input => {
        input.value = ''
    })
    console.log(quizzObj)
}