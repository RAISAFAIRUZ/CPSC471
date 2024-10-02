import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import React, { useEffect, useState } from "react";
import { Heart, Person, User, House, Gear } from "phosphor-react";

export default function Navbar({ search, handleSearchChange, loggedIn }) {
  const [user, setUser] = useState("null");
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const handleSignOut = () => {
    localStorage.setItem("user", "null"); // replace this with cookie deletion
    window.location.reload();
  }

  return (
    <>
      <div className="absolute w-full h-auto">
        <div className="
            navbar flex flex-row w-full h-12 p-4 backdrop-blur-md bg-zinc-900
            border-zinc-800 border-b-2
          ">
          <div className="navbar-start">
            <input
              className="
                  rounded-md px-2
                  bg-zinc-700 text-zinc-100 placeholder:text-zinc-400
                  outline-zinc-600 outline outline-2 outline-offset-4
              "
              placeholder="Search for a movie"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="navbar-end w-auto">
            {user !== "null" ?
              <>
                <div className="flex flex-row pr-8 space-x-4 items-center">
                  {user ?
                    <Button
                      className={"flex flex-row items-center font-semibold max-h-[2.5rem] w-48 overflow-scroll text-center justify-center"}
                      onClick={() => {
                        let newUser = user;
                        newUser.admin = !newUser.admin;
                        setUser(newUser);
                        localStorage.setItem("user", JSON.stringify(user));
                        window.location.reload();
                      }}
                    >
                      {user.admin ?
                        "View as regular user"
                        :
                        "View as admin user"
                      }
                    </Button>
                    :
                    null
                  }
                  {user && user.admin === true ?
                    <Link to="/admin">
                      <Button className={"flex flex-row items-center font-semibold"}>
                        <Gear className="mx-2 w-6 h-6" />
                        Admin
                      </Button>
                    </Link>
                    :
                    <></>
                  }
                  <Link to="/">
                    <Button className={"flex flex-row items-center font-semibold max-h-[2.5rem] w-auto"}>
                      <House className="mx-2 w-6 h-6" />
                      Home
                    </Button>
                  </Link>
                  {user ?
                    <>
                      <Link to="/watchlist">
                        <Button className={"flex flex-row items-center font-semibold max-h-[2.5rem] w-auto"}>
                          <Heart className="mx-2 w-6 h-6" />
                          Watchlist
                        </Button>
                      </Link>

                      <Link to="/profile">
                        <Button className={"flex flex-row items-center font-semibold max-h-[2.5rem] w-auto"}>
                          <User className="mx-2 w-6 h-6" />
                          My Profile
                        </Button>
                      </Link>
                    </>
                    :
                    null
                  }
                  {user ?
                    <button className={"text-zinc-400 hover:underline"}
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                    :
                    <Link className={"text-zinc-400 hover:underline"} to={"/authorization?sign-up=true"}>
                      Don't have an account? Click here to sign up.
                    </Link>
                  }
                </div>
              </>
              :
              <>
                <div className="flex flex-row space-x-2">
                  <div className="flex flex-row pr-8 space-x-4">
                    {/* Replace these buttons when the user is signed in */}
                    <Button>
                      <Link
                        to="/authorization?sign-up=true"
                      >
                        Create Account
                      </Link>
                    </Button>
                    <button className="text-zinc-400 hover:underline">
                      <Link
                        to="/authorization?sign-up=false"
                      >
                        Or Log In
                      </Link>
                    </button>
                  </div>
                </div>
              </>
            }
            <span className="font-bold uppercase text-xl max-h-[4rem] overflow-scroll">
              Vintage Movie Store
            </span>
          </div>
        </div>
      </div>
    </>
  );
}