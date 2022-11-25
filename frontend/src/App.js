
import './App.css';
import { Routes, Route } from 'react-router-dom'
import { NavBar, } from './components/Navbar';
import BookAddUpdateForm from './pages/book/book-add-update'
import AuthorList from './pages/author/author-list';
import AuthorAddUpdate from './pages/author/author-add-update'
import BookList from './pages/book/book-list';
import LoginComponent from './pages/login';
import Home from './pages/home';
import CategoryList from './pages/category/category-list';
import CategoryAddUpdate from './pages/category/category-add-update';
function App() {

  // in the localstorage I will also store the role of the user , so that we see the right menus  
  return <> <NavBar />
    <Routes>
      <Route path='/' element={<LoginComponent />} />
      <Route path='/home' element={<Home />} />
      <Route path='/author/list' element={<AuthorList />} />
      <Route path='/author/add' element={<AuthorAddUpdate/>}/>
      <Route path='/book/add' element={<BookAddUpdateForm />} />
      <Route path='/books/list' element={<BookList />} />
      <Route path='/category/list' element={<CategoryList />} />
      <Route path='/category/add' element={<CategoryAddUpdate />} />
    </Routes></>
}

export default App;
