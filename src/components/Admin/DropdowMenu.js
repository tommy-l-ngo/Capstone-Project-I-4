import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DropdownMenu() {

  return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Search User By:
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1" >Last Name</Dropdown.Item>
          <Dropdown.Item href="#/action-2">email</Dropdown.Item>
          <Dropdown.Item href="#/action-3">eUID</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    
  );
}

export default DropdownMenu;