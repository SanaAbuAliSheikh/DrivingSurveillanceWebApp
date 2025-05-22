import { Badge,  Modal } from 'react-bootstrap';

type ModalStruct = {
  showModal: boolean;
  currentModel: CurrentModel;
  handleClose: () => void;
};

type CurrentModel = {
  id: number;
  name: string;
  description: string;
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