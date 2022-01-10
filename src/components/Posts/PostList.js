import useInView from "react-cool-inview";
import ReactMarkdown from "react-markdown";
import "./PostList.css";

const PostList = (props) => {
    const { observe } = useInView({
        threshold: 0.5,
        onChange: ({inView, unobserve}) => {
            if (inView) {
                unobserve();
                props.loadMore();
            } 
        }
    });

    return (
        <div className="post-list">
            {props.posts.map((post, index) => (
                <div 
                    className="post-item shadow-card"
                    key={post.node.id}
                    ref={index === props.posts.length - 1 ? observe : null}
                >
                    <h2>{post.node.title}</h2>
                    <ReactMarkdown children={post.node.description}/>
                </div>
            ))}
        </div>
    );
};

export default PostList;
