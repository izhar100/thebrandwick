import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

const App = () => {
  const [page,setPage]=useState("signup")
  function handlePage(currentPage){
    setPage(currentPage)
  }
  return (
    <div>
      {
        page=="signup"
        ?
        <Signup handlePage={handlePage}/>
        :
        <Login handlePage={handlePage}/>
      }
    </div>
  )
}

export default App
