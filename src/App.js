import React from "react";
import Login from "./Login"
import Search from "./search"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
      <>
      <Search
        setTypeSelectedArray={setTypeSelectedArray}
        typeSelectedArray={typeSelectedArray}
      />
      <FilteredPokemons
        typeSelectedArray={typeSelectedArray}
      />

    </>
      </Switch>
    </Router>
  );
}

export default App;
