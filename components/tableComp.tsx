import { faMagnifyingGlass, faMagnifyingGlassMinus, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Table } from "react-bootstrap";

type TableStruct = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  sortConfig: SortConfig;
  handleSort: (key: keyof Model) => void;
  sortedModels: Model[];
  currentModel: Model | undefined;
  setCurrentModel: (model: Model) => void;
};

type SortConfig = {
  key: keyof Model;
  direction: 'asc' | 'desc';
} | null;

type Model = {
  id: number;
  name: string;
  description: string;
  isOpenSource: boolean;
};


const TableComp = (props: TableStruct) => {
    return (
        <Table bordered style={{ fontFamily: "sans-serif", padding: "15px" }}>
            <thead>
                <tr style={{ padding: "10px" }}>
                    <th
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <span>S.No.</span>
                        </div>
                    </th>
                    <th onClick={() => props.handleSort('name')} style={{ cursor: 'pointer', padding: '8px 12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <span>Name</span>
                            {props.sortConfig?.key === 'name' ? (
                                <FontAwesomeIcon
                                    icon={props.sortConfig.direction != 'asc' ? faSortDown : faSortUp}
                                    color="#0d6efd"
                                    style={{ marginLeft: 8 }}
                                />
                            ) : (
                                <span style={{ display: 'inline-flex', flexDirection: 'column', fontSize: '0.8em', lineHeight: '0.8', marginLeft: 8 }}>
                                    <FontAwesomeIcon icon={faSortUp} color="grey" style={{ marginBottom: '-0.8em' }} />
                                    <FontAwesomeIcon icon={faSortDown} color="grey" />
                                </span>
                            )}
                        </div>
                    </th>
                    <th>
                        Description
                    </th>
                    <th onClick={() => props.handleSort('isOpenSource')} style={{ cursor: 'pointer', padding: '8px 12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <span>Type</span>
                            {props.sortConfig?.key === 'isOpenSource' ? (
                                <FontAwesomeIcon
                                    icon={props.sortConfig.direction != 'asc' ? faSortDown : faSortUp}
                                    color="#0d6efd"
                                    style={{ marginLeft: 8 }}
                                />
                            ) : (
                                <span style={{ display: 'inline-flex', flexDirection: 'column', fontSize: '0.8em', lineHeight: '0.8', marginLeft: 8 }}>
                                    <FontAwesomeIcon icon={faSortUp} color="grey" style={{ marginBottom: '-0.8em' }} />
                                    <FontAwesomeIcon icon={faSortDown} color="grey" />
                                </span>
                            )}
                        </div>
                    </th>
                    <th>
                        More Info
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.sortedModels.map((model, index) => (
                    <tr key={model.id} >
                        <td>{index + 1}</td>
                        <td>{model.name}</td>
                        <td>{model?.description && model?.description?.length > 50
                            ? model?.description?.slice(0, 115) + '...'
                            : model?.description}</td>
                        <td >{model.isOpenSource ? <Badge pill bg="primary" style={{ fontWeight: 7 }}>
                            Open Source
                        </Badge> : <Badge pill bg="secondary" style={{ fontWeight: 7 }}>Propreitary</Badge>}</td>

                        <td style={{ cursor: "pointer" }}
                            onClick={() => { props.setShowModal(!props.showModal), props.setCurrentModel(model) }}
                        >
                            <FontAwesomeIcon icon={props.currentModel?.name == model.name && props.showModal ? faMagnifyingGlassMinus : faMagnifyingGlass} color="grey"

                            /> View Details

                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default TableComp;