import React from 'react';

const Form = () => {
    return(
        <form>
            <input type="text" placeholder="Tip Title"/>
            <input type="text" placeholder="Description"/>
            <select>
                <option value="1">Mod 1</option>
                <option value="2">Mod 2</option>
                <option value="3">Mod 3</option>
                <option value="4">Mod 4</option>
            </select>
            <button>Submit</button>
        </form>
    )
}

export default Form;