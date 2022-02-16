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