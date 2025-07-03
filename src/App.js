import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import ManagePosts from "./pages/ManagePosts";
import UpdatePost from "./pages/UpdatePost";


function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">PostApp</Navbar.Brand>
          <Nav className="ms-auto">  
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/create">Create Post</Nav.Link>
            <Nav.Link as={Link} to="/manage">Manage Post</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/create" element={<CreatePost />}/>
          <Route path="/manage" element={<ManagePosts />}/>
          <Route path="/update/:id" element={<UpdatePost />}/>
          <Route path="/delete/:id" />
        </Routes>
      </Container>
    </Router>
  )
}

export default App