import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tasksReducer from './tasksSlice';
import filterReducer from './filterSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedTasksReducer = persistReducer(persistConfig, tasksReducer);

const store = configureStore({
  reducer: {
    contacts: persistedTasksReducer,
    filter: filterReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };

