import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Container, Image, Card, Row, Badge } from 'react-bootstrap'
import { IdContext } from '../App'
import { showUserDetailSlice } from '../Slices/UserDetailsSlice'
import Button from 'react-bootstrap/Button';
import albumsIcon from '../assets/photo_album_white_24dp.svg'
import taskIcon from '../assets/task_alt_black_24dp.svg'
import postIcon from '../assets/segment_white_24dp.svg'
import imageIcon from '../assets/image_white_24dp.svg'
import commentIcon from '../assets/comment-text-outline.svg'
import { Outlet } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const SectionCard = ({ title, children }) => (
    <Card className="mb-4 border-0 shadow-sm" style={{ borderRadius: '16px', backgroundColor: '#ffffff' }}>
        <Card.Body className="p-4">
            <h5 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, color: '#32313b', marginBottom: '1.5rem' }}>{title}</h5>
            {children}
        </Card.Body>
    </Card>
);

const DetailRow = ({ label, value }) => (
    <Row className="mb-3 align-items-center">
        <Col xs={4} style={{ color: '#5f5e68', fontSize: '0.9rem', fontWeight: 600 }}>{label}</Col>
        <Col xs={8} style={{ color: '#32313b', fontSize: '1rem', fontWeight: 500 }}>{value || 'N/A'}</Col>
    </Row>
);

const NavButton = ({ to, icon, label, variantCode }) => (
    <LinkContainer to={to}>
        <Button
            className="w-100 d-flex flex-column align-items-center justify-content-center p-3 mb-3 border-0"
            style={{
                backgroundColor: variantCode,
                borderRadius: '12px',
                transition: 'transform 0.2s ease',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <img src={icon} alt={`${label} icon`} height={28} className="mb-2" style={{ filter: 'brightness(0) invert(1)' }} />
            <span style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.9rem' }}>{label}</span>
        </Button>
    </LinkContainer>
);

const UserDetails = () => {
    const { userId } = useContext(IdContext)
    const userDetail = useSelector(state => state?.userDetails?.userDetailsList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showUserDetailSlice(userId))
    }, [userId, dispatch])

    return (
        <Container fluid className="px-4 py-5" style={{ backgroundColor: '#fcf8fe', minHeight: '100vh' }}>
            <Row className="justify-content-center">
                <Col xxl={10} xl={10} lg={12}>
                    <Row>
                        <Col lg={4} className="mb-4">
                            {/* Profile Header Card */}
                            <Card className="text-center border-0 shadow-sm mb-4" style={{ borderRadius: '20px', backgroundColor: '#ffffff', overflow: 'hidden' }}>
                                <div style={{ height: '100px', backgroundColor: '#bbb9f1', background: 'linear-gradient(135deg, #bbb9f1 0%, #e3e0f9 100%)' }}></div>
                                <Card.Body className="px-4 pb-4" style={{ marginTop: '-50px' }}>
                                    <Image
                                        src={`https://i.pravatar.cc/150?u=${userId || 'default'}`}
                                        roundedCircle
                                        style={{ width: '100px', height: '100px', border: '4px solid #ffffff', backgroundColor: '#f0ecf6', objectFit: 'cover' }}
                                        className="mb-3 shadow-sm"
                                    />
                                    <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#32313b' }} className="mb-1">{userDetail?.name}</h3>
                                    <p style={{ color: '#5b5a8b', fontSize: '1rem', fontWeight: 600 }} className="mb-3">@{userDetail?.username}</p>
                                    <Badge pill style={{ backgroundColor: '#e3e0f9', color: '#5b5a8b', padding: '0.5em 1em', fontWeight: 600, fontSize: '0.85rem' }}>Active User</Badge>
                                </Card.Body>
                            </Card>

                            {/* Quick Navigation Card */}
                            <SectionCard title="Quick Actions">
                                <Row>
                                    <Col xs={6}><NavButton to="albums" icon={albumsIcon} label="Albums" variantCode="#5b5a8b" /></Col>
                                    <Col xs={6}><NavButton to="todos" icon={taskIcon} label="Todos" variantCode="#755478" /></Col>
                                    <Col xs={6}><NavButton to="photos" icon={imageIcon} label="Photos" variantCode="#5e5d72" /></Col>
                                    <Col xs={6}><NavButton to="posts" icon={postIcon} label="Posts" variantCode="#4f4e7e" /></Col>
                                    <Col xs={12}><NavButton to="comments" icon={commentIcon} label="Comments" variantCode="#363564" /></Col>
                                </Row>
                            </SectionCard>
                        </Col>

                        <Col lg={8}>
                            {/* Personal Info */}
                            <SectionCard title="Personal Information">
                                <DetailRow label="Email Address" value={<a href={`mailto:${userDetail?.email}`} style={{ color: '#5b5a8b', textDecoration: 'none' }}>{userDetail?.email}</a>} />
                                <DetailRow label="Phone Number" value={userDetail?.phone} />
                                <DetailRow label="Website" value={<a href={`http://${userDetail?.website}`} target="_blank" rel="noreferrer" style={{ color: '#5b5a8b', textDecoration: 'none' }}>{userDetail?.website}</a>} />
                            </SectionCard>

                            <Row>
                                <Col md={6}>
                                    {/* Company Info */}
                                    <SectionCard title="Company Profile">
                                        <DetailRow label="Company Name" value={userDetail?.company?.name} />
                                        <DetailRow label="Catchphrase" value={<span style={{ fontStyle: 'italic', color: '#5f5e68' }}>"{userDetail?.company?.catchPhrase}"</span>} />
                                        <DetailRow label="Business Strategy" value={userDetail?.company?.bs} />
                                    </SectionCard>
                                </Col>
                                <Col md={6}>
                                    {/* Address Info */}
                                    <SectionCard title="Address Details">
                                        <DetailRow label="Street" value={`${userDetail?.address?.suite}, ${userDetail?.address?.street}`} />
                                        <DetailRow label="City" value={userDetail?.address?.city} />
                                        <DetailRow label="Zipcode" value={userDetail?.address?.zipcode} />
                                        <div className="mt-4 pt-3 border-top" style={{ borderColor: '#f0ecf6 !important' }}>
                                            <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
                                                <i className="bi bi-geo-alt-fill me-2"></i>
                                                Geo: {userDetail?.address?.geo?.lat}, {userDetail?.address?.geo?.lng}
                                            </p>
                                        </div>
                                    </SectionCard>
                                </Col>
                            </Row>

                            {/* Main Content Area for Nested Routes */}
                            <div className="mt-4">
                                <Outlet />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default UserDetails
