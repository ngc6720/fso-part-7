import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div className="main-content">
      <span>
        <Link to={`/blogs/${blog.id}`}>
          <span>{blog.title}</span>
        </Link>
        , by <span>{blog.author} </span>
      </span>
    </div>
  );
};

export default Blog;
