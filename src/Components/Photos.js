import React, { useContext, useEffect } from 'react'
import { IdContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { showPhotosSlice } from '../Slices/PhotosSlice'
import { Card, Col } from 'react-bootstrap'

const Photos = () => {

    const { userId } = useContext(IdContext)
    const photo = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(showPhotosSlice(userId))
    }, [userId, dispatch])
    console.dir(photo);
    var photoDisplay

    photoDisplay = Object.values(photo.photos.photosList).map((photo, index) => {
        return (

            <Col xxl={2} className='mb-4' key={photo.id}>
                <Card>
                    <Card.Img variant="top" src={photo.url} />
                    <Card.Body>
                        <Card.Text>{photo.title}</Card.Text>

                    </Card.Body>
                </Card>
            </Col>

        )
    })

    var photosRender = (<Col xxl={8} className='row ms-3 mt-5 border-3 border-start border-secondary' >
        <div className='d-flex  justify-content-between' style={{ alignItems: 'center' }}>
            <h1 className='text-center'>{photo?.userDetails?.userDetailsList?.name} photos</h1>
            <h4 className='text-secondary'>Album no: {photo?.userDetails?.userDetailsList?.id}</h4>
        </div>
        {photoDisplay}
    </Col>
    )

    return (
        <>
            {photo.photos?.loading && <div>Loading...</div>}
            {!photo.photos?.loading && photo.photos?.error ? <div>Error: {photo.photos.error}</div> : null}
            {!photo.photos?.loading && photo.photos?.photosList?.length ? photosRender : null}
        </>
    )
}

export default Photos