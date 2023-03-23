var form = document.querySelector('.formWithValidation')
var validateBtn = form.querySelector('.validateBtn')
var name = form.querySelector('.name')
var password = form.querySelector('.password')
var verification = form.querySelector('.verification')
var fields = form.querySelectorAll('.field')
form.addEventListener('submit', function(event){
    event.preventDefault()

    var errors = form.querySelectorAll('.error')
    for (var i = 0; i < errors.length; i++){
        errors[i].remove()
    }

    for (var i = 0; i < fields.length; i++){
        if (!fields[i].value){
            console.log('field is blank', fields[i])
            var error = document.createElement('div')
            error.className = 'error'
            error.style.color = 'red'
            error.innerHTML = 'Cannot be blank'
            form[i].parentElement.insertBefore(error, fields[i])
        }
    }
})