import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import Header from '../Header/Header';

const imgAPI = "http://localhost:1337";

const SinglePost = () => {
  const [postData, setPostData] = useState({});
  const { slug } = useParams();
  const [dateString, setDateString] = useState('');
  useEffect(() => {
    fetch(`http://localhost:1337/posts?Slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPostData(data[0]);
        setDateString(new Date(data.published_at));
      });
  }, [slug]);

  const [description, setDescription] = useState("");

  const replaceLineBreak = (search, current) => {
    const substring = new RegExp(search, "gi");
    const result = current.replace(substring, `http://localhost:1337/uploads`);
    return result;
  };

  useEffect(() => {
    if(Object.keys(postData).length){
      const searchTerm = "/uploads";
      setDescription(replaceLineBreak(searchTerm, postData.Description));
    }
  }, [postData]);
  

  return (
    <>
    <Header blackBack={true} />
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1">
              <h2 className="font-weight-normal">{postData?.Title}</h2>
              <ul className="list-inline-dash">
                <li>
                  <a href="#">by Admin</a>
                </li>
                <li>
                  
                  {postData?.categories?.length
                    ? postData.categories.map((item, key) => {
                        if (postData.categories.length - 1 === key) {
                          return `${item.Name}`;
                        } else {
                          return `${item.Name},  `;
                        }
                      })
                    : null}
                </li>
                <li>
                  <a href="#">{dateString ? dateString.toDateString() : ""}</a>
                </li>
              </ul>
            </div>
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
      {/* Featured Image */}
      <div className="container">
        <img src={`${imgAPI}${postData?.Image?.url}`} alt="" />
      </div>
      {/* end container */}
      {/* end Featured Image */}
      {/* Post Content */}
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
      {/* end Post Content */}
    </>
  );
};

export default SinglePost;