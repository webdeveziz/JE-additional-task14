// Доп. Задание 1

class CustomSelect {
  #id; #options; #currentSelectedOption
  constructor(id , options) {
    this.#id  = id 
    this.#options = options
    this.#currentSelectedOption = ''
  }

  #createElem(nodeName, cls = '', isId = false, text = '') { // Процесс создания Элемента
    const elem = document.createElement(nodeName)
    if(cls) {
      elem.classList.add(cls)
      if(isId){
        const id = `${cls}--${this.#id}`
        elem.classList.add(id)
      }
    }
    if(text) elem.textContent = text
    return elem
  }

  get selectedValue() {
    return this.#currentSelectedOption
  }

  
  render(container){
    const selectDropdown = this.#createElem('div', 'select-dropdown', true)
    const selectDropdownBtn = this.#createElem('button', 'select-dropdown__button', true)
    const span = this.#createElem('span', 'select-dropdown', true, 'Выберите элемент')
    selectDropdownBtn.append(span)
  
    const selectDropdownList = this.#createElem('ul', 'select-dropdown__list', true)
    for (let i = 0; i < 5; i++){
      const li = this.#createElem('li', 'select-dropdown__list-item', false, this.#options[i].text)
      li.dataset.value = this.#options[i].value
      selectDropdownList.append(li)
    }

    selectDropdown.append(selectDropdownBtn, selectDropdownList)
    container.append(selectDropdown)

    
    container.addEventListener('click', (event) => {
      if(selectDropdownList.classList.contains('active')){
        selectDropdownList.classList.remove('active')
      } else selectDropdownList.classList.add('active')

      if(event.target.tagName === 'LI'){
        const lists = document.querySelectorAll('.select-dropdown__list-item')
        lists.forEach(el => el.classList.remove('selected'))
        event.target.classList.add('selected')

        const technology = this.#options.filter(function (elem) {
          return Number(elem.value) === Number(event.target.dataset.value)
        })

        this.#currentSelectedOption = technology[0]

        document.querySelector('.select-dropdown').querySelector('.select-dropdown').textContent = this.selectedValue.text
      }
    })
  }
}

const options = [
  { value: 1, text: 'JavaScript' },
  { value: 2, text: 'NodeJS' },
  { value: 3, text: 'ReactJS' },
  { value: 4, text: 'HTML' },
  { value: 5, text: 'CSS' }
]

const customSelect = new CustomSelect('123', options)
const mainContainer = document.querySelector('#container')
customSelect.render(mainContainer)