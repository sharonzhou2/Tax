import React from "react";
import TaxHome from "tax/TaxHome";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Calculator from "tax/calculations/Calculator";
import Distributions from "tax/calculations/distributions/Distributions";
import Dividends from "tax/calculations/dividends/Dividends";
import styled from "@emotion/styled";
import Summary from "tax/Summary";

function About() {
  return <h2>About</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <nav style={{ width: "100%" }}>
          <ul
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <Links>
              <StyledLink to="/">Home</StyledLink>
            </Links>
            {/* <Links>
              <StyledLink to="/about">About</StyledLink>
            </Links> */}
            <Links>
              <StyledLink to="/distributions">Distributions</StyledLink>
            </Links>
            <Links>
              <StyledLink to="/dividends">Dividends</StyledLink>
            </Links>
            <Links>
              <StyledLink to="/summary">Summary</StyledLink>
            </Links>
          </ul>
        </nav>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/distributions"
            element={<Distributions></Distributions>}
          ></Route>

          <Route path="/dividends" element={<Dividends></Dividends>}></Route>
          <Route path="/summary" element={<Summary></Summary>}></Route>

          <Route path="/" element={<Calculator></Calculator>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

const Links = styled(`li`)`
  list-style-type: none;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: blue;
`;
