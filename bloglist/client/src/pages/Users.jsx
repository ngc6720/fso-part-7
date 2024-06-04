import { Link } from "react-router-dom";
import { useUsers } from "/src/contexts/queryContext";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "semantic-ui-react";

const Users = () => {
  const { data: users } = useUsers();

  return (
    <>
      <h2>Users</h2>
      <Table basic="very" celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>User name</TableHeaderCell>
            <TableHeaderCell>Blog Posts</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((u) => (
            <TableRow key={u.id}>
              <TableCell>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </TableCell>
              <TableCell>{u.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ul></ul>
    </>
  );
};

export default Users;
