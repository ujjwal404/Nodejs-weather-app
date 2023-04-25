const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageTwo.textContent = ''
        messageOne.textContent = data.error
      } else {
        messageTwo.textContent = data.forecast2
        messageOne.textContent = data.forecast
        messageThree.textContent = data.forecast1
        messageFour.textContent = data.location
      }
    })
  })
})
