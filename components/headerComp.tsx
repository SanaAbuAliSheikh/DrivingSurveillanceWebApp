import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const MyHeader = () => {
  return (
    <Navbar className="bg-body-tertiary  border rounded shadow-lg">
      <Container>
        <Link href="/" passHref >

            <img
              alt="Telekom Logo"
              src="/telekom-logo.jpg"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />
        
        </Link>
            <h6 style={{color:"black", fontSize:"35px", fontWeight:"bolder", textDecoration:"none", fontFamily:"sans-serif", paddingRight:"1000px"}}>Telekom Task</h6>

      </Container>
    </Navbar>
  );
};

export default MyHeader;
