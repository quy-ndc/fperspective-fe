import React from "react";
import "./user-item.css";
import User from "../../../model/user";
import { Link } from "react-router-dom";
import { userApi } from "../../../config/axios";

type BlogPostProps = {
    user: User;
};

const UserItem: React.FC<BlogPostProps> = ({ user }) => {

    const JoinedDate = new Date(user.createdDate);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: '2-digit' };
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

    const handleDelete = () => {
        userApi
            .delete(`/delete/${user.userID}`, { withCredentials: true })
            .then((response) => {
                window.location.reload();
                console.log("User deleted:", response.data);
            })
            .catch((error) => {
                console.error("Error deleting user: ", error);
            });
    };

    return (
        <>
            <div className="user-item">
                <div className='user-item-name'>
                    <Link to={`/user-profile/${user.userID}`}>
                        <img src={user.avatarUrl} />
                        <div className='user-item-profile-name'>
                            <p>{user.fullName}</p>
                            <p>@{user.username}</p>
                        </div>
                    </Link>
                    <div className='user-item-delete-button'>
                        <button onClick={handleDelete}>Disable</button>
                    </div>
                </div>
                <div className="user-item-bio">
                    <p>{user.bio}</p>
                    <div className="user-item-details">
                        <ul className="user-item-details-inner">
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
                                    {formattedJoinedDate}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );

};

export default UserItem;
