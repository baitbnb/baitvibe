import { createConfig, http } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// WalletConnect Project ID - get yours free at https://cloud.walletconnect.com
const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '0b0a6209ef59bad0baa893a4b2c1cce0';

export const wagmiConfig = createConfig({
  chains: [bsc],
  connectors: [
    injected(),
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID,
      showQrModal: true,
      metadata: {
        name: 'BAIT',
        description: 'BAIT - AI Tweet Writer on BSC',
        url: window.location.origin,
        icons: [`${window.location.origin}/favicon.ico`],
      },
    }),
  ],
  transports: {
    [bsc.id]: http(),
  },
});
