import { Link } from "react-router-dom";
import { useLogout } from "hooks/useLogout";

import DropdownNavMenu from "components/DropdownNavMenu";
import {Fragment} from "react";

export default function Nav({ user, admin }) {
  const { logout } = useLogout();

  const handleClickLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-gray-100 text-gray-700 p-4 flex justify-between shadow-xl">
      <div className="text-2xl font-thin">
        {user ? (
          <div className="flex space-x-2">
            <img src={user.avatar} alt={user.username} />
            <span>Hello {user.name}</span>
          </div>
        ) : (
          <Link to="/">
            <h1>Larsen&Co</h1>
          </Link>
        )}
      </div>
      <div>
          {user ? (
            <Fragment>
              {/* PHONE MENU */}
              <DropdownNavMenu admin={admin} user={user} handleClickLogout={handleClickLogout}/>
              {/* MENU */}
              <div className='hidden md:block'>
                <div className="space-x-4">
                  {admin &&
                    <Link className="btn btn-yellow" to="/admin">
                      Admin
                    </Link>}
                  <Link className="btn btn-yellow" to={`/salesman/${user.id}`}>
                    Reports
                  </Link>
                  <button className="btn btn-yellow" onClick={handleClickLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </Fragment>
        ) : (
          <div className="space-x-4">
            {/* REGISTER LOGIN */}
            <Link to="/register">
              <button className="btn btn-yellow">
                <span>Register</span>
              </button>
            </Link>
            <Link to="/login">
              <button className="btn btn-yellow">
                <span>Login</span>
              </button>
            </Link>
          </div>
          )}
      </div>
    </nav>
  );
}
