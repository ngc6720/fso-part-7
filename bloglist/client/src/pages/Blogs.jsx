import { useMemo } from "react";

import { useUser } from "/src/contexts/authContext";
import { useBlogs } from "/src/contexts/queryContext";

import CreateBlogForm from "/src/components/create-blog-form/CreateBlogForm";
import Blog from "/src/components/blog/Blog";
import { List, ListItem, Segment, TabPane, Tab } from "semantic-ui-react";

const Blogs = () => {
  const user = useUser();

  const { data: blogs } = useBlogs();

  const blogsSortedByLikes = useMemo(
    () => blogs?.toSorted((a, b) => b.likes - a.likes),
    [blogs]
  );

  const panes = [
    {
      menuItem: "Blogs",
      render: () => (
        <TabPane basic attached={false}>
          <List size="massive">
            <h3>The beautiful blogs</h3>
            {blogsSortedByLikes?.map((blog) => (
              <ListItem key={blog.id}>
                <Segment>
                  <Blog user={user} blog={blog} />
                </Segment>
              </ListItem>
            ))}
          </List>
        </TabPane>
      ),
    },
    {
      menuItem: "Create New",
      render: () => (
        <TabPane basic attached={false}>
          <CreateBlogForm />
        </TabPane>
      ),
    },
  ];

  return (
    <>
      <h2>Blogs</h2>
      {user ? (
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      ) : (
        panes[0].render()
      )}
    </>
  );
};

export default Blogs;
