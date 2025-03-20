"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { login, logout } from "./features/userSlice";

const navItems = [
  { id: "home", label: "หน้าแรก", href: "/" },
  { id: "news", label: "ข่าวสาร", href: "/news" },
  { id: "guide", label: "คู่มือ", href: "/settings" },
  { id: "shop", label: "ร้านค้า", href: "/shop" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { username, point, isLoggedIn } = useSelector((state: RootState) => state.user);

  const isActive = (path: string) => pathname === path;
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [previousPath, setPreviousPath] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");

    if (previousPath === "/Login" && pathname !== "/Login" && token) {
      fetchUserData(token);
    }

    setPreviousPath(pathname);
  }, [pathname]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const res = await fetch(`http://localhost:3001/user/${token}`);
      if (!res.ok) throw new Error("Failed to fetch user data");

      const data = await res.json();
      if (data.status) {
        dispatch(login(data.data));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(logout());
    setShowProfile(false);
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-6 relative">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            MyWebsite
          </Link>
          <button className="md:hidden text-gray-900" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <ul className="hidden md:flex space-x-8 relative">
            {navItems.map((eachItem) => (
              <li key={eachItem.id} className="relative">
                <Link
                  href={eachItem.href}
                  className={`relative px-4 py-2 rounded-md text-gray-700 font-medium transition-all duration-300 ${
                    isActive(eachItem.href) ? "text-blue-500" : "hover:text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {eachItem.label}
                </Link>
                {isActive(eachItem.href) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <AnimatePresence>
            {menuOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center space-y-4 p-4 transition-all duration-300"
              >
                {/* แสดงชื่อและ Point เฉพาะผู้ใช้ที่ล็อกอิน */}
                {isLoggedIn && (
                  <div className="w-full bg-gray-100 p-4 text-center rounded-md flex flex-col items-center">
                    <img src={`https://minotar.net/avatar/${username}/50`} alt="Avatar" className="w-12 h-12 mb-2" />
                    <p className="text-gray-900 font-semibold">{username}</p>
                    <p className="text-gray-600">Point: {point}</p>
                  </div>
                )}
                {navItems.map((eachItem) => (
                  <li key={eachItem.id} className="relative w-full text-center">
                    <Link
                      href={eachItem.href}
                      className={`relative block w-full px-4 py-2 text-gray-700 font-medium transition-all duration-300 ${
                        isActive(eachItem.href) ? "text-blue-500 bg-gray-100" : "hover:text-gray-900 hover:bg-gray-200"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {eachItem.label}
                    </Link>
                    {isActive(eachItem.href) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </li>
                ))}

                {!isLoggedIn ? (
                  <Link
                    href="/Login"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-all block w-full text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition-all block w-full text-center"
                  >
                    Logout
                  </button>
                )}
              </motion.ul>
            )}
          </AnimatePresence>

          <div className="hidden md:block relative">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all"
                >
                  <img src={`https://minotar.net/avatar/${username}/30`} alt="Avatar" className="w-8 h-8" />
                  <span>{username}</span>
                </button>
                <AnimatePresence>
                  {showProfile && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md w-48 py-2"
                    >
                      <div className="px-4 py-2 text-sm">
                        <p>Points: {point}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/Login" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-all">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <div className="mt-20"></div>
    </>
  );
};

export default Navbar;
