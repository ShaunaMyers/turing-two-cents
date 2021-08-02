export const cleanInputs = (inputs) => {
    let formattedInputs = {formattedTitle: '', formattedDescription: ''}
    Object.keys(formattedInputs).forEach((category, index) => {
        formattedInputs[category] = inputs[index].split('').map(letter => {
            if (letter === "'") {
                letter = "''"
            }
            return letter
        }).join('')
    })
    return formattedInputs;
}