import React from 'react';
import './subjects-page.css';
import SubjectPageHeader from './SubjectPageHead/subject-page-head';
import SubjectList from './SubjectPageMain/subject-list';

const SubjectPage: React.FC = () => {

    return (
        <div className='subject-page-top'>
            <SubjectPageHeader NumberOfSubject={12} />
            <SubjectList uri="/show" />
        </div>
    );
};

export default SubjectPage;
