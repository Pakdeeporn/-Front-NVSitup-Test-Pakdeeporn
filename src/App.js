import React from 'react';
//import { Provider as StoreProvider } from 'react-redux';
//import { configureStore } from './stores';
import DemoScreen from './screens/DemoScreen';
// import Storage from './common/storage'
// import { login } from './redux/actions';
// import { useDispatch } from 'react-redux';
import './App.css';

function App() {
  // const store = configureStore();
  //const dispatch = useDispatch();

  return (
    // <StoreProvider store={store}>
    <React.StrictMode>
      <DemoScreen/>
      </React.StrictMode>
  );

}

export default App;
