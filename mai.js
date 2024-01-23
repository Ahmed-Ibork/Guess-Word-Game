// Get InputContainer From The Page :
let InputContainer = document.querySelectorAll('.word-place')
// Get The Category :
let Category = document.querySelector('.word')

// Object Contains Four List :
let Words_List = {
    programming: ['python', 'javascript', 'php', 'css', 'django', 'dart', 'ruby'],
    countries: ['morocco', 'egypt', 'ksa', 'palestine', 'yemen', 'iraq', 'tunisia', 'syria'],
    animals: ['lion', 'tiger', 'elephant', 'deer', 'cat', 'fox', 'giraffe', 'dog'],
    names: ['mohammed', 'ahmed', 'khalid', 'ibrahim', 'ali', 'fatima', 'khadija', 'rkia', "zohra", 'fatiha', 'naima', 'firass', 'sinann', 'bahry', 'salaheldin', 'sabir', 'zohair'],
}

// Words_List Keys As List :
let Words_List_Keys = Object.keys(Words_List)

// Choose A Key From Words_List :atiha
let Key = Words_List_Keys[Math.floor(Math.random() * Words_List_Keys.length)]

// Change Category TextContent :
Category.textContent = Key

// Choose A Word From The Key :
let WordRandom = Words_List[Key][Math.floor(Math.random() * Words_List[Key].length)].split('')
// The Future Word :
let WordInput = '_'.repeat(WordRandom.length).split('')
// Add Inputs Element To InputContainer :
AddInputsToPage()

// Some Effects Focus() && Blur() :
FocusAndBlur()

// Check If The Input Word Is True Or Not :
CheckTheWord()

// Number Of Hints :
Hint()

// Jump From Input To Other :
Jump()

function FocusAndBlur() {
    for (let x = 0; x < InputContainer.length; x++) {
        // Get The input Elements From The Current InputContainer :
        let Inputs = InputContainer[x].querySelectorAll('input')
        // Loop To Some Effects (Focus() && Blur()) :
        for(let i = 0; i < Inputs.length; i++) {
            // Input Event :
            Inputs[i].oninput = function () {
                if (this.value.length >= 1) {
                    // Change The Input Content To The Last Character In It :
                    this.value = this.value[this.value.length - 1]
                    // Add A Class :
                    this.classList.add('super-form')
                    // Focus On The Next Input :
                    Inputs[i + 1] ? Inputs[i + 1].focus() : ''
                } else if (this.value.length === 0) {
                    // Remove The Super-Form Class :
                    this.classList.remove('super-form')
                }
            }
        }
    }
    InputContainer[0].querySelectorAll('input')[0].focus()
}
function AddInputsToPage() {
    for (let i = 0; i < InputContainer.length; i++) {
        // Add The input Elements To Current InputContainer :
        for (let x = 0; x < WordRandom.length; x++) {
            // Create </input> Element :
            let input = document.createElement('input')
            // Add Text Attribute To Input :
            input.type = 'text'
            // Add Class To Element :
            input.classList.add('form')
            input.setAttribute('i', `${x}`)
            // Add input To InputContainer Page :
            InputContainer[i].appendChild(input)
            // Add Class To InputContainer :
            if (i !== 0) {
                InputContainer[i].classList.add('disabled')
            }
        }
    }
}
function CheckTheWord() {
    // A Variable :
    //let i = 0; // This Is An Old Way
    // Get Button Element Form The page :
    let Button = document.querySelector('.buttons button:first-child')
    // Button Event :
    Button.onclick = function() {
        // The Current InputContainer : // This Is An Old Way
        // let CurrentInputContainer = InputContainer[i]  // This Is An Old Way
        let CurrentInputContainerIndex; 
        InputContainer.forEach((x, i) => x.classList.contains('disabled') === false ? CurrentInputContainerIndex = i : '')
        let CurrentInputContainer = InputContainer[CurrentInputContainerIndex];
        // Get The input Elements From The Current InputContainer :
        let Inputs = CurrentInputContainer.querySelectorAll('input')
        // Loop Check :
        for (let x = 0; x < WordRandom.length; x++) {
            if (WordRandom.includes(Inputs[x].value.toLocaleLowerCase())) {
                if (WordRandom[x] === Inputs[x].value.toLowerCase()) {
                    Inputs[x].classList.add('in-place')
                    WordInput[x] = Inputs[x].value.toLowerCase()
                } else {
                    Inputs[x].classList.add('not-in-place')
                }
            } else {
                Inputs[x].classList.add('not-exist')
            }
        }
        // Check If The Input Word Equal The Word Random :
        if (WordInput.join('') === WordRandom.join('')) {
            document.getElementById('success').play()
            EndGame(CurrentInputContainerIndex)
            document.querySelector('.info').classList.add('disabled')
        } else {
            if (InputContainer[CurrentInputContainerIndex + 1]) {
                document.getElementById('fail').play()
                // 
                CurrentInputContainer.classList.add('disabled')
                // Change The Value Of Variable a :
                // i++
                // Change The Value Of CurrentInputContainer :
                CurrentInputContainer = InputContainer[CurrentInputContainerIndex + 1]
                // Remove .Disabled Class From CurrentInputContainer :
                CurrentInputContainer.classList.remove('disabled')
                CurrentInputContainer.querySelectorAll('input')[0].focus()
            } else {
                document.querySelector('.info').classList.add('disabled')
                GameOver()
            }
        }
    }

}
function EndGame(i) {
    let PopUp = document.createElement('div')
    let button = document.createElement('button')
    let div = document.createElement('div')
    // Add Classes To The Element :
    PopUp.classList.add('pop_up', 's-color')
    button.classList.add('button')
    div.classList.add('div')
    // Append Childs To Element :
    PopUp.appendChild(document.createTextNode('You Win !'))
    div.appendChild(document.createTextNode(`You made a mistake ${i} ${i <= 1 ? 'time': 'times' }`))
    PopUp.appendChild(div)
    button.appendChild(document.createTextNode('Restart'))
    PopUp.appendChild(button)
    // Append PopUp To Section :
    document.querySelector('.the-game').appendChild(PopUp)
    // Add Disabled Class To InputsContainer :
    InputContainer[i].classList.add('disabled')
    // Command The Button :
    button.onclick = function () {
        location.reload()
    }
}
function GameOver() {
    let PopUp = document.createElement('div')
    let button = document.createElement('button')
    let div = document.createElement('div')
    // Add Classes To The Element :
    PopUp.classList.add('pop_up', 'f-color')
    button.classList.add('button')
    div.classList.add('div')
    // Append Childs To Element :
    PopUp.appendChild(document.createTextNode(`You Lose !`))
    div.appendChild(document.createTextNode(`The Word Was ${WordRandom.join('')}`))
    PopUp.appendChild(div)
    button.appendChild(document.createTextNode('Restart'))
    PopUp.appendChild(button)
    // Append PopUp To Section :
    document.querySelector('.the-game').appendChild(PopUp)
    // Add Disabled Class To InputsContainer :
    InputContainer[5].classList.add('disabled')
    // Command The Button :
    button.onclick = function () {
        location.reload()
    }
    document.getElementById('gameOver').play();
}
function Hint() {
    let NumberOfHints = Math.floor(WordRandom.length / 2)
    // Get Button Element Form The page :
    let Button = document.querySelector('.buttons button:last-child')
    // Get The Span Element From The Button :
    Button.querySelector('span').textContent = NumberOfHints;
    // Click Event On The Button :
    Button.onclick = function() {
        if (NumberOfHints !== 0) {
            InputContainer.forEach((current) => {
                if (current.classList.contains('disabled') === false) {
                    let Inputs = current.querySelectorAll('input')
                    for (let x = 0; x < Inputs.length; x++) {
                        if (Inputs[x].value.toLowerCase() !== WordRandom[x]) {
                            Inputs[x].value = WordRandom[x]
                            Inputs[x].classList.add('super-form')
                            document.getElementById('hints').play();
                            break;
                        }
                    }
                }
            })
            NumberOfHints--
            Button.querySelector('span').textContent = NumberOfHints;
            if (NumberOfHints === 0) {
                Button.querySelector('span').remove()
            }
        } 
    }
}
function Jump() {
    document.onkeydown = function (E) {
        let CurrentInputContainer = document.querySelector('.word-place:not(.disabled)'); // NewWay
        // InputContainer.forEach((x) => x.classList.contains('disabled') === false ? CurrentInputContainer = x: '')
        Inputs = CurrentInputContainer.querySelectorAll('input')
        //Array.from(Inputs).indexOf(document.activeElement) + 1 // NewWay
        if (E.target.classList.contains('form')) {
            let Index = +E.target.getAttribute('i');

            if (E.key === "ArrowRight") {
                Inputs[Index + 1] ? Inputs[Index + 1].focus() : Inputs[0].focus()
            } else if (E.key === "ArrowLeft") {
                Inputs[Index - 1] ? Inputs[Index - 1].focus() : Inputs[Inputs.length - 1 ].focus()
            } else if (E.key === "Backspace") {
                Inputs[Index - 1] ? Inputs[Index - 1].focus() : ''
                !Inputs[Index + 1] ? Inputs[Index].classList.toggle('super-form') : ''
                !Inputs[Index + 1] ? Inputs[Index].value = '' : ''
            }
        }
        E.key === 'Enter' ? Enter() : ''
    }
}
// Get Button Element Form The page :
 let Button = document.querySelector('.buttons button:last-child')
// Get The Span Element From The Button :
let AllInputs = document.querySelector('.inputs')
// console.log(Array.from(document.querySelector('.word-place:not(.disaled)').querySelectorAll('input')).indexOf(document.activeElement))

// You Can Get Any Element You Want From Document Using Class <==Please Remember That Because It's Very Important==> //
// You Can Get Index Of Any Element You Want Using IndexOf But The Array Of Element Need To Be A Real Array And If You Wanna Get It <== Use document.ActiveElement ==>
// If You Want To Use Index The Array Should To Be The Brothers Of This Element //
// If You Want To Use QuerySelector On An Array , It's Imposible Else This Is Not An Array ====> It's The Father Of Child //
// This Function Just For To Facilite The Game :
function Enter() {
    let CurrentInputContainerIndex; 
        InputContainer.forEach((x, i) => x.classList.contains('disabled') === false ? CurrentInputContainerIndex = i : '')
        let CurrentInputContainer = InputContainer[CurrentInputContainerIndex];
        // Get The input Elements From The Current InputContainer :
        let Inputs = CurrentInputContainer.querySelectorAll('input')
        // Loop Check :
        for (let x = 0; x < WordRandom.length; x++) {
            if (WordRandom.includes(Inputs[x].value.toLocaleLowerCase())) {
                if (WordRandom[x] === Inputs[x].value.toLowerCase()) {
                    Inputs[x].classList.add('in-place')
                    WordInput[x] = Inputs[x].value.toLowerCase()
                } else {
                    Inputs[x].classList.add('not-in-place')
                }
            } else {
                Inputs[x].classList.add('not-exist')
            }
        }
        // Check If The Input Word Equal The Word Random :
        if (WordInput.join('') === WordRandom.join('')) {
            document.getElementById('success').play()
            EndGame(CurrentInputContainerIndex)
            document.querySelector('.info').classList.add('disabled')
        } else {
            if (InputContainer[CurrentInputContainerIndex + 1]) {
                document.getElementById('fail').play()
                // 
                CurrentInputContainer.classList.add('disabled')
                // Change The Value Of Variable a :
                // i++
                // Change The Value Of CurrentInputContainer :
                CurrentInputContainer = InputContainer[CurrentInputContainerIndex + 1]
                // Remove .Disabled Class From CurrentInputContainer :
                CurrentInputContainer.classList.remove('disabled')
                CurrentInputContainer.querySelectorAll('input')[0].focus()
            } else {
                document.querySelector('.info').classList.add('disabled')
                GameOver()
            }
        }
}
