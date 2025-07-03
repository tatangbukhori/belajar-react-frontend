import React, { useEffect, useState, useCallback } from 'react';
import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getPosts, deletePost } from '../api/postAPI';

function ManagePosts() {
    // State
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Fetch Data
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            // call API
            const data = await getPosts();
            setPosts(data);
            setError("");
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Failed to load data";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Handlers
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure want to delete this data?")) return ;

        try {
            await deletePost(id);
            setPosts((prev) => prev.filter((post) => post.id !== id));
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Failed to delete";
            alert(message);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
    }

    // Render

    return (
        <Container className="py-4">
            <h2 className="mb-4 text-center">Manage Posts</h2>

            {/* Alert */}
            {error && (
                <Alert variant="danger" onClose={() => setError("")} dismissible>
                    {error}
                </Alert>
            )}

            {/* Table */}

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status" />
                </div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th className="text-center" style={{ width: "150px" }}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No data available.
                                </td>
                            </tr>
                        ) : (
                            posts.map((post, index) => (
                                <tr key={post.id}>
                                    <td>{index + 1}</td>
                                    <td>{post.title}</td>
                                    <td>{post.content}</td>
                                    <td className="text-center">
                                        <Button variant="warning" size="sm" className="me-2" onClick={() => handleUpdate(post.id)}>Update</Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(post.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default ManagePosts;