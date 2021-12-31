import PostList from "./PostList";
import { useState } from "react";
import { gql, useQuery } from '@apollo/client';
import "./Posts.css";

const GET_POSTS = gql`
    query($after: String, $search: String) {
        postsConnection(orderBy: createdAt_DESC, first: 10, after: $after, where: {_search: $search}) {
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
    const [filter, setFilter] = useState("");
    const { loading, error, data, fetchMore, refetch } = useQuery(GET_POSTS, {
        variables: {
            search: "",
        },
    });
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading content from GraphCMS :(</p>;
    
    const posts = data.postsConnection.edges;
    const pageInfo = data.postsConnection.pageInfo;
    
    const updateFilter = (event) => {
        setFilter(event.target.value);
    };

    const applyFilter = () => {
        refetch({
            search: filter,
        });
    };

    const loadMore = () => {
        fetchMore({
            variables: {
                after: pageInfo.endCursor
            },
        });
    };

    return (
        <div>
            <input id="search-bar" className="shadow-card" type="text" placeholder="Search posts" onChange={updateFilter}/>
            <button onClick={applyFilter}>Search</button>
            <PostList posts={posts}/>
            {pageInfo.hasNextPage && <button onClick={loadMore}>Load more</button>}
        </div>
    );
}

export default Posts;
