// eslint-disable-next-line
import React, {useState,useEffect} from "react";
import Rows from "../../component/Rows";
import HomeCarousel from "../../component/carousel";
import loader from "../../component/Loader/loader";
import Footer from "../../component/Footer/Footer";

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
      <Footer />
    </div>
  );
}

// const Container1 = styled.div`
//   background-color: rgb(40, 44, 52);
// `;
// {match:{params:{id}}}
