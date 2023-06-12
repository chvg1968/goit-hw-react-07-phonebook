// operations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://64850607ee799e3216273090.mockapi.io/api/v1";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, phone }, thunkAPI) => { 
    try { const response = await axios.post("/contacts", { name, phone }); 
    return response.data; } 
    catch (error) 
    { return thunkAPI.rejectWithValue(error.message); 
    } 
  }, 
  {
    // Include a non-serializable function in the meta property 
    meta:(arg, { getState }) => { 
      const state = getState(); 
      const register = () => { console.log(state); };
      return { register }; 
    }, 
  }
  );

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const operations =  { addContact, deleteContact } ;  
export default operations;
export const contacts = { fetchContacts};