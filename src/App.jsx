
import { Router } from 'react-router-dom'
import './App.css'
import AddArticle from './components/AddArticle'
import Articles from './components/articles'
import Navbar from './components/Navbar'
import Home from './components/Home'

function App() {


  return (
    <div className='w-full'>
      <Navbar />
      <Home />
    </div>
  )
}

export default App
