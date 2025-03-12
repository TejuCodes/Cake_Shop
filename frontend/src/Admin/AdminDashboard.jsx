import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [profit, setProfit] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const admin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    if (!admin || admin.role !== "admin") {
      navigate("/adminlogin");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch Orders
        const ordersResponse = await fetch("http://localhost/cake_shop/fetch_all_orders.php");
        if (!ordersResponse.ok) throw new Error("Failed to fetch orders");
        const ordersData = await ordersResponse.json();
        if (ordersData.success) {
          setOrders(ordersData.orders);
          setProfit(
            ordersData.orders.reduce((sum, order) => sum + order.cake_price * order.cake_quan, 0)
          );
        }

        // Fetch Feedback
        const feedbackResponse = await fetch("http://localhost/cake_shop/get_feedback.php");
        if (!feedbackResponse.ok) throw new Error("Failed to fetch feedback");
        const feedbackData = await feedbackResponse.json();
        setFeedback(feedbackData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [admin, navigate]);

  const handleUpdateDeliveryStatus = async (orderId, status) => {
    try {
      const response = await fetch("http://localhost/cake_shop/update_delivery_status.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, status }),
      });
  
      const data = await response.json();
      console.log("Response from backend:", data); // Log response
  
      if (!data.success) {
        throw new Error(data.error || "Failed to update status");
      }
  
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, delivery_status: status } : order
        )
      );
    } catch (error) {
      console.error("Error updating delivery status:", error);
      alert("Error updating delivery status: " + error.message);
    }
  };
  

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <section className="profit-section">
        <h3>Total Amount: ₹{profit}</h3>
      </section>

      <section className="feedback-section">
        <h3>Customer Feedback</h3>
        <ul>
          {feedback.map((fb) => (
            <li key={fb.id}><strong>{fb.name}</strong>: {fb.message}</li>
          ))}
        </ul>
      </section>

      <section className="orders-section">
        <h3>Orders</h3>
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              {/* <img src={order.cake_url} alt={order.cake_name} className="order-img" /> */}
              <div className="order-details">
                <h4>{order.cake_name}</h4>
                <p>Quantity: {order.cake_quan} kg</p>
                <p>Total Price: ₹{order.cake_price}</p>
                <p>Address: {order.address}</p>
                <p>User Email: {order.useremail}</p>
                <p>Status: {order.delivery_status}</p>
                <button onClick={() => handleUpdateDeliveryStatus(order.id, "Delivered")} className="delivered-btn">Mark as Delivered</button>
                <button onClick={() => handleUpdateDeliveryStatus(order.id, "Not Delivered")} className="not-delivered-btn">Mark as Not Delivered</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;