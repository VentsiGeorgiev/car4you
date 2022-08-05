import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ClientsContext = createContext();

export const ClientsProvider = ({ children }) => {

  const [clients, setClients] = useState([])

  useEffect(() => {
    try {
      const getClients = async () => {
        const response = await fetch('https://dummyapi.io/data/v1/user?limit=5', {
          headers: {
            'app-id': `${process.env.REACT_APP_API_KEY}`
          }
        })
        const result = await response.json()
        setClients(result.data);
      }
      getClients();
    } catch (error) {
      toast.error('Could Not Load Clients Testimonials')
    }

  }, [])


  return <ClientsContext.Provider value={{ clients }}>{children}</ClientsContext.Provider>
}


export default ClientsContext;