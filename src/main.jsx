import React from "react";
import ReactDOM from "react-dom/client";
import Home from "@pages/Home.jsx";
import Layout from "./Layout.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Profile from "@pages/Profile.jsx";
import { Provider } from "react-redux";
import { store } from "@store/store.js";
import Login from "@components/Login/Login.jsx";
import Register from "@components/Register/Register.jsx";
import ProtectedRoute from "@components/ProtectedRoute/ProtectedRoute.jsx";
import Blog from "@pages/Blog.jsx";
import EditBlog from "@pages/EditBlog.jsx";
import NotFound from "@components/NotFound/NotFound.jsx";
import "./index.scss";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/me" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="/blog/:id" element={<Blog />} />
      <Route
        path="/edit-blog/:blogId"
        element={<ProtectedRoute element={<EditBlog />} />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound text="Page Not Found" />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
