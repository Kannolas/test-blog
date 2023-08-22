import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/search" element={<Main/>}>
            <Route path=":id" element={<Main/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
