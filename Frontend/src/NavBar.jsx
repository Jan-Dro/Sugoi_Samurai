import React, {useState, useEffect, useContext} from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import {ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale} from './Icons';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from "./Authcontext";

export default function Appbar() {
  const [customerDropdownIsOpen, setCustomerDropdownIsOpen] = useState(false);

  const handleOpenCustomerDropdown = () => {
    setCustomerDropdownIsOpen(true);
  };
  
  const handleCloseCustomerDropdown = () => {
    setCustomerDropdownIsOpen(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (customerDropdownIsOpen && !event.target.closest(".dropdown")) {
        handleCloseCustomerDropdown();
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [customerDropdownIsOpen]);

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };

  const navigateToLogin = () => {
    window.location.href = "/login";
  };
  const signupLogin = () => {
    window.location.href = '/signup'
  };
  
  return (
    <Navbar>
      <NavbarBrand>
        <a href="/" className="font-bold text-inherit">Sugoi Samurai</a>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Shop
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              description="Shop for shirts, sweatshirts, or hoodies! :)"
              startContent={icons.scale}
            >
              <Link href="/apperal">
              Apparel
              </Link>
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Our dope stickers :D"
              startContent={icons.activity}
            >
              <Link href="/stickers">
              Stickers
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem isActive>
          <Link href="/newitems" aria-current="page">
            New Items 
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/cart">
            Cart
          </Link>
        </NavbarItem>
      </NavbarContent>
        <NavbarContent justify="end">
          {useAuth().authToken && customerDropdownIsOpen && (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={<Avatar src="https://example.com/avatar.png" />}
                >
                  My Account
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Customer menu"
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                <DropdownItem key="my_account">
                  <Link href="/my-account">My Account</Link>
                </DropdownItem>
                <DropdownItem key="my_orders">
                  <Link href="/my-orders">My Orders</Link>
                </DropdownItem>
                <DropdownItem key="logout">
                  <Link href="/logout">Log Out</Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
          {!useAuth().authToken && (
      <Button
        color="primary"
        variant="flat"
        onClick={navigateToLogin}
        onAuxClick={handleCloseCustomerDropdown}
      >
        Sign In
      </Button>
    )}
  </NavbarContent>
    </Navbar>
  );
}
