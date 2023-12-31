import React, { useEffect, useState } from 'react';
import './blog-tags.css';
import Tag from '../../../../model/tag';
import { tagApi } from '../../../../config/axios';
import { Link } from 'react-router-dom';

type BlogTagsProps = {
  uri: string
}

const BlogTags: React.FC<BlogTagsProps> = ({ uri }) => {

  const btag: Tag = {
    tagId: "",
    tagName: "",
    status: false
  }

  const [tags, setTags] = useState<Tag>(btag);
  const fetchTagData = async () => {
    const response = await tagApi.get(uri, { withCredentials: true });
    setTags(response.data);
  };
  useEffect(() => {
    fetchTagData();
  }, [uri]);

  if (tags.status === true) {
    return (
      <>
        <Link
          to={`/tag/${tags.tagName}`}
          key={tags.tagId}
          className="home-page-tag"
        >
          #{tags.tagName}
        </Link>
      </>
    );
  }
};

export default BlogTags;
