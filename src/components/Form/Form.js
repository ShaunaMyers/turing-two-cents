import React, { useState }from 'react';
import './Form.css';
import PropTypes from 'prop-types';

const Form = ({ handleAddTip, validateInputs }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [mod, setMod] = useState(1);

    const onAddTip = (e) => {
        e.preventDefault();

        const date = new Date(Date.now()).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
        // const formattedDate = date.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
        if (title && description) {
            handleAddTip({ title, description, mod, rating: 0, date, id: Math.random() });
        }
        validateInputs(title, description);
        clearInputs();
    }

    const clearInputs = () => {
        setTitle('');
        setDescription('');
        setMod(1);
    }

    return(
        <form>
            <input onChange={event => setTitle(event.target.value)} type="text" placeholder="Tip Title" value={title}/>
            <input onChange={event => setDescription(event.target.value)} type="text" placeholder="Description" value={description}/>
            <select   
                value={mod} 
                onChange={event => setMod(event.target.value)} >
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

Form.propTypes = {
    handleAddTip: PropTypes.func,
    validateInputs: PropTypes.func
  };