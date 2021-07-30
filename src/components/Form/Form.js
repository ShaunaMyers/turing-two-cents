import React, { useState }from 'react';
import './Form.css';
import PropTypes from 'prop-types';

const Form = ({ handleAddTip, validateInputs }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [mod, setMod] = useState(1);
    const [message, setMessage] = useState('');

    const onAddTip = (e) => {
        e.preventDefault();
        if (title && description && title.length < 51 && description.length < 501) {
            handleAddTip({ title, description, mod, rating: 0, date: Date.now(), id: Math.random() });
            setMessage('')
        } else if (title.length > 50) {
            setMessage('Title is too long. Only 50 characters allowed.')
        } else if (title.description > 500) {
            setMessage('Description is too long. Only 50 characters allowed')
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
            <h3>Share Your Advice</h3>
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
            <button className='new-tip-button'onClick={onAddTip}>Submit a Tip</button>
        </form>
    )
}

export default Form;

Form.propTypes = {
    handleAddTip: PropTypes.func,
    validateInputs: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    mod: PropTypes.number
  };