import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import './index.scss';

const Detail = () => {

  const url = window.location.pathname;
  const id = url.split("/detail/");
  const [products, setProducts] = useState([]);
  const docRef = doc(db, "products", id[1]);

  const View = async() =>{
    try {
      const docSnap = await getDoc(docRef);
      setProducts(docSnap.data());
  } catch(error) {
      console.log(error)
  }
  }

  useEffect(() => {
    View();
  },[])

  return (
    <div className="main">

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {id[1]}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {products?.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp. {products?.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {products?.stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;