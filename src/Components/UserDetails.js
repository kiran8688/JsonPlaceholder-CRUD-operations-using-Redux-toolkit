import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { IdContext } from '../App'
import { showUserDetailSlice } from '../Slices/UserDetailsSlice'
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import albumsIcon from '../assets/photo_album_white_24dp.svg'
import taskIcon from '../assets/task_alt_black_24dp.svg'
import postIcon from '../assets/segment_white_24dp.svg'
import imageIcon from '../assets/image_white_24dp.svg'
import commentIcon from '../assets/comment-text-outline.svg'
import { albums, posts, todos } from '../Slices/RouteSlice'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'


const UserDetails = () => {
    const navigate = useNavigate()
    const { userId } = useContext(IdContext)
    const userDetail = useSelector(state => state?.userDetails?.userDetailsList)
    const dispatch = useDispatch()
    useEffect(() => {
        // console.log(userId);
        dispatch(showUserDetailSlice(userId))
    }, [userId, dispatch])
    // console.table(userDetail);

    return (
        <>
            <Col style={{ backgroundColor: '#f7f7f7', height: '100vmin', alignContent: 'flex-start' }} className='row justify-content-center ' xxl={4}>
                <Image className='col-8 mt-5 mb-5' style={{ borderRadius: 100, height: '35vmin' }} src='https://www.kindpng.com/picc/m/136-1369892_avatar-people-person-business-user-man-character-avatar.png' />
                <Container className='col-12'>
                    <div className='row d-flex justify-content-center mb-3'>
                        <LinkContainer to={`albums`}>
                            <Button className='col-2 mr-2 ms-2' variant="danger"  ><img className='pe-2' height={29} src={albumsIcon} alt="album-icon" />Albums</Button>
                        </LinkContainer>
                        <LinkContainer to={`todos`}>
                            <Button className='col-2 mr-2 ms-2' variant="warning" ><img className='pe-2' height={29} src={taskIcon} alt="task-icon" />Todos</Button>
                        </LinkContainer>
                        <LinkContainer to={`photos`}>
                            <Button className='col-2 mr-2 ms-2' variant="primary" ><img className='pe-2' height={29} src={imageIcon} alt="post-icon" />Photos</Button>
                        </LinkContainer>
                        <LinkContainer to={`posts`}>
                            <Button className='col-2 mr-2 ms-2' variant="dark" ><img className='pe-2' height={30} src={postIcon} alt="post-icon" />Posts</Button>
                        </LinkContainer>
                        <LinkContainer to={`comments`}>
                            <Button className='col-2 mr-2 ms-2' variant="info" ><img className='pe-2' height={29} src={commentIcon} alt="post-icon" />Comments</Button>
                        </LinkContainer>

                    </div>
                    <Accordion alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Personal Info</Accordion.Header>
                            <Accordion.Body className='row'>
                                <Col className='col-4'>Name</Col>
                                <Col className='col-6'>{userDetail?.name}</Col>
                                <Col className='col-4'>Email</Col>
                                <Col className='col-6'>{userDetail?.email}</Col>
                                <Col className='col-4'>Phone Number</Col>
                                <Col className='col-6'>{userDetail?.phone}</Col>
                                <Col className='col-4'>Username</Col>
                                <Col className='col-6'>@{userDetail?.username}</Col>
                                <Col className='col-4'>Website</Col>
                                <Col className='col-6'>{userDetail?.website}</Col>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Address</Accordion.Header>
                            <Accordion.Body className='row'>
                                <Col className='col-4'>Suite</Col>
                                <Col className='col-8'>{userDetail?.address?.suite}</Col>
                                <Col className='col-4'>Street</Col>
                                <Col className='col-8'>{userDetail?.address?.street}</Col>
                                <Col className='col-4'>City</Col>
                                <Col className='col-8'>{userDetail?.address?.city}</Col>
                                <Col className='col-4'>Zipcode</Col>
                                <Col className='col-8 mb-3'>{userDetail?.address?.zipcode}</Col>
                                <hr />
                                <Col className='col-2'>Latitude:</Col>
                                <Col className='col-3'>{userDetail?.address?.geo?.lat}</Col>
                                <Col className='col-2'>Longitude:</Col>
                                <Col className='col-3'>{userDetail?.address?.geo?.lng}</Col>

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Company</Accordion.Header>
                            <Accordion.Body className='row'>
                                <Col className='col-4'>Name</Col>
                                <Col className='col-8'>{userDetail?.company?.name}</Col>
                                <Col className='col-4'>Bs</Col>
                                <Col className='col-8'>{userDetail?.company?.bs}</Col>
                                <Col className='col-4'>Catch Phrase</Col>
                                <Col className='col-8'>{userDetail?.company?.catchPhrase}</Col>

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                </Container>
            </Col>
            <Outlet />
        </>
    )
}

export default UserDetails

// onClick={dispatch(albums())}
// onClick={dispatch(todos())}
// onClick={dispatch(posts())}