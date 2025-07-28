'use client';

import { useState } from 'react';
import { loginApi } from '../api/auth'; // ✅ Đúng path
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
    const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      console.log('🔄 Đang đăng nhập:', formData);
      
      const response = await loginApi({ 
        username: formData.username, 
        password: formData.password 
      });
      
      console.log('✅ Đăng nhập thành công:', response.data);
      setSuccess(true);
      
      // Reset form
      setFormData({ username: '', password: '' });
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      
      router.push('/dashboard');
      
    } catch (err: any) {
      console.error('❌ Lỗi đăng nhập:', err);
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Đăng nhập</h2>

      {error && (
        <div style={{ 
          color: 'red', 
          marginBottom: '1rem',
          padding: '0.5rem',
          background: '#fee',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{ 
          color: 'green', 
          marginBottom: '1rem',
          padding: '0.5rem',
          background: '#efe',
          borderRadius: '4px'
        }}>
          ✅ Đăng nhập thành công!
        </div>
      )}

      <div>
        <label>Tài khoản:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div>
        <label>Mật khẩu:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
    </form>
  );
}
