import React from "react";
import { Header } from './Header';

import "../styles.scss";

import { PikaPic } from "./PikaPic";
import MainContent from "./MainContent";


export const App = () => {

  return (
    <div className="App">

      <Header />

      <MainContent />

      <PikaPic />
    </div>
  );
}

//export default App;
