import React from 'react';
import Link from 'next/link'; // ✅ ใช้ next/link แทน react-router-dom

const Shop = () => {
  const categories = [
    { id: 1, name: 'ยศ', image: '/images/rank.png', href: "/shop/test" },
    { id: 2, name: 'หินป้องกัน', image: '/images/protection-stone.png', href: "/protection-stone" },
    { id: 3, name: 'กุญแจ', image: '/images/key.png', href: "/key" },
    { id: 4, name: 'พอยท์', image: '/images/points.png', href: "/points" },
    { id: 5, name: 'ทั่วไป', image: '/images/general.png', href: "/general" },
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-white min-h-screen">
      {/* หัวข้อใหญ่ */}
      <h1 className="text-4xl font-extrabold text-black mb-4">
        เลือกหมวดหมู่ที่คุณต้องการ
      </h1>
      <div className="w-40 h-1 bg-orange-400 rounded-full mb-6"></div> {/* เส้นขีดตกแต่ง */}
      
      {/* กล่องหมวดหมู่ */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link key={category.id} href={category.href} passHref>
            <div className="relative p-6 bg-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer border border-gray-300 hover:border-orange-500">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-40 h-40 mx-auto object-cover rounded-xl transition-all hover:scale-105"
              />
              <h2 className="text-2xl font-semibold mt-4 text-center text-black">{category.name}</h2>

              {/* เอฟเฟกต์เงาแบบ Soft Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent rounded-2xl"></div>
            </div>
          </Link>
          
        ))}
      </div>
    </div>
  );
};

export default Shop;
