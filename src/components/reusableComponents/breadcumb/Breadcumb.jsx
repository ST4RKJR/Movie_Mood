import React from "react";
import { FaAngleRight, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Breadcumb = ({ mediaType, linkTo, mediaName }) => {
  return (
    <>
      <nav className="  w-[40%]" aria-label="Breadcrumb">
        <ol className="flex items-center">
          <li className="inline-flex items-center">
            <Link
              to={"/"}
              className="inline-flex items-center text-lg font-medium text-gray-700 hover:text-blue-600"
            >
              <FaHome className="me-2 text-xl" />
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <FaAngleRight className=" text-xl" />
              <Link
                to={linkTo}
                className="ms-1 text-lg font-medium text-gray-700 hover:text-blue-600 md:ms-2 text-nowrap"
              >
                {mediaType}
              </Link>
            </div>
          </li>
          <li className="w-[60%] flex items-center ms-2" aria-current="page ">
              <FaAngleRight className=" text-3xl" />
              <span className="ms-1 text-lg font-medium text-gray-500 md:ms-2 text-ellipsis whitespace-nowrap overflow-hidden block">
                {mediaName}
              </span>
          </li>
        </ol>
      </nav>
    </>
  );
};

export default Breadcumb;
