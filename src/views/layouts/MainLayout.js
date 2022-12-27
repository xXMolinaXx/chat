import React, { useEffect, useState } from "react";
import { CloseIcon, HamburgerIcon } from "../../components/atoms";
import { screenSize } from "../../const/screensize";
import logo from "../../extras/img/chat.png";
const MainLayout = ({ children }) => {
  const [browserWidth, setbrowserWidth] = useState(window.innerWidth);
  const [showOption, setshowOption] = useState(false);
  useEffect(() => {
    setbrowserWidth(window.innerWidth);
  }, []);
  const showHamburgerIcon = () => {
    if (showOption) {
      return <HamburgerIcon event={() => setshowOption((state) => !state)} />;
    } else {
      return <CloseIcon event={() => setshowOption((state) => !state)} />;
    }
  };
  return (
    <>
      <header>
        <nav className="nav my-container drop-shadow-xl">
          <div>
            <img
              src={logo}
              alt="imagen de hondruas"
              className="w-12 ml-5"
              style={{ display: "inline-block" }}
            />
          </div>
          {screenSize.small < browserWidth ? (
            <ul className="li-inline-block">
              <li>prueba</li>
              <li>prueba 2</li>
            </ul>
          ) : (
            <div className="container-app-view">{showHamburgerIcon()}</div>
          )}
        </nav>
        {showOption && (
          <div className="mb-5">
            <ul className="text-end ul-app-view">
              <li>prueba</li>
              <li>prueba 2</li>
            </ul>
          </div>
        )}
      </header>
      <main className="h-full chatBackground">{children}</main>
      <footer className="bg-white text-center">
        <p className="text-center">Derechos reservados. Kenny Molina</p>
        <a
          className="text-center"
          href="https://www.flaticon.es/iconos-gratis/medios-de-comunicacion-en-masa"
          title="medios de comunicación en masa iconos"
        >
          Medios de comunicación en masa iconos creados por Becris - Flaticon
        </a>
        <a
          href="https://www.flaticon.es/iconos-gratis/trabajo"
          title="trabajo iconos"
        >
          Trabajo iconos creados por prettycons - Flaticon
        </a>
        <a
          href="https://www.flaticon.es/iconos-gratis/comunicacion"
          title="comunicación iconos"
        >
          Comunicación iconos creados por Vectors Market - Flaticon
        </a>
        <a href="https://www.flaticon.com/free-icons/user" title="user icons">
          User icons created by Freepik - Flaticon
        </a>
      </footer>
    </>
  );
};

export default MainLayout;
