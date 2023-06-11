// App.jsx
import ContactForm from './ContactForm';
import SearchFilter from './SearchFilter';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ContactList from './ContactList';
import { fetchContacts } from '../redux/operations';
import '../App.css';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="phonebox">
      <h1>Phonebook<br />☎</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <SearchFilter />
      <ContactList />
    </div>
  );
}

export default App;
