import PostItem from "./PostItem";
import "./PostList.css";

const PostList = (props) => {
    return (
        <div className="post-list">
            {props.posts.map(post => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList;