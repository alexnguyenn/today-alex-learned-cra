import PostItem from "./PostItem";
import "./PostList.css";

const PostList = (props) => {
    return (
        <div className="post-list">
            {props.posts.map(post => (
                <PostItem key={post.node.id} post={post.node}/>
            ))}
        </div>
    );
};

export default PostList;
