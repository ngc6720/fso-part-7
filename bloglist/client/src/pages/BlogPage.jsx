import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import {
  useBlogs,
  useUpdateBlog,
  useRemoveBlog,
  useCreateComment,
} from "/src/contexts/queryContext";
import { useUser } from "/src/contexts/authContext";
import {
  Button,
  Segment,
  Container,
  Divider,
  Form,
  FormTextArea,
  CommentText,
  CommentGroup,
  CommentContent,
  CommentAvatar,
  CommentAuthor,
  Comment,
} from "semantic-ui-react";
import imgSrc from "/vite.svg?url";

const BlogPage = () => {
  const navigate = useNavigate();
  const [inputComment, setInputComment] = useState("");

  const user = useUser();
  const { data: blogs } = useBlogs();
  const updateBlog = useUpdateBlog();
  const removeBlog = useRemoveBlog({ onSuccess: () => navigate("/") });
  const createComment = useCreateComment({
    onSuccess: () => setInputComment(""),
  });

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs?.find((b) => b.id === match.params.id) : null;

  if (!blog) return null;

  const onLike = () => updateBlog({ ...blog, likes: blog.likes + 1 });
  const onRemove = () => {
    if (window.confirm(`Delete '${blog.title}' ?`)) removeBlog(blog);
  };
  const onComment = (e) => {
    e.preventDefault();
    createComment({
      content: e.target["content"].value,
      id: blog.id,
    });
  };

  return (
    <>
      <h2>{blog.title}</h2>
      <Segment>
        <h3>{blog.title}</h3>
        <p>by {blog.author}</p>
        <a style={{ width: "fit-content" }} href={blog.url}>
          {blog.url}
        </a>
        <Divider />
        <i aria-hidden="true" className="user circle outline icon"></i>{" "}
        <span>Added by {blog.user.name}</span>
        <Divider hidden />
        <Container>
          <Button
            positive
            onClick={onLike}
            content="Like"
            icon="heart"
            label={{ as: "a", basic: true, content: blog.likes }}
            labelPosition="right"
          />
          {user?.id && blog.user.id === user.id && (
            <Button negative onClick={onRemove}>
              remove
            </Button>
          )}
        </Container>
      </Segment>
      <Divider hidden />

      <h3>Comments</h3>
      {!blog.comments || blog.comments.length === 0 ? (
        <p>No comments yet...</p>
      ) : (
        <CommentGroup>
          {blog.comments.map((o) => (
            <Comment key={o.id}>
              <CommentAvatar src={imgSrc} />
              <CommentContent>
                <CommentAuthor as="span">Anonymous</CommentAuthor>
                <CommentText> {o.content}</CommentText>
              </CommentContent>
            </Comment>
          ))}
        </CommentGroup>
      )}

      <Divider></Divider>
      <Form reply onSubmit={onComment}>
        <h3>Add a comment</h3>
        <FormTextArea
          maxLength="500"
          value={inputComment}
          onChange={({ target }) => setInputComment(target.value)}
          type="text"
          name="content"
          autoComplete="off"
          required
        />
        <Button content="Post" labelPosition="left" icon="edit" primary />
      </Form>
    </>
  );
};

export default BlogPage;
