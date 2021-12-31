import PostList from "./PostList";
import { useState } from "react";
import { gql, useQuery } from '@apollo/client';
import "./Posts.css";

const GET_POSTS = gql`
    query($after: String) {
        postsConnection(orderBy: createdAt_DESC, first: 1, after: $after) {
            edges {
                node {
                    id
                    title
                    description {
                        markdown
                    }
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`;

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
        onCompleted: (data) => setPosts(data.postsConnection.edges),
        pollInterval: 500,
    });
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading content from GraphCMS :(</p>;

    const pageInfo = data.postsConnection.pageInfo;
    
    const searchHandler = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filteredPosts = data.postsConnection.edges.filter(post => {
            return post.node.title.toLowerCase().includes(searchValue) || post.node.description.markdown.toLowerCase().includes(searchValue);
        });
        setPosts(filteredPosts);
    };

    const loadMoreHandler = () => {
        fetchMore({
            variables: {
                after: pageInfo.endCursor
            },
        });
    };

    return (
        <div>
            <input id="search-bar" className="shadow-card" type="text" placeholder="Search posts" onChange={searchHandler}/>
            <PostList posts={posts}/>
            {pageInfo.hasNextPage && <button className="shadow-card" onClick={loadMoreHandler}>Load more</button>}
        </div>
    );
}

export default Posts;
