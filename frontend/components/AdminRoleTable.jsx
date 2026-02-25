import { useState, useEffect } from "react";
import API from "../api/axios";

const AdminRoleTable = ({ role, loggedInUser}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    const [viewUser, setViewUser] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);

    const token = localStorage.getItem("token");

    const fetchData = async () => {
        try{
            setLoading(true);
            const res = await API.get(`/users?role=${role}&page=${page}&limit=${limit}&search=${search}`,
                {
                    headers: { Authorization: `Bearer ${token}`}
                }
            );
            setData(res.data.users);
            setTotalPages(res.data.totalPages);
        }
        catch (err)
        {
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();   
    }, [page, search]);

    const handleDelete = async () => {
        try{
            await API.delete(`/users/${deleteUser._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDeleteUser(null);
            fetchData();
        }
        catch (err)
        {
            console.log(err);
        }
    };

    const handleUpdate = async () => {
        try{
            await API.put(`/users/${editUser._id}`,
                editUser,
                {
                    headers: { Authorization: `Bearer ${token}`}
                }
            );
            setEditUser(null);
            fetchData();
        }
        catch (err)
        {
            console.log(err);
        }
    };

    return (
        <div className = "bg-white p-5 rounded-xl shadow mb-10">
            <h2 className = "text-xl font-bold mb-4">{role} Table</h2>

            <input type = "text" placeholder = "Search Name or Email" className = "border p-2 mb-4 full rounded" value = {search}
            onChange = {(e) => setSearch(e.target.value)} />

            {loading ? (
                <div className = "text-center py-10"> Loading....</div>
            ) : (
                <>
                <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">First Name</th>
                        <th className="border p-2">Last Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Actions</th>
                      </tr>
                    </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key = {user._id} className = {`text-center ${
                            loggedInUser === user._id
                            ? "bg-yellow-100font-semibold"
                            : ""
                        }`}>
                            <td className = "border p-2">{user._id}</td>
                            <td className = "border p-2">{user.fname}</td>
                            <td className = "border p-2">{user.lname}</td>
                            <td className = "border p-2">{user.email}</td>
                            <td className = "border p-2 space-x-2">
                                <button className = "bg-blue-500 text-white px-2 py-1 rounded" onClick = {() => setViewUser(user)}>
                                    👁 View
                                </button>
                                <button className = "bg-green-500 text-white px-2 py-1 rounded" onClick = {() => setEditUser(user)}>
                                    ✏️ Edit
                                </button>
                                <button className = "bg-red-500 tex-white px-2 py-1 rounded" onClick = {() => setDeleteUser(user)}>
                                    ␡ Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>

                {/* Pagination */}

                <div className = "flex justify-center mt-4 space-x-2">
                    <button disabled = {page === 1} onClick = {() => setPage(page -1)} className = "px-3 py-1 bg-gray-200 rounded">
                        Prev
                    </button>
                    <span>Page {page}</span>
                    <button disabled = {page === totalPages} onClick = {() => setPage(page + 1)} className = "px-3 py-1 bg-gray-200 rounded">
                        Next
                    </button>
                </div>
                </>
            )}
            {/* View Modal */}

            {viewUser && (
                <Modal onClose = {() => setViewUser(null)}>
                    <h3 className = "text-lg font-bold mb-2">User Details</h3>
                    <p><b>First Name: </b>{viewUser.fname}</p>
                    <p><b>Last Name: </b>{viewUser.lname}</p>
                    <p><b>Email: </b>{viewUser.email}</p>
                    <p><b>Role: </b>{viewUser.role}</p>
                </Modal>
            )}

            {/* Edit Modal */}

            {editUser && (
                <Modal onClose = {() => setEditUser(null)}>
                    <h3 className = "text-lg font-bold mb-2">Edit User</h3>
                    <input className = "border p-2 w-full mb-2" value = {editUser.fname} onChange = {(e) => setEditUser({...editUser, fname: e.target.value})} /> <br></br>
                    <input className = "border p-2 w-full mb-2" value = {editUser.lname} onChange = {(e) => setEditUser({...editUser, lname: e.target.value})} /> <br></br>
                    <input className = "border p-2 2-full mb-2" value = {editUser.email} onChange = {(e) => setEditUser({...editUser, email: e.target.value})} /> <br></br>
                    <button className = "bg-green-500 text-white px-4 py-2 rounded" onClick = {handleUpdate}>Update</button>
                </Modal>
            )}

            {/* Delete User */}

            {deleteUser && (
                <Modal onClose = {() => setDeleteUser(null)}>
                    <h3 className = "text-lg font-bold mb-2 text-red-600">Confirm Delete?</h3>
                    <p>Are You Sure You Wanna Delete {deleteUser.role} {deleteUser.fname}?</p>
                    <button className = "bg-red-500 text-white px-4 py-2 rounded mt-4" onClick = {handleDelete}>Delete</button>
                </Modal>
            )}
        </div>
    );
}

export default AdminRoleTable;

{/* Simple Modal */}

const Modal = ({ children, onClose}) => (
    <div className = "fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
        <div className = "bg-white p-6 rounded-lg w-96 relative">
            <button className = "absolute top-2 right-3 text-red-500" onClick = {onClose}>
                x
            </button>
            {children}
        </div>
    </div>
);