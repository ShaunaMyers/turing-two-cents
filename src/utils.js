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

export const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })
}