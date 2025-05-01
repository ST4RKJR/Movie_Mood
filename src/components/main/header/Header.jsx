import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <header
        className="text-[#00DC89] h-24 body-font w-full z-20 bg-[#0C1119]"
        id="header"
      >
        <div className="container mx-auto flex flex-wrap px-6 h-full items-center">
          <div className="p-2 h-full flex items-center">
            <Link
              to={"/"}
              className="title-font font-medium items-center header-logo text-3xl"
            >
              <span className="text-white font-bold">
                Movie
                Mood
              </span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
