import axios from "axios";
import "./Post.css";
// import { Link } from "react-router-dom";
import baseurl from "../Api";
import { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';


const Post = () => {

  var [users, setUsers] = useState([]);
  const constantDate = new Date();
  const formattedDate = constantDate.toDateString();

  useEffect(() => {
    axios.get(baseurl + '/write/writesview')
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {users.map((value, index) => (
        <Card
          key={index}
          hoverable
          style={{ width: 240, margin: '16px' }}>
          <img
            className="postImg"
            src={`data:image/jpeg;base64,${Buffer.from(value.image.data).toString('base64')}`}
            width="50" height="50"
            alt="Error"
          />
          <div className="postInfo">
            <div className="postCats">
              <span className="postCat">
                
              </span>
              <span className="postCat">
               
              </span>
            </div>

            {/* <Link to={`/post/${post._id}`} className="link"> */}
            <span className="postTitle">{value.title}</span>
            {/* </Link> */}

            <hr />
            <span className="postDate">{formattedDate}</span>
          </div>
          <p className="postDesc">{value.desc}</p>
        </Card>
      ))}
    </div>
  );
}

export default Post;
