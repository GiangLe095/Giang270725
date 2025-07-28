'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      router.push('/login');
      return;
    }

    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Lỗi parse user data:', error);
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (  
    <div className="flex flex-col space-y-4 w-full h-full">
      <div className="flex space-x-4 w-full h-full">
        <div className="bg-blue-500 text-white p-4">Block 1</div>
        <div className="bg-green-500 text-white p-4">Block 2</div>
      </div>
      <div className="flex space-x-4 w-full h-full">
        Block 3
        
      </div>
      
    </div>
  ) 
}

