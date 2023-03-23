import { useEffect, useState, useRef } from "react";
import Image from 'next/image';
import { ethers } from "ethers";
import { FunWallet, FunWalletConfig } from "@fun-wallet/sdk";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { networks } from "../utils/networks";

export default function WalletView(props) {

  const wallet = props.wallet;
  const setWallet = props.setWallet;
  const setEOA = props.setEOA;
  const eoa = props.eoa;
  const network = props.network;
  const [addr, setAddr] = useState()
  const [balance, setBalance] = useState();
  const [dropdown, setDropdown] = useState();
  const dropdownRef = useRef()
  const walletBtnRef = useRef()

  useEffect(() => {
    if(networks[network || ethereum.networkVersion]){
      eoa.getAddress().then((address) => {
        setAddr(address)
        eoa.provider.getBalance(address).then((balance) => {
          setBalance(ethers.utils.formatEther(balance))
        }).catch((e) => {
          console.log(e)
        })
      })
    }
  }, [network])

  useOnClickOutside(dropdownRef, (e) => {
    if(walletBtnRef?.current?.contains(e.target) || e.target == walletBtnRef?.current) return;
    setDropdown(false)
  })

  function handleCopyAddr(){
    var copyText = document.createElement('input');
    copyText.style.position = "absolute";
    copyText.style.top = "-1250000px";
    copyText.value = addr;
    document.body.appendChild(copyText);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
  }

  function handleLogout(){
    setWallet(null)
    setEOA(null)
  }

  return (
    <div>
      {addr && (
        <div className="w-[164px] flex items-center cursor-pointer" onClick={() => setDropdown(!dropdown)} ref={walletBtnRef}>
          <Image src="/profile.svg" width="24" height="24"/>
          <div className="text-[#667085] text-sm mx-2 font-mono max-w-[104px]">{`${addr.substring(0, 5)}...${addr.substring(addr.length - 4)}`}</div>
          <Image src="/chevron.svg" width="20" height="20"/>
        </div>
      )}
      {dropdown && (
        <div className="dropdown w-[343px] absolute mt-2 -ml-[172px] p-6 flex flex-col items-center" ref={dropdownRef}>
          <div className="flex items-center cursor-pointer" onClick={handleCopyAddr}>
            <div className="font-mono text-[#667085] mr-1" >{`${addr.substring(0, 11)}...${addr.substring(addr.length - 4)}`}</div>
            <Image src="/copy.svg" width="16" height="16"/>
          </div>
          <Image src="/profile.svg" width="56" height="56" className="mt-4"/>
          <div className="flex items-end mt-2">
            <div className="text-[32px] font-semibold mr-1">{Number(balance).toFixed(5)}</div>
            <div className="text-[#667085] mb-2">{networks[ethereum.networkVersion]?.nativeCurrency.symbol}</div>
          </div>
          <div className="button text-center py-3 px-4 w-full mt-4" onClick={handleLogout}>Logout</div>
        </div> 
      )}
    </div>
  )
}
