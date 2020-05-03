import React from 'react';
import './App.css';

import firebase from './Firebase/firebase'
import SidebarContainer from './components/SidebarContainer'

function App() {
  return (
    <div className="App">
      <SidebarContainer />
    </div>
  );
}

export default App;
