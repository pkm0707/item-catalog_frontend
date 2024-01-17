import React, { useRef } from "react";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardFeatures from "../component/CardFeatures";
import { GrNext, GrPrevious } from "react-icons/gr";
import AllProduct from "../component/AllProduct";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  // console.log(productData);
  const homeProductCardList = productData.slice(1, 5);

  const homeProductCardListVeg = productData.filter(
    (el) => el.category === "vegitables",
    []
  );
  //console.log(homeProductCardListVeg);
  const navigate = useNavigate()
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const previousProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7" alt="cycle"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fastest Delevery in{" "}
            <span className="text-red-600 "> Your Home</span>
          </h2>
          <p className="py-3 text-base ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <button className="fond-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md" onClick={()=>navigate("/newproduct")}>
            {" "}
            Add item
          </button>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCardList[0]
            ? homeProductCardList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return <HomeCard key={index} loading={"Loading..."} />;
              })}
        </div>
      </div>

      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-2">
            Fresh vegitables
          </h2>

          <div className="ml-auto flex gap-4 ">
            <button
              onClick={previousProduct}
              className="bg-slate-400 hover:bg-slate-500 p-2 rounded text-lg"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-400 hover:bg-slate-500 p-2 rounded text-lg"
            >
              <GrNext />
            </button>
          </div>
        </div>

        <div
          className=" flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCardListVeg[0]
            ? homeProductCardListVeg.map((el) => {
                return (
                  <CardFeatures
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CardFeatures loading="Loading..." key={index} />
              ))}
        </div>
      </div>

      <AllProduct heading={"Your Products"} />
    </div>
  );
};

export default Home;
