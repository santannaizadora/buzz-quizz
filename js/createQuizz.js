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

const isQuizzTitleValid = (title) => {
    if (title.length >= 20 && title.length <= 65) {
        return true
    }
    return false
}

const isValidUrl = (url) => {
    var isValid = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
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

const getBasicInfos = () => {
    quizzObj.title = document.getElementById('create-title').value
    quizzObj.image = document.getElementById('create-img-url').value
    numQuestions = document.getElementById('create-num-questions').value
    numLevels = document.getElementById('create-num-levels').value
}

const validateBasicInfos = () => {
    getBasicInfos()
    if (isQuizzTitleValid(quizzObj.title) && isValidUrl(quizzObj.image) && isNumQuestionsValid(numQuestions) && isNumLevelsValid(numLevels)) {
        return true
    }
    return false
}

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

const goToQuestions = () => {
    let isAllValid = validateBasicInfos()
    if (isAllValid) {
        document.querySelector('.create-quizz-info').classList.add('hidden')
        document.querySelector('.create-quizz-questions').classList.remove('hidden')
    } else {
        invalidBasicInfos()
    }
}