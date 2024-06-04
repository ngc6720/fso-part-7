import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import blogService from "/src/services/blogs";
import userService from "/src/services/users";
import { useNotificationDispatcher } from "/src/components/notification/NotificationContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: 0,
    },
  },
});

export const QueryProvider = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export const useBlogs = () =>
  useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

export const useCreateBlog = (args) => {
  const notify = useNotificationDispatcher();

  return useMutation({
    ...args,
    mutationFn: blogService.create,
    onSuccess: (o) => {
      args?.onSuccess?.(o);
      queryClient.setQueryData(
        ["blogs"],
        queryClient.getQueryData(["blogs"]).concat(o)
      );
      notify({ type: "success", message: `Blog '${o.title}' added` });
    },
    onError: ({ response }) => {
      args?.onError?.(response);
      notify({
        type: "error",
        message: response.data.error ?? "Error while creating blog",
      });
    },
  }).mutate;
};

export const useCreateComment = (args) => {
  const notify = useNotificationDispatcher();

  return useMutation({
    ...args,
    mutationFn: blogService.createComment,
    onSuccess: (o) => {
      args?.onSuccess?.(o);
      queryClient.setQueryData(
        ["blogs"],
        queryClient
          .getQueryData(["blogs"])
          .map((el) => (el.id === o.id ? o : el))
      );
      notify({ type: "success", message: `Comment added` });
    },
    onError: ({ response }) => {
      args?.onError?.(response);
      notify({
        type: "error",
        message: response.data.error ?? "Error while posting comment",
      });
    },
  }).mutate;
};

export const useUpdateBlog = (args) => {
  const notify = useNotificationDispatcher();

  return useMutation({
    ...args,
    mutationFn: blogService.update,
    onSuccess: (o) => {
      args?.onSuccess?.(o);
      queryClient.setQueryData(
        ["blogs"],
        queryClient
          .getQueryData(["blogs"])
          .map((el) => (el.id === o.id ? o : el))
      );
      notify({ message: `${o.title} updated` });
    },
    onError: ({ response }) => {
      args?.onError?.(response);
      notify({ type: "error", message: "Error while updating blog" });
    },
  }).mutate;
};

export const useRemoveBlog = (args) => {
  const notify = useNotificationDispatcher();

  return useMutation({
    ...args,
    mutationFn: blogService.remove,
    onSuccess: (o) => {
      args?.onSuccess?.(o);
      queryClient.setQueryData(
        ["blogs"],
        queryClient.getQueryData(["blogs"]).filter((el) => el.id !== o.id)
      );
      notify({ type: "success", message: `Deleted '${o.title}' successfully` });
    },
    onError: ({ response }) => {
      args?.onError?.(response);
      notify({ type: "error", message: "Error while deleting blog" });
    },
  }).mutate;
};

export const UsersProvider = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });
