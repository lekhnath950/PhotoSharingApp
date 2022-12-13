import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { Home, HomeOutlined, ExploreRounded, ExploreOutlined , Add, AddCircleOutline, AccountCircle, AccountCircleOutlined} from "@mui/icons-material"


export default function Header() {

  const [tab, setTab] = useState(window.location.pathname);

  return (
    <div className="header">
      <div className='appname'>
        <Link to="/">PhotoSharingApp</Link>
      </div>


      <div className='navbuttons'>
        <Link to="/" onClick={() => setTab("/")} >
          {tab === "/" ? <Home className='navicons' /> : <HomeOutlined  />}
        </Link>

        <Link to="/newpost" onClick={() => setTab("/newpost")} >
          {tab === "/newpost" ? <AddCircleOutline className='navicons' /> : <Add  />}
        </Link>

        <Link to="/explore" onClick={() => setTab("/explore")}>
          {tab === "/explore" ? <ExploreRounded className='navicons' /> : <ExploreOutlined style={{ color: "black" }} />}
        </Link>

        <Link to="/account" onClick={() => setTab("/account")}>
          {tab === "/account" ? <AccountCircle className='navicons' /> : <AccountCircleOutlined  />}
        </Link>
      </div>



    </div>
  )
}

