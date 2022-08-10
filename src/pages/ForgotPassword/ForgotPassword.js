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
    <div className='forgotPassword'>
      <h2>Forgot Password</h2>
      <h4>Send Reset Link to</h4>
      <form onSubmit={onSubmit}>
        <input
          className='form-input'
          type='email'
          placeholder='Email'
          id='email'
          value={email}
          onChange={onChange}
          required
        />
        <div>
          <button className='btn btn-primary'>Send</button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword