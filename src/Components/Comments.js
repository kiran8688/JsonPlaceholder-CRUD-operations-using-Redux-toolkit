import React from 'react'
import { useEffect, useContext } from 'react'
import { IdContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col } from 'react-bootstrap'
import { showComments } from '../Slices/CommentsSlice'

const Comments = () => {
    const { userId } = useContext(IdContext)
    const comment = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(showComments(userId))
    }, [userId, dispatch])
    console.log(comment);
    var commentDisplay

    commentDisplay = Object.values(comment?.comments?.commentsList).map((comment, index) => {
        return (
            <Col xxl={4} className='mb-4' key={comment.id}>

                <Card className="text-left">
                    <Card.Header className='d-flex justify-content-between align-items-center'><h6 className='mb-0 text-secondary'>comment ID:{[index + 1]}</h6></Card.Header>
                    <Card.Body>
                        <Card.Title className='text-danger'>{comment?.name}</Card.Title>
                        <Card.Text>{comment?.body}</Card.Text>
                    </Card.Body>
                    <Card.Footer className='fs-6 text-center'><strong className='text-primary'>Email: {comment?.email}</strong></Card.Footer>
                </Card>
            </Col>
        )
    })

    var commentsRender

    commentsRender = (<Col xxl={8} className='row ms-3 mt-5 border-3 border-start border-secondary ' >
        <div className='d-flex  justify-content-between' style={{ alignItems: 'center' }}>
            <h1 className='text-center'>{comment?.userDetails?.userDetailsList?.name}'s Comments</h1>
            <Button variant='primary'> + Add a Comment </Button>
        </div>
        {commentDisplay}
    </Col>)

    return (
        <>

            {comment?.comments?.loading && <div>Loading...</div>}
            {!comment?.comments?.loading && comment?.comments?.error ? <div>Error: {comment?.comments.error}</div> : null}
            {!comment?.comments?.loading && comment?.comments?.commentsList?.length ? commentsRender : null}


        </>
    )
}

export default Comments