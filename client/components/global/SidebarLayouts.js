// SidebarLayouts.js
import PropTypes from "prop-types";
import { useState } from "react";

const SidebarLayout = ({ children, Sidebar }) => {
  return (
    <div className='container mx-auto '>
      <div className='grid grid-cols-6 gap-4'>
        <div className='col-span-1 overflow-hidden'>{Sidebar}</div>
        <div className='col-span-5 '>
          <div className='flex rounded w-fullmin-h-[300px]'>{children}</div>
        </div>
      </div>
    </div>
  );
};

SidebarLayout.prototype = {
  children: PropTypes.node.isRequired,
  Sidebar: PropTypes.node.isRequired,
};

export default SidebarLayout;
