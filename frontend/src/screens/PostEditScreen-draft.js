import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listPostDetails, updatePost } from '../actions/postActions'
import { POST_UPDATE_RESET } from '../constants/postConstants'

import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
  convertFromHTML,
} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { convertToHTML } from 'draft-convert'
import DOMPurify from 'dompurify'

const PostEditScreen = ({ match, history }) => {
  const postId = match.params.id
  const [title, setTitle] = useState('')
  const [active, setActive] = useState(false)
  const [category, setCategory] = useState('')

  const dispatch = useDispatch()

  const postDetails = useSelector((state) => state.postDetails)
  const { loading, error, post } = postDetails

  const postUpdate = useSelector((state) => state.postUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = postUpdate

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty() // creating empty state
  )

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: POST_UPDATE_RESET })
      history.push('/admin/postList')
    } else {
      if (!post.title || post._id !== postId) {
        dispatch(listPostDetails(postId))
      } else {
        setTitle(post.title)
        setEditorState(
          EditorState.createWithContent(convertFromRaw(JSON.parse(post.body)))
        )
        setCategory(post.category)
        setActive(post.active)
      }
    }
  }, [dispatch, history, postId, post, successUpdate])

  /*
  // converting editor text to html
  const [convertedContent, setConvertedContent] = useState(null)
 
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent())
    setConvertedContent(currentContentAsHTML)
  }

  // purify and sanitize the html to protect from XSS attack
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    }
  }
*/

  // uploading image to the server and return the link
  const uploadImageCallBack = async (file) => {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data: imgData } = await axios.post(
        `/api/upload`,
        formData,
        config
      )

      return Promise.resolve({
        data: {
          link: `${process.env.PUBLIC_URL}${imgData}`,
        },
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    //console.log(JSON.stringify(editorState))

    dispatch(
      updatePost({
        _id: postId,
        title,
        body: JSON.stringify(convertToRaw(EditorState.getCurrentContent)),
        category,
        active,
      })
    )
  }

  return (
    <>
      <Link to='/admin/postlist' className='btn btn-light my-3'>
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
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                editorStyle={{
                  border: '1px solid #c0c0c0',
                  height: '500px',
                  width: '200%',
                  overflow: 'hidden',
                }}
                wrapperClassName='wrapper-editor-class'
                editorClassName='editor-class'
                toolbarClassName='toolbar-editor-class'
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                  image: {
                    uploadEnabled: true,
                    uploadCallback: uploadImageCallBack,
                    inputAccept:
                      'image/gif, image/jpeg, image/jpg, image/png, image/svg',
                    alt: { present: true, mandatory: true },
                    defaultSize: {
                      height: 'auto',
                      width: 'auto',
                    },
                  },
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
}

export default PostEditScreen
