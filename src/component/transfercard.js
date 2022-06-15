import React from "react";
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { loadBlockchain } from '../redux/Slices/web3ContractSlices';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const Cards = () => {


    const dispatch = useAppDispatch()
    const { web3, contract, accounts } = useAppSelector((state) => state.web3Connect)

    const [amountTransfer, setamountTransfer] = useState();
    const [address, setaddress] = useState();


    const transferToken = async () => {
        try {
            let value = (amountTransfer * 10 ** 18).toFixed(0).toString();
            let transfer = await contract?.methods.transfer(address, value).send({
                from: accounts[0]
            })
            console.log('transfer', transfer)
        } catch (error) {
            console.log("Transfer error", error)
        }
    }
    return (
        <>
            <Card bg="success" text="white" style={{ width: '29rem' }}>
                <Card.Header>T R A N S F E R</Card.Header>
                <Card.Body >
                    <Card.Title>Primary Card Title</Card.Title>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Control value={amountTransfer} onChange={(e) => setamountTransfer(e.target.value)} placeholder="Amount" />
                            </Col>
                            <Col>
                                <Form.Control value={address} onChange={(e) => setaddress(e.target.value)} placeholder="Address" />
                            </Col>
                            <Col>
                            <Button variant="warning" onClick={() => transferToken()}>Transfer</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>

        </>
    )
}

export default Cards;