"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/components/store";

const ProfilePage = () => {
  // ดึงข้อมูลจาก Redux store
  const { username, realname, point, id} = useSelector((state: RootState) => state.user);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">โปรไฟล์ของฉัน</h1>
      <p><strong>ชื่อผู้ใช้:</strong> {username}</p>
      <p><strong>ชื่อจริง:</strong> {realname}</p>
      <p><strong>แต้มสะสม:</strong> {point}</p>
      <p><strong>รหัส ID:</strong> {id}</p>
    </div>
  );
};

export default ProfilePage;
