import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../redux/operations';
import { useState, useRef } from 'react';
import Swal from 'sweetalert2'

function ContactForm() {

  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'phone') {
      setPhone(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    

    const duplicateOfName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    const duplicateOfPhone = contacts.some(
      contact =>
        contact.phone.replace(/-/g, '').replace(/ /g, '') ===
        phone.replace(/ /g, '').replace(/-/g, '')
    );

    if (duplicateOfName) {
      Swal.fire(`${name} is alredy in contacts`);
      setName('');
      setPhone('');
      return false;
    }

    if (duplicateOfPhone) {
      Swal.fire(`${phone} is alredy in contacts`);
      setName('');
      setPhone('');
      return false;
    }
    dispatch(addContact({name, phone}));
    setName('');
    setPhone('');
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
        name="phone"
        value={phone}
        onChange={handleChange}
        ref={phoneInputRef}
        />
        <button type="submit">Add Contact</button>
        </form>
        );
        }
        
        export default ContactForm;
