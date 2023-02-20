import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import {collection, query, orderBy, onSnapshot, deleteDoc, doc} from "firebase/firestore"
import { db } from '../../config/firebase';
import { BarChart } from '../../components/Charts';

const Home = () => {

  const [products, setProducts] = useState([]);
  const [chartData, setChartData] = useState({
    labels: products?.map((data) => data.data.name), 
    datasets: [
      {
        label: "Users Gained ",
        data: products?.map((data) => data.data.price),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  const handleDelete = async (id) => {
    const taskDocRef = doc(db, 'products', id)
    try{
      await deleteDoc(taskDocRef)
      alert('Data Sudah Dihapus');
      window.location.reload(true);
    } catch (err) {
      alert(err)
    }
  }

  const getAll = () => {
    const q = query(collection(db, 'products'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setProducts(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
      setChartData({
        labels: products?.map((data) => data.data.name), 
        datasets: [
          {
            label: "Users Gained ",
            data: products?.map((data) => data.data.price),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      });
    })
  }

  useEffect(() => {
    getAll();
  },[]);

  return(
    <div className="main">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? 
            products.map((msg,i) =>(
              <tr key={i}>
                      <td>{i+1}</td>
                      <td>{msg.data.name}</td>
                      <td className="text-right">{msg.data.price}</td>
                      <td className="text-center">
                        <Link to={`/detail/${msg.id}`} className="btn btn-sm btn-info" >Detail</Link>
                        <Link to={`/edit/${msg.id}`} className="btn btn-sm btn-warning" >Edit</Link>
                        <Link to="#" className="btn btn-sm btn-danger" 
                        onClick={()=>{handleDelete(msg.id)}}>Delete</Link>
                      </td>
                    </tr>
            ))
           : 
           'Data Tidak Ditemukan'}
        </tbody>
      </table>
      <BarChart chartData={chartData} />
    </div>
  )
}

export default Home;

