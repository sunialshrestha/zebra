import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listPostDetails, updatePost } from '../actions/postActions'
import { POST_UPDATE_RESET } from '../constants/postConstants'
import { isEmpty } from '../Helpers'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@sunilshrestha/ckeditor5-build-classic'

const PostEditScreen = ({ match, history }) => {
  const postId = match.params.id
  const [title, setTitle] = useState('')
  const [active, setActive] = useState(false)
  const [category, setCategory] = useState('')
  const [body, setBody] = useState('')

  const dispatch = useDispatch()

  const postDetails = useSelector((state) => state.postDetails)
  const { loading, error, post } = postDetails

  const postUpdate = useSelector((state) => state.postUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = postUpdate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const editorConfiguration = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        'alignment',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
        '|',
        'code',
        'fontBackgroundColor',
        'fontColor',
        'fontFamily',
        'fontSize',
        '|',
        'highlight',
        'horizontalLine',
        'specialCharacters',
        'strikethrough',
        'subscript',
        'superscript',
        '|',
        'CKFinder',
        'pageNavigation',
        'previousPage',
        'nextPage',
        '|',
        'findAndReplace',
        '|',
      ],
    },
    ckfinder: {
      uploadUrl: 'http://127.0.0.1:5000/api/postimage',
      options: { resourceType: 'Images' },
    },
    language: 'en',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        'linkImage',
      ],
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties',
      ],
    },
    simpleUpload: {
      // The URL that the images are uploaded to.
      uploadUrl: 'http://127.0.0.1:5000/api/postimage',
    },
  }

  const onChangeInEditor = (event, editor) => {
    const data = editor.getData()
    setBody(data)
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (successUpdate) {
      dispatch({ type: POST_UPDATE_RESET })
      history.push('/admin/postList')
    } else {
      if (!post.title || post._id !== postId) {
        dispatch(listPostDetails(postId))
      } else {
        console.log('body', post.body)
        setTitle(post.title)
        setBody(post.body)
        setCategory(post.category)
        setActive(post.active)
      }
    }
  }, [dispatch, history, postId, post, successUpdate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updatePost({
        _id: postId,
        title,
        body,
        category,
        active,
      }),
    )
  }

  return (
    <>
      {!isEmpty(userInfo) ? (
        !userInfo.isAdmin ? (
          <h3> Please Login as Admin</h3>
        ) : (
          <>
            <Link to='/admin/postList' className='btn btn-light my-3'>
              Go Back
            </Link>
            <FormContainer>
              <h1> Edit Post </h1>
              {loadingUpdate && <Loader />}
              {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='name'>
                    <Form.Label> Title </Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter Title'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='body'>
                    <Form.Label> Body </Form.Label>
                    <CKEditor
                      editor={ClassicEditor}
                      config={editorConfiguration}
                      data={body}
                      onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor)
                      }}
                      onChange={(event, editor) => {
                        onChangeInEditor(event, editor)
                      }}
                      onBlur={(event, editor) => {
                        // console.log('Blur.', editor)
                      }}
                      onFocus={(event, editor) => {
                        //console.log('Focus.', editor)
                      }}
                    />
                  </Form.Group>

                  <Form.Group controlId='active'>
                    <Form.Label>Active</Form.Label>
                    <Form.Control
                      as='select'
                      value={active}
                      onChange={(e) => setActive(e.target.value)}
                    >
                      <option value=''> Select...</option>
                      <option value={true}> Active </option>
                      <option value={false}> Not Active </option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type='text'
                      label='Enter Category'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Button type='submit' variant='primary'>
                    Update
                  </Button>
                </Form>
              )}
            </FormContainer>
          </>
        )
      ) : (
        ''
      )}
    </>
  )
}
export default PostEditScreen
