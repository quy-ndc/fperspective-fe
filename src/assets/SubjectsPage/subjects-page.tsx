import React, { useEffect, useState } from 'react';
import './subjects-page.css';
import SubjectPageHeader from './SubjectPageHead/subject-page-head';
import SubjectList from './SubjectPageMain/subject-list';
import DeletedSubjectsList from './SubjectPageMain/deleted-subject-item-list';
import { loginApi } from '../../config/axios';
import User from '../../model/user';

const SubjectPage: React.FC = () => {

    const [loginUser, setLoginUser] = useState<User>();
    const fetchLoginData = async () => {
        try {
            const response = await loginApi.get("/currentUser", { withCredentials: true });
            setLoginUser(response.data);
        } catch {
            window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/login`;
        }
    };
    useEffect(() => {
        fetchLoginData();
    }, [loginApi]);


    return (
        <div className='subject-page-top'>
            <SubjectPageHeader uri='/show' />
            <SubjectList uri="/show" />
            {loginUser?.role === "ROLE_ADMIN" && (
                <DeletedSubjectsList uri='/show' />
            )}
        </div>
    );
};

export default SubjectPage;
