"use client"
import { AuthType } from '@particle-network/auth-core';
import { AuthCoreContextProvider, PromptSettingType } from '@particle-network/auth-core-modal';

import {
  opBNBTestnet
} from 'wagmi/chains';
import  { Toaster }  from 'react-hot-toast';

export default function Provider({ children }) {

  return (
    <>
            <Toaster />
       <AuthCoreContextProvider
      options={{
        projectId:'4097120b-e9f5-493a-9644-0b6d4f8f553a',
        clientKey: 'cheVyDJ9S8XEhqncTjOVu0GwjzZF1anQNTiPwczB',
        appId:'83a33f12-afd3-4d75-b09b-68f635c221a6',
        authTypes: [AuthType.email, AuthType.google, AuthType.twitter],
        themeType: 'dark',
        fiatCoin: 'USD',
        language: 'en',
        erc4337: {
          name: 'SIMPLE',
          version: '1.0.0',
        },
        promptSettingConfig: {
          promptPaymentPasswordSettingWhenSign: PromptSettingType.first,
          promptMasterPasswordSettingWhenLogin: PromptSettingType.first,
        },
        wallet: {
          visible: true,
          customStyle: {
            supportChains: [opBNBTestnet],
          }
        },
      }}
    >
               {children}
           
               </AuthCoreContextProvider>
    </>
  )
}
