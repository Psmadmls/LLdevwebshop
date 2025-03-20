"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/components/store";
import { decrementPoint } from "@/components/features/userSlice";

const Page = () => {
  const dispatch = useDispatch();
  const { username, point, id } = useSelector((state: RootState) => state.user);

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const res = await fetch("http://localhost:3001/ranks");
        if (!res.ok) throw new Error("Failed to fetch item data");
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid data format");
        setItems(data);
      } catch (error) {
        console.error("Error fetching item data:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItemData();
  }, []);

  const openPopup = (item: any) => {
    setSelectedItem(item);
    setQuantity(1);
    setOpen(true);
  };

  const confirmPurchase = async () => {
    if (!selectedItem || quantity < 1) return;
    const userId = id;
    const rankId = selectedItem.id;
    const idrank = selectedItem.rank_id;
    console.log(rankId);
    const res = await fetch("http://localhost:3001/buyrank", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rankId, userId, quantity, idrank }),
      credentials: "include",
    });
    const data = await res.json();
    dispatch(decrementPoint(point - data.newPoint));
    alert(data.message);
    setOpen(false);
  };

  if (!hydrated) return null;

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : items.length > 0 ? (
          items.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-between hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-full aspect-square bg-gray-200 rounded-lg shadow-md overflow-hidden">
                <img
                  src={item.priceture}
                  alt={item.name || "No Image"}
                  onError={(e) => (e.currentTarget.src = "../no-image-available-icon-vector.jpg")}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xl font-semibold text-gray-800 mt-4 mb-2">
                {item.name || "Unknown"}
              </p>
              <p className="text-lg text-gray-600 mb-4">ราคา: {item.price ?? "N/A"}</p>
              <motion.button
                disabled={!username}
                whileTap={{ scale: 0.95 }}
                onClick={() => openPopup(item)}
                className={`px-6 py-2 rounded-md text-lg font-semibold transition-all ${
                  !username
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Buy
              </motion.button>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center">
            <p className="text-xl text-gray-600 mt-4">ไม่มีสินค้า</p>
          </div>
        )}
      </div>
      {open && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <img
              src={selectedItem.priceture}
              alt={selectedItem.name}
              className="w-full h-48 object-contain rounded-md mb-4"
            />
            <h2 className="text-xl font-bold mb-4">ยืนยันการซื้อ</h2>
            <p className="text-lg font-semibold">{selectedItem.name}</p>
            <p className="text-gray-700">ราคา: {selectedItem.price}</p>

              {selectedItem.Optionsquantity === true ? (
                  <div className="flex items-center justify-center mt-4">
                    <button
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      min="1"
                      className="mx-2 border rounded px-2 py-1 w-16 text-center"
                    />
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <p className="text-red-500 mt-4">ไม่สามารถเปลี่ยนจำนวนสินค้าได้</p>
                )}

                <div className="flex justify-center mt-4 gap-4">
                  <button
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={confirmPurchase}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    ยืนยัน
                  </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default Page;
