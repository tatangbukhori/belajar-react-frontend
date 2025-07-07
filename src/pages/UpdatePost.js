import React, { useEffect, useState} from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { showPost, updatePost } from '../api/postAPI';


function UpdatePost() {
  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [formData, setFormData] = useState({
    title: "", 
    content: ""
  });
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [success, setSuccess] = useState(false);

  // Fetch
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await showPost(id);
        setFormData({
          title: data.title,
          content: data.content
        });
      } catch (err) {
        const errors = err.response?.data?.errors;
        if (Array.isArray(errors)) {
          setErrorMessages(errors.map((e) => e.msg));
        } else {
          const message = err.response?.data?.message || err.message || "Failed to update.";
          setErrorMessages(message);
        }
      } finally {
        setLoadingData(false);
      }
    };

    fetchDetail();
  }, [id]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessages([]);

    try {
      await updatePost(id, formData);
      setSuccess(true);
      setTimeout(() => navigate("/manage"), 1000);
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (Array.isArray(errors)) {
        setErrorMessages(errors.map((e) => e.msg));
      } else {
        const message = err.response?.data?.message || err.message || "Failed to update.";
        setErrorMessages([message]);
      }
    } finally {
      setSaving(false);
    }
  };

  // Render
  if (loadingData) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="text-center mb-4">Update Post #{id}</h2>

          {/* Alert */}
          {errorMessages.length > 0 && (
            <Alert variant="danger" dismissible onClose={() => setErrorMessages([])}>
              <ul className="mb-0">
                {errorMessages.map((msg, idx) => (
                  <li key={idx}>{msg}</li>
                ))}
              </ul></Alert>
          )}
          {success && (
            <Alert variant="success" dismissible>Post complete to update!</Alert>
          )}

          {/* Form */}
          <Form onSubmit={handleSubmit} noValidate>
            {/* Title */}
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" placeholder="Insert title in here" value={formData.title} onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">Title is required</Form.Control.Feedback>
            </Form.Group>
            {/* Content */}
            <Form.Group className="mb-4" controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={4} name="content" placeholder="Insert content in here" value={formData.content} onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">Content is required</Form.Control.Feedback>
            </Form.Group>

            <Button variant="warning" type="submit" className="w-100" disabled={saving}>
              {saving ? <Spinner as="span" animation="border" size="sm" /> : "Update"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdatePost;