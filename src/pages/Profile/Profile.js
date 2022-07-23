import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'

function Profile() {
  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut();
    navigate('/')
  }

  return (
    <div>
      <p>My Profile</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  )
}

export default Profile