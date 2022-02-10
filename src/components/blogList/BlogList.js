import React from "react";
import Blog from "../blog/Blog";
import "./BlogList.css";
const BlogList = ({blogs}) => {
    return (
    <section className="BlogList">
      {
        blogs.map((item,ind)=>{
          return <Blog key={ind} item={item} />

        })
      }
    </section>
  );
};

export default BlogList;
