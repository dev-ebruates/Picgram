import NavButton from "../navButton/NavButton";
import "./Header.css";

function Header() {
  return (
    <header className="header border-r border-gray-900 h-10 ">
      <div className="logo">
        <h2 className=" italic font-serif text-4xl tracking-tight text-white">
          picgram
        </h2>
      </div>

      <nav className="menu">
        <ul>
          <li>
            <NavButton buttonIcon="fas fa-home" buttonTitle="Home" />
          </li>
          <li>
            <NavButton buttonIcon="fas fa-comment" buttonTitle="Message" />
          </li>
          <li>
            <NavButton buttonIcon="fas fa-search" buttonTitle="Search" />
          </li>
          <li>
            <NavButton buttonIcon="fas fa-heart" buttonTitle="Notifications" />
          </li>
          <li>
            <NavButton buttonIcon="fas fa-plus-square" buttonTitle="Create" />
          </li>

          <li>
            <NavButton buttonTitle="Profile" />
          </li>
          <li className="mt-auto">
            <NavButton
              buttonIcon="fas fa-sign-out-alt"
              buttonTitle="Sing Out"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
