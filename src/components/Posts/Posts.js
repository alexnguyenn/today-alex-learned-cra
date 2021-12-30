import PostList from "./PostList";
import { useState } from "react";
import { gql, useQuery } from '@apollo/client';
import "./Posts.css";

const GET_POSTS = gql`
    query {
        posts(orderBy: createdAt_DESC) {
            id
            title
            description {
                markdown
            }
        }
    }
`;

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const { loading, error, data } = useQuery(GET_POSTS, {onCompleted: (data) => setPosts(data.posts)});
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading content from GraphCMS :(</p>;
    
    const searchHandler = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filteredPosts = data.posts.filter(post => {
            return post.title.toLowerCase().includes(searchValue) || post.description.markdown.toLowerCase().includes(searchValue);
        });
        setPosts(filteredPosts);
    };

    return (
        <div>
            <input className="search-bar" type="text" placeholder="Search" onChange={searchHandler}/>
            <PostList posts={posts} />
        </div>
    );
}

export default Posts;