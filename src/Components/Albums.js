import React from 'react'
import { useEffect, useContext } from 'react'
import { IdContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { showAlbumSlice } from '../Slices/AlbumSlice'
import { Button, Card, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Albums = () => {
    const { userId } = useContext(IdContext)
    const albumDetail = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(showAlbumSlice(userId))
    }, [userId, dispatch])
    console.log(albumDetail);
    const clickHandler = (id) => {

    }
    var albumDisplay

    albumDisplay = Object.values(albumDetail?.albums?.albumsList).map((album, index) => {
        return (
            <Col xxl={4} className='mb-4' key={album.id}>

                <Card className="text-center">
                    <Card.Header className='d-flex justify-content-between align-items-center'><h6 className='mb-0 text-secondary'>Album ID:{[index + 1]}</h6></Card.Header>
                    <Card.Body>
                        <Card.Title>{album?.title}</Card.Title>
                        <LinkContainer to={`photos`}>
                        <Button variant="primary" onClick={() => clickHandler(album?.id)}>Show Album</Button>
                        </LinkContainer>
                    </Card.Body>
                </Card>
            </Col>
        )
    })

    var albumRender

    albumRender = (<Col xxl={8} className='row ms-3 mt-5 border-3 border-start border-secondary' >
        <h1 className='text-center'>{albumDetail?.userDetails?.userDetailsList?.name}'s Albums</h1>
        {albumDisplay}
    </Col>)

    return (
        <>

            {albumDetail?.albums?.loading && <div>Loading...</div>}
            {!albumDetail?.albums?.loading && albumDetail?.albums?.error ? <div>Error: {albumDetail?.albums.error}</div> : null}
            {!albumDetail?.albums?.loading && albumDetail?.albums?.albumsList?.length ? albumRender : null}


        </>
    )
}

export default Albums