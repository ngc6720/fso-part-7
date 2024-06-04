import { useState } from "react";
import { useCreateBlog } from "/src/contexts/queryContext";
import { FormField, Button, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const CreateBlogForm = () => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const navigate = useNavigate();

  const createBlog = useCreateBlog({
    onSuccess: (b) => {
      setInputTitle("");
      setInputAuthor("");
      setInputUrl("");
      navigate(`/blogs/${b.id}`);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    createBlog({
      title: inputTitle,
      author: inputAuthor,
      url: inputUrl,
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <h3>Create a new blog</h3>
      <FormField>
        <label>Title</label>
        <input
          type="text"
          value={inputTitle}
          name="title"
          onChange={({ target }) => setInputTitle(target.value)}
          autoComplete="off"
          required
          placeholder="Enter the title..."
        />
      </FormField>
      <FormField>
        <label>Author</label>
        <input
          type="text"
          value={inputAuthor}
          name="author"
          onChange={({ target }) => setInputAuthor(target.value)}
          autoComplete="off"
          placeholder="Enter the author's name..."
        />
      </FormField>
      <FormField>
        <label>Url</label>
        <input
          type="text"
          value={inputUrl}
          name="url"
          onChange={({ target }) => setInputUrl(target.value)}
          autoComplete="off"
          required
          placeholder="Provide a link to the blog..."
        />
      </FormField>
      <FormField>
        {/* <Checkbox label='I agree to the Terms and Conditions' /> */}
      </FormField>
      <Button primary type="submit">
        Post
      </Button>
    </Form>
  );
};

export default CreateBlogForm;
