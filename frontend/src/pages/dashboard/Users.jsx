import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserStore } from "../../context/UserContext";
import { getUsers, updateUserRole } from "../../services/user.service";
import ConfirmModal from "../../components/ui/ConfirmModal";

const ROLES = ["admin", "manager", "staff"];

const roleBadge = {
  admin: "bg-purple-100 text-purple-700",
  manager: "bg-blue-100 text-blue-700",
  staff: "bg-gray-100 text-gray-700",
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingChange, setPendingChange] = useState(null);

  const { user: currentUser } = useContext(UserStore);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await getUsers();
        setUsers(res.users);
      } catch (error) {
        toast.error(error.response?.data?.message || "Users couldn't load");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  async function handleConfirm() {
    const { target, role } = pendingChange;
    setPendingChange(null);

    try {
      const res = await updateUserRole(target._id, role);

      setUsers((current) =>
        current.map((user) => (user._id === target._id ? res.user : user)),
      );

      toast.success(res.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change role");
    }
  }

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Users</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage who can do what. New signups start as Staff.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Joined</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              const isYou = user._id === currentUser?._id;

              return (
                <tr
                  key={user._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {user.name}
                    {isYou && (
                      <span className="ml-2 text-xs text-gray-500">(You)</span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-gray-600">{user.email}</td>

                  <td className="px-6 py-4">
                    {isYou ? (
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${roleBadge[user.role]}`}
                      >
                        {user.role}
                      </span>
                    ) : (
                      <select
                        value={user.role}
                        onChange={(e) =>
                          setPendingChange({
                            target: user,
                            role: e.target.value,
                          })
                        }
                        className="rounded-lg border border-gray-300 px-3 py-1.5 capitalize outline-none focus:border-green-700"
                      >
                        {ROLES.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={Boolean(pendingChange)}
        title="Change Role"
        message={`Change ${pendingChange?.target.name}'s role from ${pendingChange?.target.role} to ${pendingChange?.role}?`}
        onConfirm={handleConfirm}
        onCancel={() => setPendingChange(null)}
        confirmText="Change Role"
      />
    </div>
  );
}
