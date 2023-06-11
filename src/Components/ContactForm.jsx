import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../redux/operations';
import { useState, useRef } from 'react';
import Swal from 'sweetalert2'

function ContactForm() {

  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const nameInputRef = useRef(null);
  const numberInputRef = useRef(null);


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    

    const dublicateOfName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    const dublicateOfNumber = contacts.some(
      contact =>
        contact.number.replace(/-/g, '').replace(/ /g, '') ===
        number.replace(/ /g, '').replace(/-/g, '')
    );

    if (dublicateOfName) {
      Swal.fire(`${name} is alredy in contacts`);
      setName('');
      setNumber('');
      return false;
    }

    if (dublicateOfNumber) {
      Swal.fire(`${number} is alredy in contacts`);
      setName('');
      setNumber('');
      return false;
    }
    dispatch(addContact({name, number}));
    setName('');
    setNumber('');
    nameInputRef.current.focus();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Name:
      </label>
      <input
        type="text"
        placeholder="Name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я]+)*[a-zA-Zа-яА-Я])$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        name="name"
        value={name}
        onChange={handleChange}
        ref={nameInputRef}
      />
      <label>
        Number:
      </label>
      <input
        type="text"
        placeholder="Phone Number"
        pattern="^\+?\d{1,4}?[-.\s]?\d{1,3}[-.\s]?\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        name="number"
        value={number}
        onChange={handleChange}
        ref={numberInputRef}
        />
        <button type="submit">Add Contact</button>
        </form>
        );
        }
        
        export default ContactForm;
