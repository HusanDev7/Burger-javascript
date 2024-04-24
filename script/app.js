let menu = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },

    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },

}

let burgerBtns = document.querySelectorAll('.wrapper__list-btn'),
    cartBtn = document.querySelector('.wrapper__navbar-btn'),
    cardlist = document.querySelector('.wrapper__navbar-basket'),
    cardClose = document.querySelector('.wrapper__navbar-close'),
    cardAmount = document.querySelector('.warapper__navbar-count'),
    cardTotalPrice = document.querySelector('.wrapper__navbar-totalprice'),
    cardListItem = document.querySelector('.wrapper__navbar-checklist')

burgerBtns.forEach((btn, i) => {
    btn.addEventListener('click', function () {
        addAmount(this)
    })
})

function addAmount(btn) {
    let parent = btn.closest('.wrapper__list-card')
    let id = parent.getAttribute('id')
    menu[id].amount++
    basket()
}

function basket() {
    let cards = []
    for (let key in menu) {
        let burger = menu[key]
        let productBurger = document.querySelector(`#${key}`)
        let productCount = productBurger.querySelector('.wrapper__list-count')
        if (burger.amount > 0) {
            cards.push(burger)
            productCount.classList.add('active')
            productCount.innerHTML = burger.amount
        } else {
            productCount.classList.remove('active')
            productCount.innerHTML = ''
        }
    }
    let allCount = totalAmount()
    if (allCount > 0) {
        cardAmount.classList.add('active')
        cardAmount.innerHTML = allCount
    } else {
        cardAmount.classList.remove('active')
    }

    cardListItem.innerHTML = '';
    cards.forEach((item)=> {
        cardListItem.innerHTML += createBurger (item)
    })

    cardTotalPrice.innerHTML = allSum()
}

function allSum() {
    let allSum = 0;
    for(let i in menu) {
        allSum = allSum + menu[i].totalSum
    }
    return allSum
}

function totalAmount() {
    let total = 0
    for (let key in menu) {
        total += menu[key].amount;
    }

    return total

}


function createBurger(burger) {
    return `<div class="nav__item" id="${burger.name.toLowerCase()}-item">
    <div class="nav__item-left">
    <img src="${burger.img}" alt="">
    <div class="nav__item-info">
    <p>${burger.name}</p>
    <p>${burger.totalSum} cум</p>
    </div>
    </div>
    <div class="nav__item-right">
        <button class="nav__item-btn" data-simbol="-">-</button>
        <span class="nav__item-count">${burger.amount}</span>
        <button class="nav__item-btn" data-simbol="+">+</button>
        </div>
        </div>`
    }

    window.addEventListener('click', (event)=> {
        if(event.target.classList.contains('nav__item-btn')) {
            let dataValue = event.target.getAttribute('data-simbol')
            let parentBurger = event.target.closest('.nav__item')
            if(parentBurger) {
                let id = parentBurger.getAttribute('id').split('-')[0]
                console.log(id);
                if(dataValue == '-') {
                    menu[id].amount--
                } else if (dataValue == '+') {
                    menu[id].amount++
                }
                basket()
            }
        }
    })

cartBtn.addEventListener('click', () => {
    cardlist.classList.add('active')
})
    
cardClose.addEventListener('click', () => {
    cardlist.classList.remove('active')
})
