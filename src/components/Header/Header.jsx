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
            <NavButton buttonIcon="fas fa-home" buttonName="Home" />
          </li>
          <li>
            <NavButton buttonIcon="fas fa-comment" buttonName="Message" />
          </li>
          <li>
            <NavButton buttonIcon="fas fa-search" buttonName="Search" />
          </li>
          <li>
            <NavButton buttonIcon="fas fa-heart" buttonName="Notifications" />
          </li>
          <li>
            <NavButton buttonIcon="fas fa-plus-square" buttonName="Create" />
          </li>

          <li>
            <NavButton buttonIcon="fas fa-home" buttonName="Profile" />
          </li>
          <li className="mt-auto">
            <NavButton
              buttonIcon="fas fa-sign-out-alt"
              buttonName="Sing Out"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
