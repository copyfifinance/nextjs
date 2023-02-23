import Link from "next/link";
import Container from "../components/Container";
import HeaderNetworkSelector from "../components/HeaderNetworkSelector";
import styles from "../styles/Header.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import NETWORK_HELPER from "../lib/networkHelper";
import ConnectButtonHandler from "../components/ConnectButtonHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
    const [connectedNetwork, setConnectedNetwork] = useState(undefined);
    const [mobileNav, setMobileNav] = useState(false);
    const [connectedAddress, setConnectedAddress] = useState(undefined);
    const [selectedNetwork, setSelectedNetwork] = useState(undefined);

    const mobileNavHandler = () => {
        setMobileNav(!mobileNav);
    }

    useEffect(() => {
        if (typeof props.accountSetter != "undefined") {
            props.accountSetter(connectedAddress);
        }
    }, [connectedAddress]);

    useEffect(() => {
        if (typeof props.networkSetter != "undefined") {
            props.networkSetter(connectedNetwork);
        }

        if (connectedNetwork) {
            let network_data = NETWORK_HELPER.getNetworkByChain(
                connectedNetwork ? connectedNetwork : 1
            );
            setSelectedNetwork(network_data);
        }
    }, [connectedNetwork]);

    return (
        <>
            <header
                className={`${styles.header} ${props.layout == "main" && `fixed`
                    } ${mobileNav && `mobile`
                    }`}
            >
                <Container>
                    <div className={styles.header__row}>
                       

                      

                        {props.layout == "main" ? (
                            <div className={styles.header__buttons}>
                                <Link href="/app">Launch App</Link>
                            </div>
                        ) : (
                            <div className={styles.header__connect}>
                                <HeaderNetworkSelector
                                    selectedNetwork={selectedNetwork}
                                />

                                <ConnectButtonHandler
                                    setConnectedNetwork={setConnectedNetwork}
                                    setConnectedAddress={setConnectedAddress}
                                ></ConnectButtonHandler>
                            </div>
                        )}
                        <button onClick={mobileNavHandler} className={styles.header__nav_trigger}><FontAwesomeIcon
                            icon={faBars}
                        /></button>
                    </div>
                </Container>
            </header>
        </>
    );
};

export default Header;
