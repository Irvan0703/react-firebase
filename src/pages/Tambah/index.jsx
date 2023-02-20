import {collection, addDoc, Timestamp} from 'firebase/firestore'
import { useState } from 'react';
import Input from '../../components/Input';
import { db } from '../../config/firebase';
import './index.scss';

const Tambah = () => {

    const initialInputState = {
        name: '',
        price: '',
        stock:'',
        created: Timestamp.now() 
      }

    const [isi, setIsi] = useState(initialInputState)

    const handleInputChange = event => {
        const { name, value } = event.target;
        setIsi({ ...isi, [name]: value });
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          await addDoc(collection(db, 'products'), isi)
          alert('Data Sudah Ditambahkan');
          window.location.reload(true);
        } catch (err) {
          alert(err)
        }
      }

      console.log(isi);

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" onChange={handleInputChange}/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" onChange={handleInputChange}/>
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" onChange={handleInputChange}/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;