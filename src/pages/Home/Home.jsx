// eslint-disable-next-line
import React, {useState,useEffect} from "react";
// import { Button } from "react-bootstrap";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useHistory } from "react-router";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Rows from "../../component/Rows";
import HomeCarousel from "../../component/carousel";
import loader from "../../component/Loader/loader";
// import { auth } from "../../firebase";
// import styled from "styled-components";
// import Navbar from "../../component/Navbar/Navbar";

export default function Home(props) {
  const [ spinner, setSpinner ] = useState(true);
  useEffect(() => {
    // setTimeout(() => setSpinner(false), 2000)
    setSpinner(false)
  }, []);

  return ( spinner ? loader() :
    <div >
      <HomeCarousel/>
      <Rows />
    </div>
  );
}

// const Container1 = styled.div`
//   background-color: rgb(40, 44, 52);
// `;
// {match:{params:{id}}}
