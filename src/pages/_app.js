import '../styles/globals.css'

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon, goerli } from 'wagmi/chains'
import { Web3Button } from '@web3modal/react'
import { EthereumProvider } from '@walletconnect/ethereum-provider'

// const provider2 = await EthereumProvider.init({
//   "5a25d59af74387684be4b2fdf1ab0bc3", // REQUIRED your projectId
//   [5], // REQUIRED chain ids
//   true // REQUIRED set to "true" to use @web3modal/standalone,
// })

const chains = [goerli]
const projectId = '5a25d59af74387684be4b2fdf1ab0bc3'
const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <div className="w-full h-full">
          {getLayout(<Component {...pageProps} />)}
        </div>  </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>

  )
}