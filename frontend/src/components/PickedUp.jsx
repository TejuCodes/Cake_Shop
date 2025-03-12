import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const PickedUp = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost/cake_shop/fetch_orders.php?useremail=${user.email}`
        );
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        } else {
          setError(data.message || "No orders found");
        }
      } catch (error) {
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch("http://localhost/cake_shop/delete_order.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id: orderId }),
      });
      const data = await response.json();
      if (data.success) {
        setOrders(orders.filter((order) => order.id !== orderId));
      } else {
        alert("Failed to delete order: " + data.error);
      }
    } catch (error) {
      alert("Failed to delete order. Please try again.");
    }
  };

  const handleUpdateDeliveryStatus = async (orderId, status) => {
    try {
      const response = await fetch("http://localhost/cake_shop/update_delivery_status.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id: orderId, status }),
      });
      const data = await response.json();
      if (data.success) {
        setOrders(orders.map((order) =>
          order.id === orderId ? { ...order, delivery_status: status } : order
        ));
      } else {
        alert("Failed to update delivery status: " + data.error);
      }
    } catch (error) {
      alert("Failed to update delivery status. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="pickedup-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <img src={order.cake_url} style={{ width: "100%", height: "100px" }} alt={order.cake_name} className="order-img" />
              <div className="order-details">
                <h3>{order.cake_name}</h3>
                <p>Quantity: {order.cake_quan} kg</p>
                <p>Total Price: ₹{order.cake_price}</p>
                <p>Address: {order.address}</p>
                <p>Delivery Status: {order.delivery_status}</p>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  Cancel Order
                </button>
                {user.role === "admin" && (
                  <div>
                    <button
                      className="status-btn"
                      onClick={() => handleUpdateDeliveryStatus(order.id, "Delivered")}
                    >
                      Mark as Delivered
                    </button>
                    <button
                      className="status-btn"
                      onClick={() => handleUpdateDeliveryStatus(order.id, "Not Delivered")}
                    >
                      Mark as Not Delivered
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PickedUp;