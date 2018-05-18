import K from 'kefir'
import { isNumber } from 'util';

//Dom elem
const root = document.querySelector('#root')
const inputNumber = document.querySelector('.input-add')

const inc$ = K.fromEvents(document.body, "click").filter(({ currentTarget }) => currentTarget.matches('.inc')).map(_ => 1)
const dec$ = K.fromEvents(document.body, "click").filter(({ currentTarget }) => currentTarget.matches('.dec')).map(_ => -1)
const input$ = K.fromEvents(document.body, "click")
    .filter(({ target }) => target.matches('.add'))
    .filter(_ => isFinite(inputNumber.value)) //Сheck for a number
    .map(_ => +inputNumber.value)

const state$ = K.merge([inc$, dec$, input$]).scan((prev, next) => prev + next)

const render = function (state) {
    return `
    <div class="counterOut">
        <span>${state}</span>
    </div>
    <button type="button" class="inc">+</button>
    <button type="button" class="dec">-</button>
    <input type="number" class="input-add" />
    <button type="button" class="add">go</button>
    `
}

state$.observe(count => root.innerHTML = render(count))
