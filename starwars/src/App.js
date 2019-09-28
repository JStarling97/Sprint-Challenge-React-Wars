import React, { useState, useEffect } from "react";
import axios from "axios";
import StarWars from "./components/StarWars";
import Header from "./components/Header";
import { Container } from "semantic-ui-react";
import Pages from "./components/Pagination";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [peoplePerPage] = useState(4);

  // Fetch characters from the star wars api in an effect hook. Remember, anytime you have a
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      const res = await axios.get("https://swapi.co/api/people/");
      setPeople(res.data.results);
      setLoading(false);
    };

    fetchPeople();
  }, []);

  const indexOfLastPerson = currentPage * peoplePerPage;
  const indexOfFirstPerson = indexOfLastPerson - peoplePerPage;
  const currentPeople = people.slice(indexOfFirstPerson, indexOfLastPerson);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <Header />
      <Container>
        <StarWars people={currentPeople} loading={loading} />
      </Container>
      <Pages
        peoplePerPage={peoplePerPage}
        totalPeople={people.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
