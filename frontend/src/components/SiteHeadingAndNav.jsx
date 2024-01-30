import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return <header>
    <div id='nav-line'>
      <hr className='nav-hr'></hr>
      <div id='nav-circle-div'>
        <div id='nav-circle'></div>
      </div>
      <hr className='nav-hr'></hr>
    </div>
    <div id='nav-links-div'>
      <div className='nav-links'>
        <ul>
          <li>Link</li>
          <li>Link</li>
          <li>Link</li>
          <li>Link</li>
        </ul>
      </div>
      <div className='nav-links'>
      <ul>
          <li>Link</li>
          <li>Link</li>
          <li>Link</li>
          <li>Link</li>
        </ul>
      </div>
    </div>
  </header>

  // return <header>
  //   <a id='logo' href='/'>React/Express Auth</a>
  //   <nav>
  //     <ul>
  //       <li><NavLink to='/'>Home</NavLink></li>
  //       <li><NavLink to='/users' end={true}>Users</NavLink></li>
  //       {
  //         currentUser
  //           ? <li><NavLink to={`/users/${currentUser.id}`}>{currentUser.username}</NavLink></li>
  //           : <>
  //             <li><NavLink to='/login'>Login</NavLink></li>
  //             <li><NavLink to='/sign-up'>Sign Up</NavLink></li>
  //           </>
  //       }
  //     </ul>
  //   </nav>
  //   <hr className='hr'></hr>
  // </header>;
}
