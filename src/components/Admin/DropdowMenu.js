import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { handleFilter } from './Admin';

function DropdownMenu() {

  return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Search User By:
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleFilter('email')}>email</Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilter('euid')}>euid</Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilter('first name')}>first name</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

  );
}

export default DropdownMenu;