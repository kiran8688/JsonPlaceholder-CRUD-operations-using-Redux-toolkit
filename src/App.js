import { Container, Row } from 'react-bootstrap';
import './App.css';
import Users from './Components/Users';
import UserDetails from './Components/UserDetails';
import { createContext, useState } from 'react';
import Albums from './Components/Albums';
import Todo from './Components/Todo';
import Posts from './Components/Posts';
import Photos from './Components/Photos';
import Comments from './Components/Comments';
import { Route, Routes } from 'react-router-dom';

export const IdContext = createContext()


function App() {
  const [userId, setUserId] = useState(0)
  // console.log(userId);
  return (
    <Container fluid className="App" style={{backgroundColor: '#f7f7f7'}} >
      <IdContext.Provider value={{ userId, setUserId }}>

        <Row className='d-flex' style={{ alignItems: 'flex-start' }}>
          <Routes>
            <Route path='/' element={<Users />} />
            <Route path={`users/${userId}`} element={<UserDetails />} >

              


                <Route path={`albums`} element={<Albums />} />
                <Route path={`todos`} element={<Todo />} />
                <Route path={`posts`} element={<Posts />} />
                <Route path={`photos`} element={<Photos />} />
                <Route path={`comments`} element={<Comments />} />

              

            </Route>
          </Routes>
        </Row>
      </IdContext.Provider>
    </Container >
  );
}
export default App;
