import { redirect } from 'next/navigation';
import prismadb from '@/app/lib/db';
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import React from 'react'
  const  page = async() => {
 

  const {address} = useEthereum();
    const profile = await prismadb.user.findFirst({
        where: {
        eoa:address
        }
      });

    if (profile) {
        redirect(`/${profile.id}`);
      };
  return (
      <div>
         PAGE NOT FOUND 
      </div>
  )
};

export default page