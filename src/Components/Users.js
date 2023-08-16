import React, { useContext, useEffect } from 'react'
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { showUsers } from '../Slices/userSlice';
import { IdContext } from '../App';
import { showUserDetailSlice } from '../Slices/UserDetailsSlice';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const Users = () => {
    const navigate = useNavigate()
    const { setUserId } = useContext(IdContext)
    const user = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(showUsers())
    }, [])
    const clickHandler = (id) => {
        setUserId(id)
        dispatch(showUserDetailSlice(id))
        // navigate(`/users/${id}`)
    }
    console.log(user);
    var userDisplay
    userDisplay = Object.values(user?.users?.usersList).map((person) => {
        return (
            <Col xxl={3} className='mb-5' key={person?.id}>
                <Card className="text-center">
                    <Card.Header className='d-flex justify-content-between align-items-center'><h6 className='mb-0 text-secondary'>userID:{person?.id}</h6> <p className='mb-0 text-primary'>@{person?.username}</p></Card.Header>
                    <Card.Body>
                        <Card.Title>{person?.name}</Card.Title>
                        <Card.Text>
                            {person?.company?.bs}<br />
                            {person?.company?.catchPhrase}
                        </Card.Text>
                        <LinkContainer to={`users/${person?.id}/`}>
                        <Button variant="primary" onClick={() => clickHandler(person?.id)}>Show More</Button>
                        </LinkContainer>
                    </Card.Body>
                    <Card.Footer className="text-muted">{person?.website}</Card.Footer>
                </Card>
            </Col>
        )
    })
    return (
        <>
            <h2>User List</h2>
            {user?.loading && <div>Loading...</div>}
            {!user?.loading && user?.error ? <div>Error: {user.error}</div> : null}
            {!user?.loading && user?.users?.usersList?.length ? userDisplay : null}
        </>

    )
}

//         <tr key={person?.id}>
//             <td>{person?.id}</td>
//             <td>{person?.name} </td>
//             <td>@{person?.username} </td>
//             <td>{person?.company?.name}</td>
//         </tr>

export default Users