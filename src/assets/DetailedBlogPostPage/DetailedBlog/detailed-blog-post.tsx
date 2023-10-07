import React from 'react';
import './detailed-blog-post.css';
import UserProfile from '../../home/blog/UserProfile/user-profile';
import BiggerBlogTitle from '../BiggerBlogTitle/bigger-blog-title';
import BlogTags from '../../home/blog/BlogTags/blog-tags';
import PostCommentForm from '../PostCommentForm/post-comment-form';
import PostContent from '../PostContent/post-content';
import PostComment from '../PostCommentSection/Comment/post-comment';

type BlogPostProps = {
    fullName: string;
    timeUpload: string;
    src: string
    blogTitle: string;
    blogTags: string[];
    numberOfComment: number;
}

const CommentSectionSample = {
    ProfilePic: [
        'src/assets/images/member-3.png',
        'src/assets/images/member-4.png',
        'src/assets/images/member-5.png',
    ],
    FullName: [
        'John Doe', 
        'Jane Smith', 
        'Alice Johnson'
    ],
    CommentDate: [
        '2023-10-01', 
        '2023-09-30', 
        '2023-09-29'
    ],
    CommentContent: [
        'Great stuff dawg, yo hit me up sometime if you wanna get high or sum shizz.',
        'Yo, nice blog man, really like this one.',
        'YOoooooooooooo, that\'s sum gud shit my dude, real nice post ya got there.',
    ],
    Upvote: [
        2342,
        8421,
        6431,
    ]
};


const DetailedBlogPost: React.FC<BlogPostProps> = ({
    fullName,
    timeUpload,
    src,
    blogTitle,
    blogTags,
}) => {

    return (
        <div className="post-container">

            <UserProfile
                name={fullName}
                time={timeUpload}
                src={src}
            />

            <BiggerBlogTitle title={blogTitle} />

            <BlogTags tags={blogTags} />

            <PostContent />

            <PostCommentForm ProfilePic='src/assets/images/member-1.png' />


            <PostComment
                ProfilePic={CommentSectionSample.ProfilePic}
                FullName={CommentSectionSample.FullName}
                CommentDate={CommentSectionSample.CommentDate}
                CommentContent={CommentSectionSample.CommentContent}
                Upvote={CommentSectionSample.Upvote}
            />


        </div>
    );
};

export default DetailedBlogPost;