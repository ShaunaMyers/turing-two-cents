import React, { useState }from 'react';

const Form = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitle = (e) => {
        setTitle(e.target.value);
        console.log(title, "THIS IS OUR TITLE");
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
        console.log(description, "THIS IS OUR Description")
    }

    return(
        <form>
            <input onChange={handleTitle} type="text" placeholder="Tip Title" value={title}/>
            <input onChange={handleDescription} type="text" placeholder="Description" value={description}/>
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