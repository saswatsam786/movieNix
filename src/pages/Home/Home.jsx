// eslint-disable-next-line
import React from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Rows from "../../component/Rows";
import { auth } from "../../firebase";
import styled from "styled-components";
// import Navbar from "../../component/Navbar/Navbar";

export default function Home(props) {
  const history = useHistory();
  // const [user] = useAuthState(auth);

  const func = () => {
    <Link to="/" />
  };

  // useEffect(() => {
  //     console.log(user);
  // })

  // useEffect(() => {
  //     console.log(user);
  // })

  return (
    <div>
      {/* <Navbar /> */}
      {/* <div>
        {user === null ? (
          <Button variant="outline-primary" onClick={func}>
            Login
          </Button>
        ) : (
          <Button
            variant="outline-primary"
            onClick={() => {
              history.push("/profile");
            }}
          >
            Profile
          </Button>
        )}
      </div> */}
      <Rows />
    </div>
  );
}

const Container1 = styled.div`
  background-color: rgb(40, 44, 52);
`;
// {match:{params:{id}}}
