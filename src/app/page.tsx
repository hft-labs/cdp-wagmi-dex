'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { AuthButton} from '@coinbase/cdp-react'
import { useEvmAddress } from '@coinbase/cdp-hooks'
import { useCurrentUser } from '@coinbase/cdp-hooks'
function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const evmAddress = useEvmAddress()
  const user = useCurrentUser()
  return (
    <>
      <AuthButton />
      <div>
        <h2>Account</h2>
        <div>
          user: {JSON.stringify(user)},
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
          <br />
          evmAddress: {evmAddress}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  )
}

export default App
