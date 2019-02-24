import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Grid, Image, Segment } from 'semantic-ui-react'
import InlineError from '../messages/InlineError'

export class BookForm extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired,
    book: PropTypes.shape({
      goodreadsId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.string.isRequired,
      covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      pages: PropTypes.number.isRequired
    }).isRequired
  }

  state = {
    data: {
      goodreadsId: this.props.book.goodreadsId,
      title: this.props.book.title,
      authors: this.props.book.authors,
      cover: this.props.book.covers[0],
      pages: this.props.book.pages
    },
    index: 0,
    covers: this.props.book.covers,
    loading: false,
    errors: {}
  }

  onChange = e => {
    this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })
  }

  onChangeNumber = e => {
    this.setState({ data: { ...this.state.data, [e.target.name]: parseInt(e.target.value) } })
  }

  submit = () => {
    let errors = this.validate(this.state.data)
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true })
      this.props
        .submit(this.state.data)
        .catch(err => {
          this.setState({ errors: err.response.data.errors, loading: false })
        })
    }
  }

  validate = (data) => {
    const errors = {}
    if (!data.title) errors.title = "Can't be blank."
    if (!data.authors) errors.authors = "Can't be blank."
    if (!data.pages) errors.pages = "Can't be blank."
    return errors
  }

  changeCover = () => {
    const { index, covers } = this.state
    const newIndex = (index + 1) % covers.length
    this.setState({
      index: newIndex,
      data: { ...this.state.data, cover: covers[newIndex] }
    })
  }

  render () {
    const { loading, errors, data } = this.state
    return (
      <Segment>
        <Form onSubmit={this.submit} loading={loading}>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.title}>
                  <label htmlFor='title'>Book Title</label>
                  <input type='text' name='title' id='title' placeholder='Title' value={data.title} onChange={this.onChange} />
                  { errors.title && <InlineError text={errors.title} /> }
                </Form.Field>

                <Form.Field error={!!errors.authors}>
                  <label htmlFor='authors'>Book Authors</label>
                  <input type='text' name='authors' id='authors' placeholder='Authors' value={data.authors} onChange={this.onChange} />
                  { errors.authors && <InlineError text={errors.authors} /> }
                </Form.Field>

                <Form.Field error={!!errors.pages}>
                  <label htmlFor='pages'>Book Pages</label>
                  <input type='number' name='pages' id='pages' placeholder='pages' value={data.pages} onChange={this.onChangeNumber} />
                  { errors.pages && <InlineError text={errors.pages} /> }
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Image size='small' src={data.cover} />
                {
                  this.state.covers.length > 1 && (
                    <a role='button' tabIndex={0} onClick={this.changeCover}>Another Cover</a>
                  )
                }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Button type='submit' primary>Save</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    )
  }
}

export default BookForm
