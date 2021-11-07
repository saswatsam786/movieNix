// eslint-disable-next-line
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import Rows from "../../component/Rows";
import { auth } from "../../firebase";
import styled from "styled-components";
import Navbar from "../../component/Navbar/Navbar";

export default function Home(props) {
  const history = useHistory();
  const [user] = useAuthState(auth);

  const func = () => {
    window.location = "/login";
  };

  // useEffect(() => {
  //     console.log(user);
  // })

  return (
    <Container1>
      <Navbar />
      <Rows />
    </Container1>
  );
}

const Container1 = styled.div`
  background-image: url("https://i.pinimg.com/564x/85/84/e1/8584e16047ae3663d9fcafd971716d72.jpg");
`;
// {match:{params:{id}}}
