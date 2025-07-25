import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { base, baseSepolia, mainnet, sepolia } from 'wagmi/chains'
import { createCDPEmbeddedWalletConnector } from '@coinbase/cdp-wagmi'

const connector = createCDPEmbeddedWalletConnector({
	cdpConfig: {
		projectId: process.env.NEXT_PUBLIC_COINBASE_APP_ID as string,
	},
	providerConfig: {
      chains: [base, baseSepolia],
      transports: {
        [base.id]: http(),
        [baseSepolia.id]: http(),
      },
	}
});

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia],
    connectors: [
      connector,
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
