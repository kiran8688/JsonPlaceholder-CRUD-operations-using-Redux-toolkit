import React, { useContext, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IdContext } from '../App'
import { showPosts } from '../Slices/PostsSlice'
import { Button, Card, Col } from 'react-bootstrap'

const Posts = () => {

    const { userId } = useContext(IdContext)
    const posts = useSelector(state => state.posts)
    const userDetails = useSelector(state => state.userDetails)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showPosts(userId))
    }, [userId, dispatch])

    const postDisplay = useMemo(() => {
        return posts?.postsList?.map((post, index) => (
            <Col xxl={12} className='mb-4' key={post.id}>
                <Card>
                    <Card.Header className='d-flex justify-content-between align-items-center'><h6 className="mb-0 text-gray-600">Post ID:{index + 1}</h6></Card.Header>
                    <Card.Body style={{ textAlign: 'left' }}>
                        <Card.Title className='text-success'>{post?.title}</Card.Title>
                        <Card.Text className='text-truncate'>
                            {post?.body}
                        </Card.Text>
                        <Button variant="primary">Show Post</Button>
                    </Card.Body>
                </Card>
            </Col>
        ))
    }, [posts?.postsList])

    const postssRender = useMemo(() => (
        <Col xxl={8} className='row ms-3 mt-5 border-3 border-start border-secondary' >
            <div className='d-flex  justify-content-between' style={{ alignItems: 'center' }}>
                <h1 className='text-center'>{userDetails?.userDetailsList?.name}'s Posts</h1>
                <Button variant='primary'>+ Add a Post</Button>
            </div>
            {postDisplay}
        </Col>
    ), [userDetails?.userDetailsList?.name, postDisplay])

    return (
        <>
            {posts?.loading && <div>Loading...</div>}
            {!posts?.loading && posts?.error ? <div>Error: {posts.error}</div> : null}
            {!posts?.loading && posts?.postsList?.length ? postssRender : null}
        </>
    )
}

export default Posts