// SidebarLayouts.js
import PropTypes from "prop-types";

const SidebarLayout = ({ children, Sidebar }) => {
  return (
    <div className='container mx-auto '>
      <div className='grid grid-cols-6 gap-4'>
        <div className='col-span-1 border'>{Sidebar}</div>
        <div className='col-span-5 '>
          <div className='flex rounded bg-gray-100'>{children}</div>
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
