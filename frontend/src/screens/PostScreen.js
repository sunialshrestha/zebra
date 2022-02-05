import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listPostDetails } from '../actions/postActions'

const PostScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const postDetails = useSelector((state) => state.postDetails)
  const { loading, error, post } = postDetails

  const createMarkup = (post) => {
    return { __html: post.body }
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push('/login')
    }
    dispatch(listPostDetails(match.params.id))
  }, [dispatch, match, history, userInfo])

  return (
    <>
      <Link className='btn btn-light my-3' to='/admin/postList'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={post.title} />
          <Row>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3> {post.title} </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description:{' '}
                  <div dangerouslySetInnerHTML={createMarkup(post)} />
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default PostScreen
