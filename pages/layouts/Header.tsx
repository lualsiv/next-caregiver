import Head from 'next/head'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import styles from './header.module.scss';
import { signIn, signOut, useSession } from 'next-auth/client'

const Header = () =>{
    
    const [session] = useSession();
    
    
    return (
    <div className={styles.header}>
        <Head>
            <title>Caregivers App</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">SGIDUS</Navbar.Brand>
                <Navbar.Toggle aria-controls="resposive-navbar-nav" />
                <Navbar.Collapse id="resposive-navbar-nav">
                    
                        <Nav className="mr-auto">
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            { (session)  &&
                                <NavDropdown title="CMS Caregivers" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="/caregivers">Caregivers</NavDropdown.Item>
                                </NavDropdown>
                            }                                                                            
                        </Nav>
                        {(session) &&
                            <Form inline>
                                <strong>{session.user.email || session.user.name}</strong>
                                <Button onClick={signOut} variant="outline-light">Logout</Button>
                            </Form>
                        }
                    {!session &&
                        <Form inline>
                            {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                            <Button onClick={signIn} variant="outline-light">Sign in</Button>
                            {/* <Button href="/signup" variant="primary">Signup</Button> */}
                        </Form>
                    }
                </Navbar.Collapse>
            </Navbar>
        </header>
    </div>
    )
}

export default Header