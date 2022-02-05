import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import FormContainer from '../components/FormContainer'
import { createPost } from '../actions/postActions'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@sunilshrestha/ckeditor5-build-classic'
import { isEmpty } from '../Helpers'

const PostCreateScreen = ({ history }) => {
  const [title, setTitle] = useState('')
  const [active, setActive] = useState(false)
  const [category, setCategory] = useState('')
  const [body, setBody] = useState('')

  const dispatch = useDispatch()

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
        'toggleImageCaption',
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

    setTitle(title)
    setCategory(category)
    setActive(active)

    // adding ckfinder script tags
    const script = document.createElement('script')
    script.src = 'https://ckeditor.com/apps/ckfinder/3.5.0/ckfinder.js'
    script.async = true
    document.body.appendChild(script)
  }, [title, category, active, history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createPost({
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
                  <CKEditor
                    editor={ClassicEditor}
                    config={editorConfiguration}
                    data=''
                    onReady={(editor) => {
                      editor.editing.view.change((writer) => {
                        writer.setStyle(
                          'width',
                          '700px',
                          editor.editing.view.document.getRoot(),
                        )
                      })
                    }}
                    onChange={(event, editor) => {
                      onChangeInEditor(event, editor)
                    }}
                    onBlur={(event, editor) => {
                      // console.log('Blur.', editor)
                    }}
                    onFocus={(event, editor) => {
                      // console.log('Focus.', editor)
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
      ) : (
        'Only Admin is allowed'
      )}
    </>
  )
}

export default PostCreateScreen
