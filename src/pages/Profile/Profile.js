import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';

function Profile() {
  const [user, setUser] = useState(null)
  const auth = getAuth();

  useEffect(() => {
    setUser(auth.currentUser);
  }, [auth.currentUser]);

  return (
    <div>
      <h1>Profile</h1>
      {user ? <h3>{user.displayName}</h3> : <p>Not Logged In</p>}
    </div>
  )
}

export default Profile