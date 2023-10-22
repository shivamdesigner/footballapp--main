import React, { useEffect, useRef, useState } from "react";
import logo from "../../Assets/Imgs/logo/logo.svg";
import {
  Box,
  Collapse,
  Container,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const footballClubs = [
  "Manchester United",
  "Manchester City",
  "FC Barcelona",
  "Sevilla",
  "AS Roma",
  "BVB Dortmund",
  "Paris St Germain",
  "Liverpool FC",
  "Tottenham Hotspur",
  "Real Madrid",
  "AC Milan",
  "S.S. Lazio",
  "Bayer Leverkusen",
  "OL Lyonnais",
  "Arsenal FC",
  "West Ham United",
  "Atletico De Madrid",
  "Inter Milan",
  "SSC Napoli",
  "RB Leipzig",
  "OL Marseille",
  "Chelsea FC",
  "Newcastle United",
  "Valencia",
  "Juventus",
  "Bayern Munich",
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showMenubar, setShowMenubar] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false); 
  const teamsMenuRef = useRef(null);
  const handleClickOutside = (event) => {
    if (teamsMenuRef.current && !teamsMenuRef.current.contains(event.target)) {
      setOpen(false);
    }
  };
  const handleClick = () => {
    setOpen(!open);
  };

  const handleMenuClick = () => {
    setShowMenubar(!showMenubar);
    if (!showMenubar) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };
  const handleMenuItemClick = () => {
    setIsNavigating(true);
    setShowMenubar(false);
    setOpen(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    
    };
  }, []);
  useEffect(() => {
    if (isNavigating) {
    
      const delay = setTimeout(() => {
        document.body.classList.remove("no-scroll");
        setIsNavigating(false);
      }, 100); 
      return () => clearTimeout(delay);
    }
  }, [isNavigating]);
  return (
    <>
      <Box className={`${isSticky ? "sticky-head" : ""}`}>


        <header className="header">

          <Container maxWidth="xl">

            <nav className="navbar">
              <Box className="img-box">
                <Link to="/" onClick={handleMenuItemClick}>
                  <img src={logo} alt="" />
                </Link>
              </Box>
              <Box component="ul" sx={{ display: "flex" }} className={`list-group ${showMenubar ? 'list-group-show' : ''}`}>
                <Box component="li">
                  <NavLink to='/about-us' onClick={handleMenuItemClick}>About Us</NavLink>
                </Box>
                <Box component="li" ref={teamsMenuRef}>
                  <NavLink
                    onClick={handleClick}
                  //  onMouseOver={handleClick}
                  >

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                      }}

                    >
                      Teams
                      {open ? (
                        <ExpandMore fontSize="medium" />
                      ) : (
                        <ChevronRightIcon fontSize="medium" />
                      )}
                    </Box>
                  </NavLink>
                  <Collapse in={open} timeout="auto" unmountOnExit >
                    <Box className="list-group-body" >
                      <Box className="list-container" sx={{ display: "flex", }} >
                        {footballClubs.map((club, index) => (
                          <NavLink key={index} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="list-item" onClick={handleMenuItemClick} to={`/${club.toLowerCase().replace(/\s+/g, '-')}`}>
                            {club}
                          </NavLink>
                        ))}
                      </Box>
                    </Box>
                  </Collapse>
                </Box>
                <Box component="li">
                  <NavLink to="stadium-tours" onClick={handleMenuItemClick}>Stadium Tours</NavLink>
                </Box>
                <Box component="li">
                  <NavLink to='/contact-us' onClick={handleMenuItemClick}>Contact Us</NavLink>
                </Box>
              </Box>
              <Box className="menubar-box" onClick={handleMenuClick}>{ showMenubar ?   <CloseIcon/> : <MenuIcon />}</Box>
            </nav>
          </Container>
        </header>
        <Box className="line-y"></Box>
      </Box>
    </>
  );
};

export default Navbar;