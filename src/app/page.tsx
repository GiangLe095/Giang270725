import LoginPage from "./login/page";
import RegisterPage from "./register/page";
import ForgotPasswordPage from "./forgot-password/page";

export default function Home() {
  return (
    <div style={{  width: '100%', height: '100%', textAlign: 'center' }}>
      <h1>Welcome to My App</h1>
      <div style={{ marginTop: '2rem' }}>
        <a href="/login" style={{ margin: '0 1rem', padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          Login
        </a>
        <a href="/register" style={{ margin: '0 1rem', padding: '0.5rem 1rem', background: '#10b981', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          Register
        </a>
        <a href="/forgot-password" style={{ margin: '0 1rem', padding: '0.5rem 1rem', background: '#f59e0b', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          Forgot Password
        </a>
      </div>
    </div>
  );
}