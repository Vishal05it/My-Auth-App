import React, { useState } from "react";
import { baseURL } from "../../baseURL";
import { successEmitter, errorEmitter } from "../../emitter";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../Contexts/LoaderContext";
function Signup() {
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    age: 0,
    bio: "",
    profilepic: "",
  });
  let onChangeFunc = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  let { setShowLoader } = useLoader();
  const navigate = useNavigate();
  let signUpFunc = async () => {
    try {
      setShowLoader(true);
      let response = await fetch(`${baseURL}/user/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let data = await response.json();
      if (data.success) {
        successEmitter(data.message);
        navigate("/login");
      } else errorEmitter(data.message);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoader(false);
    }
  };
  return (
    <>
      <section className="p-6 dark:bg-gray-800 dark:text-gray-100">
        <form
          noValidate=""
          action=""
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-800">
            <div
              className="space-y-2 col-span-full lg:col-span-1"
              bis_skin_checked="1"
            >
              <p className="font-medium">Personal Inormation</p>
              <p className="text-xs">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Adipisci fuga autem eum!
              </p>
            </div>
            <div
              className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3"
              bis_skin_checked="1"
            >
              <div className="col-span-full sm:col-span-3" bis_skin_checked="1">
                <label htmlFor="firstname" className="text-sm">
                  Name
                </label>
                <br />
                <input
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={(e) => {
                    onChangeFunc(e);
                  }}
                  type="text"
                  placeholder="Your Name..."
                  className="w-100 dark:bg-gray-100 p-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-800 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3" bis_skin_checked="1">
                <label htmlFor="lastname" className="text-sm">
                  Password
                </label>
                <br />
                <input
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={(e) => {
                    onChangeFunc(e);
                  }}
                  type="password"
                  placeholder="Create Password..."
                  className="w-100 dark:bg-gray-100 p-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-800 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3" bis_skin_checked="1">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <br />
                <input
                  id="email"
                  value={user.email}
                  onChange={(e) => {
                    onChangeFunc(e);
                  }}
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-100 dark:bg-gray-100 p-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-800 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>

              <div className="col-span-full sm:col-span-2" bis_skin_checked="1">
                <label htmlFor="city" className="text-sm">
                  City
                </label>
                <br />
                <input
                  id="city"
                  name="city"
                  placeholder="City..."
                  value={user.city}
                  onChange={(e) => {
                    onChangeFunc(e);
                  }}
                  type="text"
                  className="w-50 dark:bg-gray-100 p-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-800 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-2" bis_skin_checked="1">
                <label htmlFor="state" className="text-sm">
                  Age
                </label>
                <br />
                <input
                  id="age"
                  value={user.age}
                  onChange={(e) => {
                    onChangeFunc(e);
                  }}
                  type="number"
                  name="age"
                  placeholder=""
                  className="w-80 dark:bg-gray-100 p-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-800 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-800">
            <div
              className="space-y-2 col-span-full lg:col-span-1"
              bis_skin_checked="1"
            >
              <p className="font-medium">Profile</p>
              <p className="text-xs">Adipisci fuga autem eum!</p>
            </div>
            <div
              className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3"
              bis_skin_checked="1"
            >
              <div className="col-span-full sm:col-span-3" bis_skin_checked="1">
                <label htmlFor="username" className="text-sm">
                  Bio
                </label>
                <br />
                <textarea
                  id="bio"
                  name="bio"
                  value={user.bio}
                  onChange={(e) => {
                    onChangeFunc(e);
                  }}
                  type="text"
                  placeholder="Bio..."
                  className="w-100 dark:bg-gray-100 p-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-800 focus:dark:ring-violet-600 dark:border-gray-300"
                ></textarea>
              </div>
              <div className="col-span-full sm:col-span-3" bis_skin_checked="1">
                <label htmlFor="website" className="text-sm">
                  Image URL
                </label>
                <br />
                <input
                  id="profilepic"
                  name="profilepic"
                  value={user.profilepic}
                  onChange={(e) => {
                    onChangeFunc(e);
                  }}
                  type="text"
                  placeholder="https://"
                  className="w-100 dark:bg-gray-100 p-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-800 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>

              <div className="col-span-full" bis_skin_checked="1">
                <label htmlFor="bio" className="text-sm">
                  Photo
                </label>
                <br />
                <div
                  className="flex items-center space-x-2"
                  bis_skin_checked="1"
                >
                  <img
                    src={user.profilepic}
                    alt=""
                    className="w-50 h50 rounded-4xl dark:bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={async (e) => {
                      e.preventDefault();
                      await signUpFunc();
                    }}
                    className="px-4 py-2 border rounded-md dark:bg-violet-600 dark:border-gray-800"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </>
  );
}

export default Signup;
