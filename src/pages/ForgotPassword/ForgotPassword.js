import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';


function ForgotPassword() {
  const [email, setEmail] = useState('');

  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Reset Email was sent')
    } catch (error) {
      toast.error('Error: Could Not Send Reset Email')
    }

  }
  return (
    <main className='container'>
      <h2>Forgot Password</h2>
      <h4>Send Reset Link to</h4>
      <form onSubmit={onSubmit}>
        <input
          type='email'
          placeholder='Email'
          id='email'
          value={email}
          onChange={onChange}
        />
        <div>
          <button>Send</button>
        </div>
      </form>
    </main>
  )
}

export default ForgotPassword