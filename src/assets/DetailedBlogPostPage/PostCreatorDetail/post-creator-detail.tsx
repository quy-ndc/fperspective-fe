import React, { useEffect, useState } from 'react';
import './post-creator-detail.css';
import UserFollowButton from '../../home/button/FollowButton/follow-button';
import User from '../../../model/user';
import { userApi } from '../../../config/axios';
import { Link } from 'react-router-dom';

type BlogPostProps = {
    userUri: string
    currentUser?: string;
}


const PostCreator: React.FC<BlogPostProps> = ({
    userUri,
    currentUser
}) => {

    const initialUser: User = {
        userID: "1",
        username: "Loading...",
        bio: "Loading...",
        email: "Loading...",
        avatarUrl: "Loading...",
        campus: "Loading...",
        term: "Loading...",
        category: "Loading...",
        fullName: "Loading...",
        createdDate: 2,
        status: false,
        role: '',
        loginProvider: '',
        name: ''
    }

    const [user, setUsers] = useState<User>(initialUser);
    const fetchUserData = async () => {
        const response = await userApi.get(userUri, { withCredentials: true });
        setUsers(response.data);
    };
    useEffect(() => {
        fetchUserData();
    }, [userUri]);

    const JoinedDate = new Date(user.createdDate);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedJoinedDate = JoinedDate.toLocaleString('vn-VN', options);

    const campusNames: { [key: string]: string } = {
        HCM: "Ho Chi Minh",
        DN: "Da Nang",
        CT: "Can Tho",
        HL: "Hoa Lac",
        HN: "Ha Noi",
        QN: "Quy Nhon",
    };

    const campusName = campusNames[user.campus] || user.campus;

    return (
        <div className="post-creator">
            <div className='post-creator-name'>
                <Link to={`/user-profile/${user.userID}`}>
                    <img src={user.avatarUrl} />
                    <div className='post-creator-profile-name'>
                        <p>{user.fullName}</p>
                        <p>@{user.username}</p>
                    </div>
                </Link>
                {currentUser !== user.userID && (
                    <div className='follow-button'>
                        <UserFollowButton followUser={user} />
                    </div>
                )}
            </div>
            <div className="post-creator-bio">
                <p>{user.bio}</p>
                <div className="post-creator-details">
                    <ul className="post-creator-details-inner">
                        <li>
                            <div className="key">
                                Campus
                            </div>
                            <div className="value">
                                {campusName}
                            </div>
                        </li>
                        <li>
                            <div className="key">
                                Term
                            </div>
                            <div className="value">
                                {user.term}
                            </div>
                        </li>
                        <li>
                            <div className="key">
                                Major
                            </div>
                            <div className="value">
                                {user.category}
                            </div>
                        </li>
                        <li>
                            <div className="key">
                                Joined
                            </div>
                            <div className="value">
                                <time dateTime="2019-06-29T09:14:12Z" className="date">{formattedJoinedDate}</time>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PostCreator;
