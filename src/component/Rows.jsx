import React from "react";
import styled from "styled-components";
import Row from "./Row";
import movies from "../moviePath";

const Rows = () => {
  return (
    <Container>
      {movies.map((movie, index) => (
        <Row genre={movie.heading} moviePath={movie.url} key={index} />
      ))}
    </Container>
  );
};

export default Rows;

const Container = styled.div`
  overflow-x: hidden;
`;
