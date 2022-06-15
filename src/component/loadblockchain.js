import React from 'react';
import '../App.css';
import '../index.css';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { loadBlockchain } from '../redux/Slices/web3ContractSlices';
import { PetData } from "../contract/data/index";



function Blockchain() {

    const [nftSupply, setNftSupply] = useState();
    const [minted, setMinted] = useState();

    const dispatch = useAppDispatch()
    const { web3, contract, accounts, socketContract } = useAppSelector((state) => state.web3Connect);

    const handleblockchain = () => {
        dispatch(loadBlockchain());
    };


    const haldleMint = async () => {
        try {
            const recieve = await contract.methods.mint().send({ from: accounts[0] })

            return recieve;
        } catch (error) {
            console.log("Mint error", error)
        }
    }

    const GetCurrentSypply = async () => {
        try {
            let recipt = await contract.methods.currentSupply().call();
            return recipt;
        } catch (error) {
            console.log("error", error)
            return error;
        }
    };

    const listenMintEvent = () => {
        socketContract.events.Transfer({}, function (error, event) {
            setMinted(event.returnValues)
        })
    }


    useEffect(() => {
        if (socketContract) {
            async function check() {
                let result = await GetCurrentSypply();
                setNftSupply(result);
                listenMintEvent();
            }
            check()
        }


    }, [socketContract]);



    return (
        <div >
            {web3 ?
                (
                    <>
                        <button onClick={() => haldleMint()}>mint</button>
                        <br /><br /><br />
                        <div className="productss">
                            {
                                nftSupply && PetData.map((data, index) => index < nftSupply && (
                                    <>
                                        <div>
                                            <div className="product-css">
                                                <img src={data.img} alt="sig" />
                                                <h4>{data.title}</h4>
                                                <div className="details">
                                                    <h4>Rs:{data.price}</h4>
                                                </div>


                                            </div>

                                        </div>
                                    </>
                                ))

                            }
                        </div>
                    </>
                )
                : (
                    <button onClick={() => handleblockchain()}>Connect MetaMask</button>
                )}

        </div>
    );
}

export default Blockchain;
