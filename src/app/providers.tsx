'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { type State, WagmiProvider } from 'wagmi'
import { CDPReactProvider, type Theme } from '@coinbase/cdp-react';

import { getConfig } from '@/wagmi'
import { CDPHooksProvider, useCurrentUser } from '@coinbase/cdp-hooks';



// Your CDP config
const cdpConfig = {
  projectId: process.env.NEXT_PUBLIC_COINBASE_APP_ID as string,
}

// Global config for your dapp
const appConfig = {
  name: "My app", // the name of your application
  logoUrl: "https://picsum.photos/64", // logo will be displayed in select components
}


// You can customize the theme by overriding theme variables
const themeOverrides: Partial<Theme> = {
  "colors-background": "black",
  "colors-backgroundOverlay": "rgba(0,0,0,0.5)",
  "colors-text": "white",
  "colors-textSecondary": "#999999",
}


export function Providers(props: {
  children: ReactNode
  initialState?: State
}) {
  const [config] = useState(() => getConfig())
  const [queryClient] = useState(() => new QueryClient())
    return (
    <CDPReactProvider
      config={cdpConfig}
      app={appConfig}
      theme={themeOverrides}
    >
      <WagmiProvider config={config} initialState={props.initialState} reconnectOnMount={false}>
      <CDPHooksProvider config={cdpConfig}>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
        </CDPHooksProvider>
      </WagmiProvider>
    </CDPReactProvider>

  )
}
