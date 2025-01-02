import { useState } from "react";
import Input from "../components/Input"; // Pastikan path sesuai
import Button from "../components/Button"; // Pastikan path sesuai

function EditUsername() {
  const [newUsername, setNewUsername] = useState("");

  const handleChangeUsername = () => {
    if (!newUsername.trim()) {
      alert("Username tidak boleh kosong!");
      return;
    }
    localStorage.setItem("username", newUsername); // Update username
    alert("Username berhasil diubah!");
    window.location.href = "/"; // Redirect ke halaman utama
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-full max-w-md flex flex-col gap-y-4 items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Edit Username
        </h2>
        <Input
          name="newUsername"
          label="New Username"
          type="text"
          placeholder="Enter new username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <Button onClick={handleChangeUsername}>Update Username</Button>
      </div>
    </div>
  );
}

export default EditUsername;
