//UI Imports
import Header from "../components/Header";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import MixerInterface from "../components/Mixer/MixerInterface";
import NETWORK_HELPER from "../lib/networkHelper";
import styles from "../styles/Dapp.module.scss";

import { useEffect, useState } from "react";

export default function App() {
    const [connectedNetwork, setConnectedNetwork] = useState(false);
    const [connectedAddress, setConnectedAddress] = useState(false);
    const [inputNetworkData, setInputNetworkData] = useState(false);

    const onConnect = false;

    useEffect(() => {
        let netD = NETWORK_HELPER.getNetworkByChain(connectedNetwork);
        if (netD) {
            setInputNetworkData(netD);
        }
    }, [connectedNetwork]);

    return (
        <>
            <Header
                networkSetter={setConnectedNetwork}
                accountSetter={setConnectedAddress}
                onConnect={onConnect}
            />
            <Container>
                <Row>
                    <MixerInterface
                        input_network={inputNetworkData}
                        user_account={connectedAddress}
                        onConnect={onConnect}
                    ></MixerInterface>
                </Row>
               
            </Container>
        </>
    );
}
