import { Route, Routes } from 'react-router';
import './App.css';
import Navigation from './components/Navigation';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Home from './pages/Home';
import Tambah from './pages/Tambah';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/tambah" element={ <Tambah/> } />
        <Route path="/edit/:id" element={ <Edit/> } />
        <Route path="/detail/:id" element={ <Detail/> } />
      </Routes>
    </div>
  );
}

export default App;
