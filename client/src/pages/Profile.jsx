import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  console.log("currentUser");
  console.log(currentUser);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setupdateSuccess] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      console.log(currentUser._id);
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      //navigate("/");
      console.log(data);
      setupdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          referrerPolicy="no-referrer"
          className="self-center mt-2 rounded-full h-24 w-24 object-contain cursor-no-drop"
        />

        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="username"
          className="border p-3 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="email"
          className="border p-3 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg "
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading" : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      <p className="text-green-700 mt-5">
        {" "}
        {updateSuccess ? "User is updated successfully" : ""}
      </p>
    </div>
  );
}
