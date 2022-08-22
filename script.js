const showPanelBtn = document.querySelector('.add-transaction')
const deleteAllBtn = document.querySelector('.delete-all')
const lightBtn = document.querySelector('.light')
const darkBtn = document.querySelector('.dark')
const addNewBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')

const inputName = document.querySelector('#name')
const inputAmount = document.querySelector('#amount')
const categorySelect = document.querySelector('#category')

const money = document.querySelector('.available-money')
const income = document.querySelector('.income-area')
const expense = document.querySelector('.expenses-area')
const addPanel = document.querySelector('.add-transaction-panel') 

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectCategory;
let moneyArr = [0];

const showPanel = () => {
    if (addPanel.style.display === 'flex') {
        closePanel()
    } else {
        addPanel.style.display = 'flex'
    } 
}

const closePanel = () => {
    addPanel.style.display = 'none'
    inputName.value = ''
    inputAmount.value = ''
    categorySelect.selectedIndex = 0;
}

const checkInputs  = () => {
    if (inputName.value === '' || inputAmount.value === '' || categorySelect.value === 'none') {
        alert('Wypełnij wszystkie pola!')
    } else {
       createNewItem()
    }
}

const createNewItem = () => {
    if (inputAmount.value == 0) {
        alert('Nie można dodać kwoty 0 PLN')
    } else {
        categoryIcon = categorySelect.value
        const newTransation = document.createElement('div')
        newTransation.classList.add('transaction')
        newTransation.setAttribute('id', ID)

        const newText = document.createElement('p')
        const newText2 = document.createElement('p')

        newText.classList.add('transaction-name')
        newText.innerHTML = `<i class="fas ${categoryIcon}"></i> ${inputName.value}</p>`

        newText2.classList.add('transaction-amount')
        if (categorySelect.value !== 'fa-money-bill-wave') {
            inputAmount.value = `-${inputAmount.value}`
        }
        newText2.innerHTML = `${inputAmount.value}zł <button class="delete" onclick="deleteTransation(${ID})"><i class="fas fa-times"></i></button>`

        newTransation.append(newText, newText2)

        if (inputAmount.value > 0) {
            income.append(newTransation)
        } else {
            expense.append(newTransation)
        }

        moneyArr.push(parseFloat(inputAmount.value))

        ID++
        closePanel()
        countMoney(moneyArr)
    }
}

const countMoney = x => {
    const newMoney = x.reduce((a, b) => a + b)
    money.textContent = `${newMoney} zł`
}

const deleteTransation = (id) => {
    const transactionToDelete = document.getElementById(id)
    const transactionAmount = parseFloat(transactionToDelete.childNodes[1].innerText)
    const indexOfTransaction = moneyArr.indexOf(transactionAmount)
    moneyArr.splice(indexOfTransaction, 1)

    transactionToDelete.remove()

    countMoney(moneyArr)
}

const deleteAll = () => {
    income.innerHTML = '<h3>Przychód:</h3>'
    expense.innerHTML = '<h3>Wydatki:</h3>'
    moneyArr = [0];
    money.textContent = '0 zł'
    ID = 0;
}

const changeLightMode = () => {
    root.style.setProperty('--first-color', '#F9F9F9')
    root.style.setProperty('--second-color', '#14161F')
    root.style.setProperty('--border-color', 'rgba(0, 0, 0, .2)')
}

const changeDarkMode = () => {
    root.style.setProperty('--first-color', '#14161F')
    root.style.setProperty('--second-color', '#F9F9F9')
    root.style.setProperty('--border-color', 'rgba(255,255,255, .4)')
}

showPanelBtn.addEventListener('click', showPanel)
cancelBtn.addEventListener('click', showPanel)
addNewBtn.addEventListener('click', checkInputs)
deleteAllBtn.addEventListener('click', deleteAll)
lightBtn.addEventListener('click', changeLightMode)
darkBtn.addEventListener('click', changeDarkMode)