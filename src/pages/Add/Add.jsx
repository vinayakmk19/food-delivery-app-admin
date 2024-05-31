import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from 'axios';

const Add = () => {

  const url = "http://localhost:4000"
  const [image, setImage] = useState(false);
  const [data, setData] = useState(
    {
      name : "",
      description : "",
      price : "",
      category : "Salad"
    }
  )

  const changeHandler = (event) =>{
    const name = event.target.name;
    console.log(name);
    const value = event.target.value;
    setData(data => ({...data, [name]: value}))
  }

  // useEffect(()=>{
  //   console.log(data);
  // },[data]);

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("image", image);

      const response = await axios.post(`${url}/api/food/add`, formData);

      if(response.data.success){
        setData({
          name : "",
          description : "",
          price : "",
          category : "Salad"
        })

        setImage(false)
      }else{

      }
  }


  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image):assets.upload_area}  />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={changeHandler} value={data.name} type="text" name="name" placeholder="Type here..." />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
          onChange={changeHandler} value={data.description} 
            name="description"
            rows={6}
            placeholder="write content here"
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <label htmlFor="category" className="visually-hidden">Product Category</label>
            <select onChange={changeHandler} value={data.category}  name="category" id="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={changeHandler} value={data.price} type="number" name="price" placeholder="$20" />
          </div>
        </div>
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;
