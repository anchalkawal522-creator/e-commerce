"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./profile.css";

type User = {
  name: string;
  email: string;
  phone: string;
  image: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      router.replace("/auth/login");
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    router.replace("/auth/login");
  };

  if (loading) {
    return <p className="loading">Checking user...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">My Profile</h1>

        {user ? (
          <>
            <div className="profile-image-wrapper">
              <img
                src={user.image || "/images/profile.jpg"}
                alt="profile"
                className="profile-image"
              />
            </div>

            <div className="profile-info">
              <p className="profile-field">
                <strong>Name:</strong> {user.email}
              </p>

              <p className="profile-field">
                <strong>Email:</strong> {user.email}
              </p>

              <p className="profile-field">
                <strong>Phone:</strong> {user.email}
              </p>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <p className="no-user">No user found</p>
        )}
      </div>
    </div>
  );
}