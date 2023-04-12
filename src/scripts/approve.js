import { ethers } from "ethers";
import { configureEnvironment } from "/Users/chaz/workspace/fun-wallet/fun-wallet-sdk/managers";
//Amount is in USDC
export const handleApprove = async function (wallet, auth, paymasterAddress, paymentAddr, amount=500) {
  await configureEnvironment({
    gasSponsor: false
  })
  await wallet.approve(auth, { spender: paymasterAddress, token: paymentAddr, amount: amount })

  return { success: true }

}