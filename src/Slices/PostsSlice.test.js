import postReducer, {
  showPosts,
  createPostSlice,
  updatePostSlice,
  deletePostSlice,
} from "./PostsSlice";
import axios from "axios";

jest.mock("axios");

describe("PostsSlice", () => {
  const initialState = {
    postsList: [],
    loading: false,
    error: null,
    createdPost: {},
    updatedPost: {},
    deletedPost: {},
  };

  it("should handle initial state", () => {
    expect(postReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("Reducer cases", () => {
    describe("showPosts", () => {
      it("should handle showPosts.pending", () => {
        const action = { type: showPosts.pending.type };
        const state = postReducer(initialState, action);
        expect(state.loading).toBe(true);
      });

      it("should handle showPosts.fulfilled", () => {
        const posts = [{ id: 1, title: "Post 1" }];
        const action = { type: showPosts.fulfilled.type, payload: posts };
        const state = postReducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.postsList).toEqual(posts);
        expect(state.error).toBe("");
      });

      it("should handle showPosts.rejected", () => {
        const error = "Failed to fetch";
        const action = { type: showPosts.rejected.type, error: { message: error } };
        const state = postReducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.postsList).toEqual([]);
        expect(state.error).toBe(error);
      });
    });

    describe("createPostSlice", () => {
      it("should handle createPostSlice.pending", () => {
        const action = { type: createPostSlice.pending.type };
        const state = postReducer(initialState, action);
        expect(state.loading).toBe(true);
      });

      it("should handle createPostSlice.fulfilled", () => {
        const post = { id: 1, title: "New Post" };
        const action = { type: createPostSlice.fulfilled.type, payload: post };
        const state = postReducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.createdPost).toEqual(post);
        expect(state.error).toBe("");
      });

      it("should handle createPostSlice.rejected", () => {
        const error = "Failed to create";
        const action = { type: createPostSlice.rejected.type, error: { message: error } };
        const state = postReducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.createdPost).toEqual({});
        expect(state.error).toBe(error);
      });
    });

    describe("updatePostSlice", () => {
      it("should handle updatePostSlice.pending", () => {
        const action = { type: updatePostSlice.pending.type };
        const state = postReducer(initialState, action);
        expect(state.loading).toBe(true);
      });

      it("should handle updatePostSlice.fulfilled", () => {
        const post = { id: 1, title: "Updated Post" };
        const action = { type: updatePostSlice.fulfilled.type, payload: post };
        const state = postReducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.updatedPost).toEqual(post);
        expect(state.error).toBe("");
      });

      it("should handle updatePostSlice.rejected", () => {
        const error = "Failed to update";
        const action = { type: updatePostSlice.rejected.type, error: { message: error } };
        const state = postReducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.updatedPost).toEqual({});
        expect(state.error).toBe(error);
      });
    });

    describe("deletePostSlice", () => {
      it("should handle deletePostSlice.pending", () => {
        const action = { type: deletePostSlice.pending.type };
        const state = postReducer(initialState, action);
        expect(state.loading).toBe(true);
      });

      it("should handle deletePostSlice.fulfilled", () => {
        const post = { id: 1 };
        const action = { type: deletePostSlice.fulfilled.type, payload: post };
        const state = postReducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.deletedPost).toEqual(post);
        expect(state.error).toBe("");
      });

      it("should handle deletePostSlice.rejected", () => {
        const error = "Failed to delete";
        const action = { type: deletePostSlice.rejected.type, error: { message: error } };
        const state = postReducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.deletedPost).toEqual({});
        expect(state.error).toBe(error);
      });
    });
  });

  describe("Async Thunks", () => {
    it("showPosts should fetch posts and return data", async () => {
      const posts = [{ id: 1, title: "Post 1" }];
      axios.get.mockResolvedValueOnce({ data: posts });

      const dispatch = jest.fn();
      const thunk = showPosts(1);
      const result = await thunk(dispatch, () => ({}), {});

      expect(axios.get).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users/1/posts");
      expect(result.payload).toEqual(posts);
      expect(result.type).toBe("showPosts/fulfilled");
    });

    it("createPostSlice should create post and return data", async () => {
      const post = { id: 1, title: "New Post" };
      axios.post.mockResolvedValueOnce({ data: post });

      const dispatch = jest.fn();
      const thunk = createPostSlice();
      const result = await thunk(dispatch, () => ({}), {});

      expect(axios.post).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users/posts");
      expect(result.payload).toEqual(post);
      expect(result.type).toBe("createPost/fulfilled");
    });

    it("updatePostSlice should update post and return data", async () => {
      const post = { id: 1, title: "Updated Post" };
      axios.patch.mockResolvedValueOnce({ data: post });

      const dispatch = jest.fn();
      const thunk = updatePostSlice(1);
      const result = await thunk(dispatch, () => ({}), {});

      expect(axios.patch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users/1/posts");
      expect(result.payload).toEqual(post);
      expect(result.type).toBe("updatePost/fulfilled");
    });

    it("deletePostSlice should delete post and return data", async () => {
      const post = { id: 1 };
      axios.delete.mockResolvedValueOnce({ data: post });

      const dispatch = jest.fn();
      const thunk = deletePostSlice(1);
      const result = await thunk(dispatch, () => ({}), {});

      expect(axios.delete).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users/1/posts");
      expect(result.payload).toEqual(post);
      expect(result.type).toBe("deletePost/fulfilled");
    });

    it("showPosts should handle error", async () => {
      const errorMessage = "Network Error";
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      const dispatch = jest.fn();
      const thunk = showPosts(1);
      const result = await thunk(dispatch, () => ({}), {});

      expect(result.type).toBe("showPosts/rejected");
      expect(result.error.message).toBe(errorMessage);
    });
  });
});
