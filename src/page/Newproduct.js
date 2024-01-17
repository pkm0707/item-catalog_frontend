import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

const Newproduct = () => {
  const [datas, setDatas] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setDatas((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    // console.log(data);
    setDatas((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  const handleOnsubmit = async (e) => {
    e.preventDefault();
    console.log(datas);

    const { name, category, image, price } = datas;

    if (name && category && image && price) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/product/add`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(datas),
        }
      );
      const fetchRes = await fetchData.json();
      console.log(fetchRes);
      toast(fetchRes.message);

      setDatas(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        };
      });
    } else {
      toast("Enter Required Fields");
    }
  };
  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md  shadow flex flex-col bg-white p-3"
        onSubmit={handleOnsubmit}
      >
        <label htmlFor="name"> Name</label>
        <input
          type={"text"}
          name="name"
          className="bg-slate-200 py-1 my-1"
          value={datas.name}
          onChange={handleOnchange}
        />

        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 py-1 my-1"
          name="category"
          value={datas.category}
          id="category"
          onChange={handleOnchange}
        >
          <option value={"other"}>Select Category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegitables"}>Vegetables</option>
          <option value={"icecreams"}>Icecreams</option>
          <option value={"pizzas"}>Pizzas</option>
          <option value={"dosha"}>Dosha</option>
          <option value={"rice"}>Rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"berger"}>Berger</option>
          <option value={"non-veg"}>Non-Veg</option>
          <option value={"briyani"}>Briyani</option>
        </select>

        <label htmlFor="image">
          Image
          <div className="h-40 w-full my-1 bg-slate-200 cursor-pointer rounded flex items-center justify-center">
            {datas.image ? (
              <img src={datas.image} className=" h-full" alt="datas"/>
            ) : (
              <span className="text-5xl ">
                {" "}
                <BsCloudUpload />
              </span>
            )}

            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>

        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type={"text"}
          className="bg-slate-200 py-1 my-1"
          name="price"
          value={datas.price}
          onChange={handleOnchange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          className="bg-slate-200 py-1 my-1 resize-none"
          value={datas.description}
          name="description"
          onChange={handleOnchange}
        ></textarea>

        <button className="bg-red-500 hover:bg-red-600 text-white my-2 text-medium font-bold drop-shadow">
          Save
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
