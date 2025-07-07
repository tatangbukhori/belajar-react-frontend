import React, {useState} from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/postAPI';

function CreatePost() {
  // State
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessages([]);

    try {
      // call API
      await createPost(formData);
      setSuccess(true);
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (Array.isArray(errors)) {
        setErrorMessages(errors.map((e) => e.msg));
      } else {
        const message = err.response?.data?.message || err.message || "There is an error";
        setErrorMessages([message]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Render
  return(
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="text-center mb-4">Create Post</h2>

          {/* Alert */}
          {errorMessages.length > 0 && (
            <Alert variant="danger" dismissible onClose={() => setErrorMessages([])}>
              <ul className="mb-0">
                {errorMessages.map((msg, idx) => (
                  <li key={idx}>{msg}</li>
                ))}
              </ul>
            </Alert>
          )}

          {success && (
            <Alert variant="success" dismissible> Post berhasil ditambahkan! </Alert>
          )}

          {/* Form */}
          <Form onSubmit={handleSubmit} noValidate>

            {/* Title */}
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" placeholder="Insert title in here" value={formData.title} onChange={handleChange} required/>
              <Form.Control.Feedback type="invalid">
                Title is required
              </Form.Control.Feedback>
            </Form.Group>

            {/* Content */}
            <Form.Group className="mb-4" controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={4} name="content" placeholder="Insert content in here" value={formData.content} onChange={handleChange} required></Form.Control>
              <Form.Control.Feedback type="invalid">
                Content is required
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? (
                <Spinner as="span" animation="border" size="sm" role="status" />
              ) : (
                "Save"
              )}
            </Button>

          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePost;
