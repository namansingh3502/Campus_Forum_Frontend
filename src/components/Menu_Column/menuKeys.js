import React from "react";
import {NavLink} from "react-router-dom";

const MenuKeys = () => {
  const Buttons = [
    {name:"Home", url:``},
    {name:"Video", url:`#`},
    {name:"Tags", url:`#`},
    {name:"Contacts", url:`#`}];

  return (
    <div className="p-4 bg-gray-400 rounded-lg bg-opacity-10 backdrop-filter backdrop-blur-lg text-lg">
      <ul>
        {Buttons.map((item, index) => (
          <li className="pl-14 font-medium text-white my-2 " key={index}>
            <NavLink to={`${item.url}`} >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuKeys;
