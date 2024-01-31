import { useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { Magic } from 'magic-sdk';
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedUserRoute = ({element: Component}) => {
  const toast = useToast()
  useEffect(() => {
    const renewToken = async () => {
      const token = Cookies.get("token");

      if (token) {
        try {
          // if token is present, increase timespan
          const magic = new Magic(process.env.REACT_APP_PUBLISHABLE_KEY)
          const newToken = await magic.user.getIdToken({ lifespan: 7 * 24 * 60 * 60 })

          Cookies.set("token", newToken)
        } catch (err) {
          toast({
            title: "Token is not valid, login again",
            variant: "left-accent",
            position: "top",
            isClosable: true,
            duration: 2000,
            status: "error",
          });
        }
      }
    }
    renewToken()
  }, [])
  
  return Cookies.get("token") ? <Component /> : <Navigate to="/login" />;
}

export default ProtectedUserRoute
