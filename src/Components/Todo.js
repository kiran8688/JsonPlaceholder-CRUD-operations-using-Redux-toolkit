import React, { useContext, useEffect } from 'react'
import { IdContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { showTodoSlice } from '../Slices/TodosSlice'
import { Button, Card, Col } from 'react-bootstrap'

const Todo = () => {
    const { userId } = useContext(IdContext)
    const todoDetail = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(showTodoSlice(userId))
    }, [userId, dispatch])
    console.log(todoDetail);
    const clickHandler = (id) => {

    }

    var todoDisplay

    todoDisplay = Object.values(todoDetail?.todos?.todoList).map((todo, index) => {
        return (
            <Col xxl={4} className='mb-4' key={todo.id}>
                <Card border={(todo?.completed === true) ? 'success' : 'danger'} className="text-center border-2" style={{ height: '12vmax' }} >
                    <Card.Header className='d-flex justify-content-between align-items-center'><h6 className='mb-0 text-secondary'>Todo Number:{[index + 1]}</h6></Card.Header>
                    <Card.Body className='' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Card.Title>{todo?.title}</Card.Title>
                        <div className='d-flex justify-content-around'>
                            <Button variant="primary" onClick={() => clickHandler(todo?.id)}>Mark as Complete</Button>
                            <Button variant='danger'>Delete</Button>
                        </div>
                    </Card.Body>
                    <Card.Footer className="text-muted"><strong>Task Status:{(todo?.completed === true) ? (<span className='text-success'> Completed</span>) : (<span className='text-danger'> Incomplete</span>)}</strong></Card.Footer>
                </Card>
            </Col>
        )
    })

    var todosRender

    todosRender = (<Col xxl={8} className='row ms-3 mt-5 border-3 border-start border-secondary' >

<div className='d-flex  justify-content-between' style={{ alignItems: 'center' }}>
            <h1 className='text-center'>{todoDetail?.userDetails?.userDetailsList?.name}'s Todos List</h1>
            <Button variant='primary'>+ Add New Todo</Button>
        </div>
        {todoDisplay}
    </Col>)

    return (
        < >


            {todoDetail?.todos?.loading && <div>Loading...</div>}
            {!todoDetail?.todos?.loading && todoDetail?.todos?.error ? <div>Error: {todoDetail?.todos.error}</div> : null}
            {!todoDetail?.todos?.loading && todoDetail?.todos?.todoList?.length ? todosRender : null}

        </>
    )
}

export default Todo