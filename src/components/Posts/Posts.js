import PostItem from "./PostItem";
import { gql, useQuery } from '@apollo/client';
import "./Posts.css";

const GET_POSTS = gql`
    query {
        posts {
            id
            title
            description {
                markdown
            }
        }
    }
`;

const Posts = () => {
    const { loading, error, data } = useQuery(GET_POSTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
    return (
        <div className="posts">
            {data.posts.map(post => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    );
}

export default Posts;