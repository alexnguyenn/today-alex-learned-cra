import ReactMarkdown from "react-markdown";
import "./PostItem.css";

const PostItem = (props) => {
    return (
        <div className="post-item shadow-card">
            <h2>{props.post.title}</h2>
            <ReactMarkdown children={props.post.description.markdown}/>
        </div>
    );
};

export default PostItem;
