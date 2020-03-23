import { Question } from './question'
import './style.css'
import { isValid, createModal } from './utils'
import { getAuthForm, authWithEmailAndPassword } from './auth'

const form = document.querySelector('#form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')
const modalBtn = document.querySelector('#modal-btn')

window.addEventListener('load', Question.renderList)

modalBtn.addEventListener('click', openModal)

form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
    event.preventDefault()
    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }
        submitBtn.disabled = true
        // async reeq to serve to save question

        Question.create(question)
            .then(() => {
                input.value = ''
                input.className = ''
                submitBtn.disabled = false
            })

    }
}


function openModal() {
    createModal('Авторизація', getAuthForm())
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, { once: true })
}

function authFormHandler(event) {
    event.preventDefault()

    const btn = event.target.querySelector('button')

    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value

    btn.disabled = true

    authWithEmailAndPassword(email, password)
        .then(token => {
            return Question.fetch(token)
        })
        .then(renderModalAfterAuth)
        .then(() => btn.disabled = false)
}

function renderModalAfterAuth(content) {
    if(typeof content === 'string') {
        createModal('Помилка', content)
    } else {
        createModal('Список питань', Question.listToHtml(content))
    }
}