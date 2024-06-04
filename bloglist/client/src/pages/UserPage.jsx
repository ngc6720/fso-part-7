import { useMatch, Link } from "react-router-dom";
import { useUsers } from "/src/contexts/queryContext";
import { List, ListItem } from "semantic-ui-react";

const UserPage = () => {
  const { data: users } = useUsers();
  const match = useMatch("/users/:id");
  const user = match ? users?.find((u) => u.id === match.params.id) : null;

  return (
    <>
      <h2>{user?.name}</h2>
      <List>
        <h3>Added blogs :</h3>
        {user?.blogs?.map((o) => (
          <ListItem key={o.id}>
            <Link to={`/blogs/${o.id}`}>{o.title}</Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default UserPage;
