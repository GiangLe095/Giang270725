'use client';

import { useState } from 'react';
import { registerApi } from '../api/auth';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
      const res = await registerApi({
        username: formData.username,
        password: formData.password,
        email: formData.email,
      });

      console.log('✅ Đăng ký thành công:', res.data);
      setSuccess(true);
      setFormData({ username: '', email: '', password: '' });
      router.push('/dashboard');
    } catch (err: any) {
      console.error('❌ Lỗi đăng ký:', err);
      setError(err.response?.data?.message || 'Đăng ký thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Đăng ký</h2>

      {error && (
        <div style={{ color: 'red', background: '#fee', padding: 10, marginBottom: 10 }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ color: 'green', background: '#efe', padding: 10, marginBottom: 10 }}>
          ✅ Đăng ký thành công!
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
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
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
        {loading ? 'Đang đăng ký...' : 'Đăng ký'}
      </button>
    </form>
  );
}
