import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateBook from './pages/CreateBook';
import DeleteBook from './pages/DeleteBook';
import Home from './pages/Home';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} ></Route>
      <Route path='' element={<CreateBook />} ></Route>
      <Route path='' element={<ShowBook />} ></Route>
      <Route path='' element={<EditBook />} ></Route>
      <Route path='' element={<DeleteBook />} ></Route>
    </Routes>
  );
};

export default App
