import Link from "next/link";
import PropTypes from "prop-types";

const SliderList = ({ list }) => {
  return (
    <div className='flex flex-col'>
      {list.map((item) => (
        <Link
          href={item.href}
          className={
            item.selected
              ? "rounded-r-2xl rounded-l-sm bg-primary-100 py-2"
              : "rounded-r-2xl rounded-l-sm py-2 hover:bg-gray-200"
          }
          key={item.name}>
          <span
            className={
              item.selected ? "mx-2 text-primary-500" : "mx-2 text-gray-400"
            }>
            {item.icon}
          </span>
          <span
            className={
              item.selected
                ? " overflow-hidden align-baseline font-bold tracking-wide  text-primary-900"
                : " align-baseline tracking-wide text-gray-500"
            }>
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

SliderList.propTypes = {
  list: PropTypes.array.isRequired,
};

export default SliderList;
