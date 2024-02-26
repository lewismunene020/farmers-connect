import React from "react";
import Header from "./Header";
import Banner from "./Banner";
import Advantages from "./HomeAdvantages";
import HotProducts from "./HotProducts";
const index = () => {
  //   const [count, setCount] = useState(0);

  return (
    <div>
      <Banner />
      <Advantages />
      <HotProducts />
    </div>
  );
};

export default index;
