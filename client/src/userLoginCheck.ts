import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useLoginCheck = () => {
  const history = useNavigate();
  let userLoggedIn = false;

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("User not logged in!");
      history("/login");
    } else {
        userLoggedIn = true;
    }
  }, []);

  return {
    userLoggedIn
  };
};

export default useLoginCheck;