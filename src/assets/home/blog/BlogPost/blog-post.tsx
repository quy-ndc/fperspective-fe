import React, { useEffect, useState } from "react";
import "./blog-post.css";
import PostUserProfile from "../UserProfile/user-profile";
import BlogTitle from "../BlogTitle/blog-title";
import UpAndDownVoteButtonHorizontal from "../../button/ReactionButton/up-down-vote-button-horizontal";
import CommentButton from "../../button/CommentButton/comment-button";
import BookmarkButton from "../../button/BookmarkButton/bookmark-button";
import Blog from "../../../../model/blog";
import { blogApi, userApi } from "../../../../config/axios";
import TagList from "../TagList/tag-list";
import User from "../../../../model/user";

type BlogPostProps = {
  upvote: number;
  numberOfComment: number;
  blog: Blog;
  userUri: string;
  userId: string;
};

const HandleApprove = (blogId: string) => () => {
  // Send a DELETE request to your backend
  blogApi
    .delete(`/approve/${blogId}`, { withCredentials: true })
    .then((response) => {
      // Handle success, e.g., show a success message or redirect
      console.log("Blog post created:", response.data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error creating blog post:", error);
    });
};

const BlogPost: React.FC<BlogPostProps> = ({
  upvote,
  numberOfComment,
  blog,
  userUri,
}) => {
  const date = new Date(blog.uploadDate);

  const initialUser: User = {
    userID: "1",
    username: "test",
    bio: "test",
    email: "test",
    avatarUrl: "test",
    campus: "test",
    term: "test",
    category: "test",
    fullName: "test",
    createdDate: 2,
    status: false,
  };

  const [users, setUsers] = useState<User>(initialUser);
  const fetchUserData = async () => {
    const response = await userApi.get(userUri, { withCredentials: true });
    setUsers(response.data);
  };
  useEffect(() => {
    fetchUserData();
  }, [userUri]);

  if (blog.status !== false) {
    return (
      <>
        <div className="home-page-post-container">
          <PostUserProfile
            key={users.userID}
            user={users}
            time={date.toLocaleString("en-US")}
          />

          <BlogTitle blogProp={blog} />

          <TagList tagList={blog.btag} />

          <div className="home-page-post-details">
            <div className="home-page-post-interact">
              <UpAndDownVoteButtonHorizontal upvote={upvote} />
              <CommentButton NumberOfComment={numberOfComment} />
            </div>

            <BookmarkButton />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="home-page-post-container">
          <PostUserProfile
            key={users.userID}
            user={users}
            time={date.toLocaleString("en-US")}
          />

          <BlogTitle blogProp={blog} />

          <TagList tagList={blog.btag} />

          <div className="home-page-post-details">
            <div className="home-page-post-interact">
              <UpAndDownVoteButtonHorizontal upvote={upvote} />
              <CommentButton NumberOfComment={numberOfComment} />
            </div>

            <BookmarkButton />
            <button onClick={HandleApprove(blog.blogId)}>Approve</button>
          </div>
        </div>
      </>
    );
  }
};

export default BlogPost;
