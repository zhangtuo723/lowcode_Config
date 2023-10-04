import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Edit from './pages/Edit'
function App() {


  return (
    <>
      <Router>
        <Routes >
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/' element={<Navigate to='/home'></Navigate>}></Route>
          <Route path='/edit/:id' element={<Edit></Edit>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
