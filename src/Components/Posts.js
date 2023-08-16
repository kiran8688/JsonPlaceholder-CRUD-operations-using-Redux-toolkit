import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IdContext } from '../App'
import { showPosts } from '../Slices/PostsSlice'
import { Button, Card, Col } from 'react-bootstrap'

const Posts = () => {

    const { userId } = useContext(IdContext)
    const postDetail = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(showPosts(userId))
    }, [userId, dispatch])
    console.log(postDetail);
    const clickHandler = (id) => {
        // dispatch()
    }
    var postDisplay

    postDisplay = Object.values(postDetail?.posts?.postsList).map((post, index) => {
        return (
            <Col xxl={4} className='mb-4' key={post.id}>
                <Card className="text-center" >
                    <Card.Header className='d-flex justify-content-between align-items-center'><h6 className='mb-0 text-secondary'>Post ID:{[index + 1]}</h6></Card.Header>
                    <Card.Body style={{ textAlign: 'left' }}>
                        <Card.Title className='text-success'>{post?.title}</Card.Title>
                        <Card.Text className='text-truncate'>
                            {post?.body}
                        </Card.Text>
                        <Button variant="primary" onClick={() => clickHandler(post?.id)}>Show Post</Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    })

    var postssRender = (<Col xxl={8} className='row ms-3 mt-5 border-3 border-start border-secondary' >

<div className='d-flex  justify-content-between' style={{ alignItems: 'center' }}>
            <h1 className='text-center'>{postDetail?.userDetails?.userDetailsList?.name}'s Posts</h1>
            <Button variant='primary'>+ Add a Post</Button>
        </div>
        {postDisplay}

    </Col>)

    return (
        <>

            {postDetail?.posts?.loading && <div>Loading...</div>}
            {!postDetail?.posts?.loading && postDetail?.posts?.error ? <div>Error: {postDetail?.posts.error}</div> : null}
            {!postDetail?.posts?.loading && postDetail?.posts?.postsList?.length ? postssRender : null}



        </>
    )
}

export default Posts