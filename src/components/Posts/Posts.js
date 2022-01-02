import PostList from "./PostList";
import { useRef } from "react";
import { gql, useQuery } from '@apollo/client';
import "./Posts.css";

const GET_POSTS = gql`
    query($first: Int!, $after: String, $search: String! = "") {
        postsConnection(orderBy: createdAt_DESC, first: $first, after: $after, where: {_search: $search}) {
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
    const searchRef = useRef();
    const { loading, error, data, fetchMore, refetch } = useQuery(GET_POSTS, {
        variables: {
            first: 20,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading content from GraphCMS :(</p>;
    
    const posts = data.postsConnection.edges;
    const pageInfo = data.postsConnection.pageInfo;

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            applyFilter();
        }
    };

    const applyFilter = () => {
        refetch({
            search: searchRef.current.value,
        });
    };

    const loadMore = () => {
        if (pageInfo.hasNextPage) {
            fetchMore({
                variables: {
                    first: 10,
                    after: pageInfo.endCursor
                },
            });
        };
    };

    return (
        <div>
            <input 
                id="search-bar" 
                className="shadow-card" 
                type="text" 
                placeholder="Search posts" 
                ref = {searchRef}
                onKeyPress={handleKeyPress}
            />
            <PostList posts={posts} loadMore={loadMore}/>
        </div>
    );
}

export default Posts;
