import React, {useEffect, useState} from "react";
import { getPosts } from "../api/postAPI";
import { Card, Spinner } from 'react-bootstrap';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPosts()
        .then((data) => {
            console.log('DATA:', data);
            setPosts(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    if (loading) return <Spinner animation="border" />;

    return (
        <div>
            <h2 className="mb-4">Post List</h2>
            {posts.map((post) => (
                <Card className="mb-3" key={post.id}>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>{post.content}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Home;