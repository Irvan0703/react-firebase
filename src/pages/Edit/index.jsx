import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { db } from "../../config/firebase";

const Edit = () => {

  const initialInputState = {
    name: '',
    price: '',
    stock:''
  }
  const url = window.location.pathname;
  const id = url.split("/edit/");
  const [products, setProducts] = useState(initialInputState);
  const docRef = doc(db, "products", id[1]);

  const View = async() =>{
    try {
      const docSnap = await getDoc(docRef);
      setProducts(docSnap.data());
    } catch(error) {
      console.log(error)
    }
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProducts({ ...products, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
    try{
      await updateDoc(docRef, products)
    } catch (err) {
      alert(err)
    }    
  }

  useEffect(() => {
    View();
  },[]);

  console.log(products);

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={handleUpdate}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={products?.name} onChange={handleInputChange}/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={products?.price} onChange={handleInputChange}/>
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={products?.stock} onChange={handleInputChange}/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Edit;