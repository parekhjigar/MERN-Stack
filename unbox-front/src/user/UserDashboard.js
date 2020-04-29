import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const Dashboard = () => {

    const {user: {_id, name, email, role}} = isAuthenticated()

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">
                            My Cart
                        </Link>
                    </li>
                    <li className="list-group-item">
                    <Link className="nav-link" to="/profile/update">
                        Update Profile
                    </Link>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Layout title="Dashboard" description="User Dashboard" className="container">
            <div className="card mb-5">
                <h3 className="card-header">User Details</h3>
                <ul className="list-group">
                    <li className="list-group-item">Name: {name}</li>
                    <li className="list-group-item">Email: {email}</li>
                    <li className="list-group-item">Role: {role === 1 ? "Admin" : "Registered User"}</li>
                </ul>
            </div>
            
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">History</li>
                </ul>
            </div>
        </Layout>
    );
};

export default Dashboard;