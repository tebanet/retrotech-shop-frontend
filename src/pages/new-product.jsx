import { useState } from "react";
import { Main } from "../components/main";

const AddProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [place_of_sale, setPlace_of_sale] = useState('')
    const [location, setlocation] = useState('')
    const AddProduct = () => {
        console.log(name,price,category, description, place_of_sale, location)
    }

  return (
    <Main>
        <div className="product">
            <h1>Add Product</h1>
                <form method="post" action="#">
    
                    <input type="text" placeholder="Enter product Name" className="inputBox" value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    />
                    <input type="number" placeholder="Enter product Price" className="inputBox" value={price}
                    onChange={(e)=>{setPrice(e.target.value)}}
                    />
                    <textarea name="" id="" cols="30" rows="10" className="inputBox" placeholder="Enter your description here" value={description}
                    onChange={(e)=>{setDescription(e.target.value)}}>Enter your description here</textarea>
                    <label htmlFor="categories" >Choose a category: </label>
                    <select name="categories" id="categories" className="inputBox" value={category}
                    onChange={(e)=>{setCategory(e.target.value)}}
                    >
                        <option value="videogame">Videogame</option>
                        <option value="pc">PC</option>
                        <option value="acessories">Acessories</option>
                        <option value="photo/video">Photo/Video</option>
                    </select>
                    <label htmlFor="place_of_sale" >Choose a Place of Sale: </label>
                    <select name="place_of_sale" id="place_of_sale0" className="inputBox" value={place_of_sale}
                    onChange={(e)=>{setPlace_of_sale(e.target.value)}}
                    >
                        <option value="online">Online</option>
                        <option value="delivery">Delivery</option>
                    </select>
                    <label htmlFor="location">Choose a Location: </label>
                    <select name="location" id="location" className="inputBox" value={location}
                    onChange={(e)=>{setlocation(e.target.value)}}
                    >
                        <option value="andalucia">Andalucia</option>
                        <option value="aragon">Aragon</option>
                        <option value="asturias">Asturias</option>
                        <option value="balears">Balears</option>
                        <option value="canarias">Canarias</option>
                        <option value="cantabria">Cantabria</option>
                        <option value="castilla">Castilla y Léon</option>
                        <option value="la_mancha">Castilla - la Mancha</option>
                        <option value="catalunya">Catalunya</option>
                        <option value="valencia">Comunitat Valenciana</option>
                        <option value="extremadura">Extremadura</option>
                        <option value="galicia">Galicia</option>
                        <option value="madrid">Madrid</option>
                        <option value="murcia">Murcia</option>
                        <option value="navarra">Navarra</option>
                        <option value="basco">País Basco</option>
                        <option value="rioja">Rioja</option>
                        <option value="ceuta">Ceuta</option>
                        <option value="melilla">Melilla</option>
                    </select>
                    <input type="file" id="myFile" name="filename" placeholder="Escolha um ficheiro"/>
                    <button onClick={AddProduct}className="appButton">Add Product</button>
                </form>
        </div>
    </Main>
  );
};

export default AddProduct;