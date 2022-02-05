import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import FormContainer from '../components/FormContainer'
import { createPost } from '../actions/postActions'

import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const PostCreateScreen = ({ history }) => {
  const [title, setTitle] = useState('')
  const [active, setActive] = useState(false)
  const [category, setCategory] = useState('')
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty() // creating empty state
  )

  const dispatch = useDispatch()

  useEffect(() => {
    setTitle(title)
    setCategory(category)
    setActive(active)
  }, [title, category, active])

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
        `/api/postimage`,
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
    dispatch(
      createPost({
        title,
        body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
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
        <h1> Create New Post </h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='title'>
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
            Create Post
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PostCreateScreen
