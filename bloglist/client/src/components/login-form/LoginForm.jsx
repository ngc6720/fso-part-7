import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "/src/contexts/authContext";
import { FormField, Button, Form } from "semantic-ui-react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .login({
        username,
        password,
      })
      .then(() => {
        setUsername("");
        setPassword("");
        navigate("/");
      })
      .catch((e) => e);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <FormField>
        <label>Username</label>
        <input
          type="text"
          value={username}
          id="username"
          onChange={({ target }) => setUsername(target.value)}
          autoComplete="off"
          placeholder="Enter your username..."
        />
      </FormField>
      <FormField>
        <label>Password</label>
        <input
          type="password"
          value={password}
          id="password"
          onChange={({ target }) => setPassword(target.value)}
          autoComplete="off"
          placeholder="Enter your password..."
        />
      </FormField>
      {/* <FormField>
        <Checkbox label="I agree to the Terms and Conditions" />
      </FormField> */}
      <Button primary type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
