import React from "react";
import TaxHome from "tax/TaxHome";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Calculator from "tax/calculations/Calculator";
import Distributions from "tax/calculations/distributions/Distributions";
import Dividends from "tax/calculations/dividends/Dividends";
import styled from "@emotion/styled";
import Summary from "tax/Summary/Summary";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "tax/Theme";
import { colors } from "@mui/material";
import About from "tax/About";
import Info from "tax/Info";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <nav
            style={{
              width: "100%",
              height: "5rem",
              borderBottom: "1px solid white",
              // boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
              // alignContent: "center",
              // backgroundColor: theme.palette.primary.main,
            }}
          >
            <ul
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "space-evenly",
                alignItems: "center",
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
              <Info></Info>
            </ul>
          </nav>

          {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/about" element={<About></About>}></Route>
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
    </ThemeProvider>
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
  color: ${theme.palette.primary.main};
  text-transform: uppercase;
  letter-spacing: 0.2rem;
`;
