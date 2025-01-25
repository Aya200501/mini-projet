import React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Layout from "./components/Layout"
import Login from "./components/Login"
import CreateAccount from "./components/CreateAccount"
import Home from "./components/Home"
import Profile from "./components/Profile"
import ChangeColor from "./components/ChangeColor"
import UserList from "./components/UserList"
import AddUser from "./components/AddUser"
import UserRequests from "./components/UserRequests"
import AdminRequests from "./components/AdminRequests"
import UserDetails from "./components/UserDetails"
import EditUser from "./components/EditUser"

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.id)
  return user ? children : <Navigate to="/login" />
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-color" element={<ChangeColor />} />
          <Route path="users" element={<UserList />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="requests" element={<UserRequests />} />
          <Route path="admin-requests" element={<AdminRequests />} />
          <Route path="user/:id" element={<UserDetails />} />
          <Route path="edit-user/:id" element={<EditUser />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App