import React from "react";
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { loadBlockchain } from '../redux/Slices/web3ContractSlices';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const Tx = require('ethereumjs-tx').Transaction;



const TransferfromCard = () => {

    const { web3, contract, accounts } = useAppSelector((state) => state.web3Connect)

    const [owneraddr, setowneraddr] = useState();
    const [transferTo, settransferTo] = useState();
    const [transferamount, settransferamount] = useState();


    const transferfrom = async () => {
        try {
            let value = (transferamount * 10 ** 18).toFixed(0).toString();
            let transfertokenAmount = await contract.methods.transferFrom(owneraddr, transferTo, value).send({
                from: accounts[0]
            })
            console.log('transfer From', transfertokenAmount);

        } catch (error) {
            console.log(error);

        }
    }


    return (
        <>
            <Card bg="info" text="white" style={{ width: '28rem' }}>
                <Card.Header>T R A N S F E R - F r o m</Card.Header>
                <Card.Body >
                    <Card.Title>Primary Card Title</Card.Title>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Control value={transferamount} onChange={(e) => settransferamount(e.target.value)} placeholder="Amount" />
                            </Col>
                            <Col>
                                <Form.Control value={owneraddr} onChange={(e) => setowneraddr(e.target.value)} placeholder="Token Owner Address" />
                            </Col>
                            <Col>
                                <Form.Control value={transferTo} onChange={(e) => settransferTo(e.target.value)} placeholder="Recipient Address" />
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Button variant="warning" onClick={() => transferfrom()}>Transfer From</Button>
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

export default TransferfromCard;