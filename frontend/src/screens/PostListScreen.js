import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listPosts, deletePost } from '../actions/postActions'
import { isEmpty } from '../Helpers'

import {
  POST_CREATE_RESET,
  POST_ACTIVE,
  POST_NOT_ACTIVE,
} from '../constants/postConstants'

const PostListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const postList = useSelector((state) => state.postList)
  const { loading, error, posts, page, pages } = postList

  const postDelete = useSelector((state) => state.postDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = postDelete

  const postCreate = useSelector((state) => state.postCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    post: createdPost,
  } = postCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: POST_CREATE_RESET })

    if (isEmpty(userInfo)) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/post/${createdPost._id}/edit`)
    } else {
      dispatch(listPosts('', pageNumber))
    }
  }, [
    dispatch,
    userInfo,
    history,
    successDelete,
    successCreate,
    createdPost,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePost(id))
    }
  }

  return (
    <>
      {!isEmpty(userInfo) ? (
        !userInfo.isAdmin ? (
          <h3> Please Login as Admin</h3>
        ) : (
          <>
            <Row className='align-items-center'>
              <Col>
                <h1> Posts</h1>
              </Col>
              <Col className='text-right'>
                <Link to='/admin/post/create' className='fas fa-plus'>
                  Create Post
                </Link>
              </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'> {error} </Message>
            ) : (
              <>
                <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th> Title </th>
                      <th> PUBLISHED DATE </th>
                      <th> ACTIVE</th>
                      <th> CATEGORY </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post._id}>
                        <td>
                          <Link to={`/post/${post._id}`}>{post.title}</Link>{' '}
                        </td>

                        <td>{post.updatedAt}</td>
                        <td>{post.active ? POST_ACTIVE : POST_NOT_ACTIVE}</td>
                        <td>{post.category}</td>
                        <td>
                          <LinkContainer to={`/admin/post/${post._id}/edit`}>
                            <Button variant='light' className='btn-sm'>
                              <i className='fas fa-edit'></i>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant='danger'
                            className='btn-sm'
                            onClick={() => deleteHandler(post._id)}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Paginate
                  screen='postlist'
                  pages={pages}
                  page={page}
                  isAdmin={true}
                />
              </>
            )}
          </>
        )
      ) : (
        ''
      )}
    </>
  )
}

export default PostListScreen
