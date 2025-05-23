import Link from 'next/link';
import { Badge,  Modal, NavLink } from 'react-bootstrap';

type ModalStruct = {
  showModal: boolean;
  currentModel: CurrentModel;
  handleClose: () => void;
};

type CurrentModel = {
  id: number;
  name: string;
  description: string;
  basicDesc: string;
  domain: string;
  purpose: string;
  link: string;
  isOpenSource: boolean;
} | undefined;

const ModalComp = (props: ModalStruct) => {
    
    return (
        <Modal show={props.showModal} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.currentModel?.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{props.currentModel?.description}</p>
                <span><h5>Domain</h5><p>{props.currentModel?.domain}</p></span>
                <span><h5>Purpose</h5><p>{props.currentModel?.purpose}</p></span>
                {props.currentModel?.link && 
                    <span><h5>Resource</h5><NavLink href={props.currentModel?.link}>{props.currentModel?.link}</NavLink></span>
                
                }
                <br></br>

                {props.currentModel?.isOpenSource ? 
                    <Badge pill bg="primary" >
                         Open Source
                    </Badge> 
                    : 
                    <Badge pill bg="secondary">Propreitary</Badge>
                }
            </Modal.Body>
        </Modal>
    )
}
export default ModalComp;