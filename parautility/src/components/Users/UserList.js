import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const User = (props) => (
    <tr>
        <td>{props.user.fname}</td>
        <td>{props.user.lname}</td>
        <td>{props.user.email}</td>
        <td>{props.user.phone}</td>
        <td>{props.user.role}</td>
        <td>{props.user.token}</td>
        <td>{props.user.salt}</td>
        <td>{props.user.pw_hash}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.user._id}`}>Edit</Link> |
            <button className="btn btn-link"
                    onClick={() => {
                        props.deleteUser(props.user._id);
                        console.log(props.user._id)
                    }}
            >
                Delete
            </button>
        </td>
    </tr>
);

export default function UserList() {
    const [users, setUsers] = useState([]);

    // This method fetches the users from the database.
    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`http://localhost:5000/user/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const users = await response.json();
            console.log(users)
            setUsers(users);
        }

        getUsers();

        return;
    }, [users.length]);

    // This method will delete a user
    async function deleteUser(id) {
        await fetch(`http://localhost:5000/user/${id}`, {
            method: "DELETE"
        });

        const newUsers = users.filter((el) => el._id !== id);
        console.log(newUsers)
        setUsers(newUsers);
    }

    // This method will map out the users on the table
    function userList() {
        return users.map((user) => {
            return (
                <User
                    user={user}
                    deleteUser={() => deleteUser(user._id)}
                    key={user._id}
                />
            );
        });
    }

    // This following section will display the table with the users of individuals.
    return (
        <div>
            <h3>User List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Token</th>
                    <th>Salt</th>
                    <th>Hash</th>
                </tr>
                </thead>
                <tbody>{userList()}</tbody>
            </table>
        </div>
    );
}