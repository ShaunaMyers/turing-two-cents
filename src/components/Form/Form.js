import React, { useState }from 'react';
import './Form.css';
import PropTypes from 'prop-types';
import Error from '../Error/Error';
import { cleanInputs } from '../../utils';

const Form = ({ handleAddTip, validateInputs }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [mod, setMod] = useState(1);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('')

    let timer;

    const onAddTip = (e) => {
        e.preventDefault();
        if (title && description && title.length < 51 && description.length < 501) {
            const {formattedTitle, formattedDescription} = cleanInputs([title, description])
            addTipFunctionality(formattedTitle, formattedDescription);
        } else if (title.length > 50) {
            setError('Title is too long. Only 50 characters allowed')
            timer = setTimeout(() => setError(''), 3000)
        } else if (description.length > 500) {
            setError('Description is too long. Only 500 characters allowed')
            timer = setTimeout(() => setError(''), 3000)
        }
        validateInputs(title, description);
        clearInputs();
    }

    const addTipFunctionality = (formattedTitle, formattedDescription) => {
        handleAddTip({ title: formattedTitle, description: formattedDescription, mod: parseInt(mod), rating: 0, date: Date.now(), id: Math.random() });
        setMessage('You have successfully submitted a tip card')
        timer = setTimeout(() => setMessage(''), 3000)
        setError('')
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
            {message && <p className="message-text">{message}</p>}
            {error && <Error error={error}/>}
        </form>
    )
}

export default Form;

Form.propTypes = {
    handleAddTip: PropTypes.func,
    validateInputs: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    mod: PropTypes.number,
    error: PropTypes.string
  };