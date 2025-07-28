'use client';

import { useState } from 'react';
import { forgotPasswordApi } from '../api/auth';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await forgotPasswordApi({ email });
      console.log('✅ Yêu cầu reset mật khẩu thành công:', res.data);
      setSubmitted(true);
      
    } catch (err: any) {
      console.error('❌ Lỗi reset mật khẩu:', err);
      setError(err.response?.data?.message || 'Có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Quên mật khẩu</h2>

      {submitted ? (
        <p style={{ color: 'green' }}>
          ✅ Nếu email tồn tại, chúng tôi đã gửi liên kết khôi phục mật khẩu.
        </p>
      ) : (
        <>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <br />
          <button type="submit" disabled={loading}>
            {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
          </button>
        </>
      )}
    </form>
  );
}
