//PHONE CHECKER

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [25793]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'ok'
        phoneResult.style.color= 'green'
    } else {
        phoneResult.innerHTML = ' not ok'
        phoneResult.style.color= 'red'
    }
}

//Tab Slider ( и 3 дз первая часть)

const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')


const hideTabContent = () => {
    tabContentBlocks.forEach(tabCard => {
        tabCard.style.display = 'none'
    })
    tabs.forEach(tab => {
        tab.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (tabIndex = 0) => {
    tabContentBlocks[tabIndex].style.display = 'block'
    tabs[tabIndex].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab,tabIndex) => {
            if(event.target === tab){
                hideTabContent()
                showTabContent(tabIndex)
            }

        })
    }
}
const autoTabContent = (i = 0) => {
    setInterval(() => {
        i++
        if (i > tabs.length - 1){
            i = 0
        }
        hideTabContent()
        showTabContent(i)
        },3000)
}
autoTabContent()

//CONVERTOR (дз 5)



const usd = document.querySelector('#usd')
const som = document.querySelector('#som')
const zireksCurrency = document.querySelector('#zireksCurrency')
const converter = (element, targetElement, target2, current) => {
    element.oninput = () => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET' , '../data/converter.json')
        xhr.setRequestHeader('Content-type' , 'application/json')
        xhr.send()

        xhr.onload = () => {
            const data = JSON.parse(xhr.response)

            switch (current) {
                case 'som':
                    targetElement.value = (element.value / data.usd).toFixed(2)
                    target2.value = (element.value / data.zireksCurrency).toFixed(2)
                    break
                case 'usd' :
                    targetElement.value = (element.value * data.usd).toFixed(2)
                    target2.value = (element.value * data.zireksCurrency / data.usd).toFixed(2)
                    break
                case 'zireksCurrency' :
                    targetElement.value = (element.value * data.zireksCurrency).toFixed(2)
                    target2.value = (element.value * (data.usd / data.zireksCurrency)).toFixed(2)
                    break
                default:
                    break
            }
           if (element.value === '' || targetElement.value === ''){
                targetElement.value = ''
                target2.value = ''
            }
            }
        }
}

converter(som, usd, zireksCurrency,'som')
converter(usd, som, zireksCurrency,'usd')
converter(zireksCurrency, usd, som, 'zireksCurrency')



