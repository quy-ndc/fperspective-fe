import React, { useEffect, useState } from "react";
import "./right-side-nav.css";
import TrendingTag from "./Trending/trending";
import WhoToFollow from "./WhoToFollow/who-to-follow";
import { tagApi } from "../../../config/axios";
import Tag from "../../../model/tag";

// const trendingTags = ["React", "JavaScript", "CSS", 'C++'];
// const numberOfPost = [24241, 47723, 5491, 2123];

// const recommendedFullName = ["Alivia Johnson", "Mike Tyson", "Linda Hellgate"];
// const recommendedUserName = ["alivia", "michael", "lind4"];
// const recommendedProfileImage = [
//   "src/images/member-1.png",
//   "src/images/member-2.png",
//   "src/images/member-3.png",
// ];

type RightSideNavProps = {
  tagUri: string;
  userUri: string;
  currentUser: string;
};

const RightSideBar: React.FC<RightSideNavProps> = ({ tagUri, userUri, currentUser }) => {

  const [tags, setTags] = useState<Tag[]>();
  const fetchUserData = async () => {
    const response = await tagApi.get(tagUri, { withCredentials: true });

    setTags(response.data);
  };
  useEffect(() => {
    fetchUserData();
  }, [tagApi]);

  return (
    <div className="right-sidebar">
      <div className="trending-tags">
        <h3>Trending Tags</h3>
        <div className="trending-tags">
          {tags?.map((tag) => {
            const url = "count/" + tag.tagName;
            return (
              <TrendingTag
                tags={tag}
                uri = {url}
              />
            )
          })}
        </div>
      </div>

      <WhoToFollow
        uri = {userUri}
        currentUser = {currentUser}
      />
    </div>
  );
};
export default RightSideBar;
