
import './App.css';
import { Routes, Route } from 'react-router-dom'
import { NavBar, } from './components/Navbar';
import BookAddUpdateForm from './pages/book/book-add-update'
import AuthorList from './pages/author/author-list';
import AuthorAddUpdate from './pages/author/author-add-update'
import BookList from './pages/book/book-list';
import LoginComponent, { LogoutComponent } from './pages/login';
import Home from './pages/home';
import CategoryList from './pages/category/category-list';
import CategoryAddUpdate from './pages/category/category-add-update';
import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
function App() {

  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (localStorage.length > 0)
      setAuth(true)
  }, [auth])


  return <> 
    <Routes>
    <Route path='/' element={<NavBar />} /> 
    <Route path='/login' element={<LoginComponent />} /> 
    <Route path='/logout' element={<LogoutComponent/>}/>
        <>
          <Route path='/home' element={<Home />} />

          <Route path='/author/list' element={<AuthorList />} />
          <Route path='/author/add' element={<AuthorAddUpdate />} />
          <Route path='/author/update/:id' element={<AuthorAddUpdate />} />

          <Route path='/books/list' element={<BookList />} />
          <Route path='/book/add' element={<BookAddUpdateForm />} />
          <Route path='/book/update/:id' element={<BookAddUpdateForm />} />

          <Route path='/category/list' element={<CategoryList />} />
          <Route path='/category/add' element={<CategoryAddUpdate />} />
          <Route path='/category/update/:id' element={<CategoryAddUpdate />} />
        </>
    </Routes>
    <Footer/>
    </>
}

export default App;
