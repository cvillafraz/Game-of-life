import React from 'react';
//import font awesome 5
import fontawesome from "@fortawesome/fontawesome";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import '../styles/buttons.scss';
//Buttons component
const Buttons=props=> {
  
    return <ul className="button-list">
        <li>
          <button onClick={props.start}>Start</button>
        </li>
        <li>
          <button onClick={props.pause}>Pause</button>
        </li>
        <li>
          <button onClick={props.clear}>Clear</button>
        </li>
        <li>
          <button onClick={props.seed}>Seed</button>
        </li>
        <li className="dropdown-btn">
          <button>
            Speed <FontAwesomeIcon icon={faAngleDown} />
          </button>
          <ul className="dropdown">
            <li>
              <button onClick={()=>props.selectSpeed('slow')}>Slow</button>
            </li>
            <li>
              <button onClick={()=>props.selectSpeed('fast')}>Fast</button>
            </li>
          </ul>
        </li>
        <li className="dropdown-btn">
          <button>
            Grid size <FontAwesomeIcon icon={faAngleDown} />
          </button>
          <ul className="dropdown">
            <li>
              <button onClick={() => props.gridSize(50, 30)}>50*30</button>
            </li>
            <li>
              <button onClick={() => props.gridSize(70, 50)}>70*50</button>
            </li>
          </ul>
        </li>
      </ul>;
}
export default Buttons;