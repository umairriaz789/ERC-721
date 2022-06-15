import React from "react";
import Card from 'react-bootstrap/Card';
import '../index.css';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../redux/store';
import Blockchain from "./loadblockchain";
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';


const Navbar = () => {
    const [userbalance, setuserbalance] = useState()

    const { web3, contract, accounts } = useAppSelector((state) => state.web3Connect)



    const balanceOf = async () => {
        try {
            let balance = await contract?.methods.balanceOf(accounts[0]).call()
            setuserbalance(balance);

        } catch (error) {
            console.log("error", error)

        }
    }
    useEffect(() => {
        if (contract) {
            balanceOf()
        }
    }, [contract])



    return (
        <>
            <Card className="bg-dark text-white text-xl-left" >
                <Card.Img src="imgs/img3.png" alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Title className="texttitle">ERC-20 DApp</Card.Title>

                    <Card.Text className="text">
                        Submitted By: Umair Riaz (PIAIC106832)
                    </Card.Text>
                    <Card.Text className="textbalance">
                        {
                            userbalance ?
                                <>
                                    <Badge bg="warning" text="dark">
                                        <Spinner animation="border" variant="danger" />
                                        USER BALANCE : {userbalance / 10 ** 18}
                                    </Badge>{' '}

                                </>
                                : ""
                        }


                    </Card.Text>
                    <br />
                    <div className="badgess">
                        <Badge bg="success">Trnasfer</Badge> <Badge bg="danger">Approve</Badge> <Badge bg="light" text="dark">transferFrom</Badge>

                    </div>

                </Card.ImgOverlay>
            </Card>

        </>
    )
}

export default Navbar;