import React, { useContext, useEffect } from 'react'
import { Col, Row, Button, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showUsers } from '../Slices/userSlice';
import { IdContext } from '../App';
import { showUserDetailSlice } from '../Slices/UserDetailsSlice';
import { LinkContainer } from 'react-router-bootstrap';

const Users = () => {
    const { setUserId } = useContext(IdContext)
    const user = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showUsers())
    }, [dispatch])

    const clickHandler = (id) => {
        setUserId(id)
        dispatch(showUserDetailSlice(id))
    }

    var userDisplay
    userDisplay = Object.values(user?.users?.usersList || {}).map((person) => {
        return (
            <Col xxl={4} xl={4} lg={6} md={6} sm={12} className='mb-4' key={person?.id}>
                <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '12px', backgroundColor: '#ffffff' }}>
                    <Card.Body className="d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="badge rounded-pill" style={{ backgroundColor: '#eae6f1', color: '#5b5a8b', fontSize: '0.85rem', fontWeight: 600 }}>ID: {person?.id}</span>
                            <span style={{ color: '#5f5e68', fontSize: '0.9rem', fontWeight: 500 }}>@{person?.username}</span>
                        </div>
                        <h5 style={{ fontWeight: 700, color: '#32313b', fontFamily: 'Manrope, sans-serif' }} className="mb-1">{person?.name}</h5>
                        <p style={{ color: '#5f5e68', fontSize: '0.95rem' }} className="mb-3 flex-grow-1">
                            <span style={{ fontWeight: 600 }}>{person?.company?.name}</span><br />
                            <small className="text-muted">{person?.company?.catchPhrase}</small>
                        </p>
                        <div className="d-flex justify-content-between align-items-center mt-auto pt-3" style={{ borderTop: '1px solid #f0ecf6' }}>
                            <a href={`http://${person?.website}`} target="_blank" rel="noreferrer" style={{ color: '#5b5a8b', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>{person?.website}</a>
                            <LinkContainer to={`users/${person.id}`}>
                                <Button
                                    variant="primary"
                                    onClick={() => clickHandler(person?.id)}
                                    style={{ backgroundColor: '#5b5a8b', border: 'none', borderRadius: '8px', padding: '0.4rem 1.2rem', fontWeight: 600 }}
                                >
                                    Show More
                                </Button>
                            </LinkContainer>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        )
    })

    return (
        <Container fluid className="px-4 py-5" style={{ backgroundColor: '#fcf8fe', minHeight: '100vh' }}>
            <Row className="mb-4">
                <Col>
                    <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#32313b' }}>Users Dashboard</h2>
                    <p style={{ color: '#5f5e68', fontSize: '1.1rem' }}>Manage and view your team's access and information.</p>
                </Col>
            </Row>
            <Row>
                {user?.users?.loading && <div className="text-center w-100 mt-5"><span style={{ color: '#5b5a8b', fontSize: '1.2rem', fontWeight: 600 }}>Loading users...</span></div>}
                {!user?.users?.loading && user?.users?.error ? <div className="text-center w-100 text-danger mt-5">Error: {user.users.error}</div> : null}
                {!user?.users?.loading && user?.users?.usersList?.length ? userDisplay : null}
            </Row>
        </Container>
    )
}

export default Users
