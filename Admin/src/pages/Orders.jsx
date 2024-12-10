import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      toast.warn("Authentication token is missing.");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const newStatus = e.target.value;
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Order status updated successfully.");
        await fetchAllOrders(); // Refresh the orders list
      } else {
        toast.error(response.data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update status. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6">Order Page</h3>
      <div>
        {orders.length === 0 ? (
          <p className="text-center text-gray-600">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="order-item grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 sm:gap-6 items-start border border-gray-300 rounded-lg p-4 sm:p-6 bg-white shadow-sm mb-4"
            >
              {/* Order Icon */}
              <img
                className="w-16 h-16 object-contain"
                src={assets.parcel_icon}
                alt="Parcel Icon"
              />

              {/* Order Details */}
              <div className="grid gap-2">
                {/* Order Items */}
                <div>
                  {order.items.map((item, itemIndex) => (
                    <p
                      className="py-1 text-gray-700"
                      key={itemIndex}
                    >
                      {item.name} X {item.quantity}{" "}
                      <span className="italic text-gray-500">{item.size}</span>
                      {itemIndex < order.items.length - 1 && ","}
                    </p>
                  ))}
                </div>
                <hr className="my-2" />
                {/* Address */}
                <p className="mt-2 font-medium text-gray-800">
                  {order.address?.firstName + " " + order.address?.lastName}
                </p>
                <div className="text-gray-600">
                  <p>{order.address?.street + ","}</p>
                  <p>
                    {order.address?.city}, {order.address?.state}, {order.address?.country},{" "}
                    {order.address?.zipcode}
                  </p>
                </div>
                <p className="text-gray-600 mt-1">{order.address?.phone}</p>
                <hr className="my-2" />

                {/* Other Info */}
                <div className="mt-3">
                  <p className="text-sm sm:text-[15px] font-semibold text-gray-800">
                    Items: {order.items.length}
                  </p>
                  <p className="text-gray-700">Method: {order.paymentMethod}</p>
                  <p className={`font-medium ${order.payment ? "text-green-600" : "text-red-600"}`}>
                    Payment: {order.payment ? "Done" : "Pending"}
                  </p>
                  <p className="text-gray-600">
                    Date:{" "}
                    {new Date(order.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Order Amount */}
              <p className="font-semibold text-gray-800 text-lg ">
                {currency}
                {order.amount}
              </p>

              {/* Order Status */}
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status} 
                className="border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-3"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
