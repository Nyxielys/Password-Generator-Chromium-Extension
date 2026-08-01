document.addEventListener("DOMContentLoaded", async () => {
    const slider = document.getElementById('ch_num')
    const output = document.getElementById('sliderValue')
    const generatePasswordBtn = document.getElementById('generate_password')
    const copyBtn = document.getElementById('copy_password')

    // Set default slider value (next to the slider)
    output.textContent = slider.value

    // Update with the slider value (next to the slider)
    slider.addEventListener('input', async (event) => {
        output.textContent = event.target.value
    })

    // Generate a random password when "Generate Password" pressed
    generatePasswordBtn.addEventListener('click', async () => {
        generatePassword()
    })

    // Copy generated password
    copyBtn.addEventListener('click', async () =>  {
        var password = document.getElementById('password_area').value
        if (password === "") {
            alert("No password generated")
            return;
        }

        navigator.clipboard.writeText(password)
        .then(() => 
            copyBtn.textContent = 'Copied!',
            copyBtn.disabled = "true",
            setTimeout(() => {
                copyBtn.textContent = "Copy"
                copyBtn.removeAttribute('disabled')
            }, 1.5*1000)
        )
        .catch(err => console.error(`Failed to copy password: `, err))
    })
})

// Generate Password function
async function generatePassword() {

    var hasUppercase = document.querySelector('#uppercase')
    hasUppercase = hasUppercase.checked

    var hasLowercase = document.querySelector('#lowercase')
    hasLowercase = hasLowercase.checked

    var hasNumbers = document.querySelector('#numbers')
    hasNumbers = hasNumbers.checked

    var hasSymbols = document.querySelector('#symbols')
    hasSymbols = hasSymbols.checked

    var charList = ''
    if (hasUppercase === true) {
        charList = `${charList}ABCDEFGHIJKLMNOPQRSTUVWXYZ`
    }
    if (hasLowercase === true) {
        charList = `${charList}abcdefghijklmnopqrstuvwxyz`
    }
    if (hasNumbers === true) {
        charList = `${charList}1234567890`
    }
    if (hasSymbols === true) {
        charList = `${charList}?./:§!%*$=@{}[]()_+-`
    }

    if (charList === '') {
        alert('Please select at least one parameter.')
        return;
    }

    var length = document.getElementById('ch_num')
    length = length.value

    var password = ""
    for (i=0; i<length; i++) {
        var randomChar = Math.floor(Math.random() * charList.length)
        password += charList[randomChar]
    }

    document.getElementById('password_area').value = password

};