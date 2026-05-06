"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useWishlist } from "../Context/wishlistContext";
import "./profile.css";
import { cart, useCart } from "../Context/cartContext"

type User = {
  name: string;
  email: string;
  phone: string;
  image: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const { cart } = useCart();

  const router = useRouter();
  const { wishlist, removeFromWishlist } = useWishlist();

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


  const handleChange = (e: any) => {
    if (!user) return;
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({ ...user, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };


  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEditMode(false);
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
            {/* IMAGE */}
            <div className="profile-image-wrapper">
              <img
                src={user.image || "/images/profile.jpg"}
                alt="profile"
                className="profile-image"
              />

              {editMode && (
                <input type="file" onChange={handleImage} />
              )}
            </div>

            {/* INFO */}
            <div className="profile-info">
              {editMode ? (
                <>
                  <input
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Name"
                  />

                  <input
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />

                  <input
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                  />
                </>
              ) : (
                <>
                  <p className="profile-field">
                    <strong>Name:</strong> {user.name}
                  </p>

                  <p className="profile-field">
                    <strong>Email:</strong> {user.email}
                  </p>

                  <p className="profile-field">
                    <strong>Phone:</strong> {user.phone}
                  </p>
                </>
              )}
            </div>

            {/* BUTTONS */}
            {editMode ? (
              <button className="logout-btn" onClick={handleSave}>
                Save
              </button>
            ) : (
              <button
                className="logout-btn"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            )}

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <p className="no-user">No user found</p>
        )}
      </div>

      
      <div style={{ marginTop: "30px" }}>
        <h2 style={{fontSize:25 , fontWeight:600}}>My Wishlist</h2>

        {wishlist.length === 0 ? (
          <p>No items in wishlist</p>
        ) : (
          <div className="items"
            style={{
              display: "flex",
              
              gap: "20px",
              marginTop: "15px"
            }}
            
          >
            {wishlist.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "10px",
                  textAlign: "center"
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover"
                  }}
                />

        <h4 style={{ fontSize: "26px", fontWeight:600 ,color: "green"  }}>{item.title}</h4>
        <p>${item.price}</p>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  style={{
                    marginTop: "8px",
                    padding: "5px 10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

<h2  style={{fontSize:25 , fontWeight:600}}>My Cart</h2>

{cart.length === 0 ? (
  <p>No items in cart</p>
) : (
  <div
    style={{
      display: "flex",
      gap: "15px",
      marginTop: "20px"
    }}
  >
    {cart.map((item: any) => (
      <div
        key={item.id}
        style={{
          border: "1px solid #eee",
          padding: "10px",
          borderRadius: "8px",
          textAlign: "center"
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          style={{ width: "100%", height: "185px", objectFit: "cover" }}
        />
        <h4 style={{ fontSize: "26px", fontWeight:600 ,color: "green"  }}>{item.title}</h4>
        <p>${item.price}</p>
      </div>
    ))}
  </div>
)}
    </div>
  );
}