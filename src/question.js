export class Question {
    static create(question) {
        return fetch('https://podcast-question-app-bfef3.firebaseio.com/question.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'aplication/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                question.id = response.name
                return question
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }
    static renderList() {
        const questions = getQuestionsFromLocalStorage()
        const html = questions.length
            ? questions.map(toCard).join('')
            : ` <div class="mui--text-headline">Ви поки, що нічого не питали..</div>`
        const list = document.getElementById('list')
        list.innerHTML = html
    }

    static fetch(token) {
        if(!token) {
            return Promise.resolve(`<p class="error">У вас немає доступу!</p>`)
        }
        return fetch(`https://podcast-question-app-bfef3.firebaseio.com/question.json?auth=${token}`)
            .then(res => res.json())
            .then(res => {
                if(res && res.error) {
                    return `<p class="error">${res.error}</p>`
                }
                return res ? Object.keys(res).map(key => ({
                    ...res[key],
                    id: key
                })) : []
            })
    }

    static listToHtml (questions) {
        return questions.length 
        ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
        : '<p>Питань поки, що немає!'
    }
}

function addToLocalStorage(question) {
    const all = getQuestionsFromLocalStorage()
    all.push(question)
    localStorage.setItem('questions', JSON.stringify(all))
}

function toCard(question) {
    return `
        <div class="mui--text-black-54">
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div>${question.text}</div>
        <br>
    `
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}