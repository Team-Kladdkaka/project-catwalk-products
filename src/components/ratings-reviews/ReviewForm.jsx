import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Rating from '@material-ui/lab/Rating';
import Button from 'react-bootstrap/Button';

function ReviewForm(props) {
  const starLabels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good+',
    5: 'Great',
  };
  return (
    <Form>
      <Form.Group>
        <h3>Overall Rating</h3>
        <Rating className="modal-form-stars" style={{ width: '100%' }} />
        <Form.Label>Do you recommend this product?</Form.Label>
        <Form.Check
          inline
          type="radio"
          value="yes"
          label="Yes"
          style={{ margin: '2rem' }}
          title="recommended-check"
        />
        <Form.Check
          required
          inline
          type="radio"
          value="no"
          label="No"
          title="recommended-check"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Review Summary</Form.Label>
        <Form.Control type="input" placeholder="Example: Best purchase ever!" />
        <Form.Label>Review</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Why did you like the product or not?"
          required
        />
        <Form.File
          id="custom-file"
          label="Optional: Upload Photos"
          custom
          style={{ marginTop: '1rem' }}
        />
      </Form.Group>
      <hr></hr>
      <Form.Group>
        <Form.Label>What is your nickname?</Form.Label>
        <Form.Control required placeholder="Example: jackson11!" />
        <Form.Text className="text-muted">
          For privacy reasons, do not use your full name or email address.
        </Form.Text>
        <Form.Label>Your Email</Form.Label>
        <Form.Control required placeholder="Example: jackson11@email.com" />
        <Form.Text className="text-muted">
          For authentication reasons, you will not be emailed
        </Form.Text>
      </Form.Group>
      <hr></hr>
      <Button
        id="review-submit-button"
        type="submit"
        onClick={props.handleClose}
        style={{ float: 'right', margin: '1rem 1rem' }}
      >
        Submit
      </Button>
    </Form>
  );
}

export default ReviewForm;