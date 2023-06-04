import ContactForm from './ContactForm';
import SearchFilter from './SearchFilter';
import ContactList from './ContactList';
import '../App.css';

const App = () => {

return (
    <div className="phonebox">
      <h1>Phonebook<br />☎</h1>
      <ContactForm  />
      <h2>Contacts</h2>
      <SearchFilter />
      <ContactList  />
    </div>
  );
}


export default App;
