import React, { useState }from 'react';

const Form = ({ handleAddTip }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [mod, setMod] = useState(0);

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleMod = (e) => {
        setMod(e.target.value);
        console.log(mod, "THIS IS OUR MOD");
    }

    const onAddTip = (e) => {
        e.preventDefault();
        handleAddTip({ title: title, description: description, mod: mod, upvotes: 0, date: Date.now() })
    }

    return(
        <form>
            <input onChange={handleTitle} type="text" placeholder="Tip Title" value={title}/>
            <input onChange={handleDescription} type="text" placeholder="Description" value={description}/>
            <select   
                value={mod} 
                onChange={handleMod} >
                <option value="1">Mod 1</option>
                <option value="2">Mod 2</option>
                <option value="3">Mod 3</option>
                <option value="4">Mod 4</option>
            </select>
            <button onClick={onAddTip}>Submit</button>
        </form>
    )
}

export default Form;