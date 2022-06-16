import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
export default function Product() {
  const router = useRouter();
  const isAuthenticated = useSelector<RootState>(
    state => state.auth?.data?.isAuthenticated,
  );
  useEffect(() => {
    if (isAuthenticated) {
     router.push('/database');
    }else{
      router.push('/login');
    }
  }, [isAuthenticated]);

  return <div>لطفا صبر کنید ...</div>;
}
