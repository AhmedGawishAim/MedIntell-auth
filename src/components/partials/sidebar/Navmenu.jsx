"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Collapse } from "react-collapse";
import Icon from "@/components/ui/Icon";

const Navmenu = ({ menus }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const pathname = usePathname();
  const locationName = pathname?.replace("/", "");

  const toggleSubmenu = (i) => {
    setActiveSubmenu(activeSubmenu === i ? null : i);
  };

  useEffect(() => {
    let submenuIndex = null;
    menus.forEach((item, i) => {
      if (!item.child) return;
      if (item.link === locationName) {
        submenuIndex = null;
      } else {
        const ciIndex = item.child.findIndex(
          (ci) => ci.childlink === locationName
        );
        if (ciIndex !== -1) {
          submenuIndex = i;
        }
      }
    });

    document.title = `MEDintell | ${locationName}`;
    setActiveSubmenu(submenuIndex);
  }, [pathname]);

  const isActive = (href) => pathname === href;

  return (
    <ul>
      {menus.map((item, i) => (
        <li
          key={i}
          className={`single-sidebar-menu 
            ${item.child ? "item-has-children" : ""}
            ${activeSubmenu === i ? "open" : ""}
            ${pathname === item.link ? "menu-item-active" : ""}
          `}
        >
          {/* Label */}
          {item.isHeadr && !item.child && (
            <div className="menulabel">{item.title}</div>
          )}

          {/* Single menu without children */}
          {!item.child && !item.isHeadr && (
            <Link href={item.link} className="menu-link">
              <span className="menu-icon flex-grow-0">
                <Icon icon={item.icon} />
              </span>
              <div className="text-box flex-grow">{item.title}</div>
              {item.badge && <span className="menu-badge">{item.badge}</span>}
            </Link>
          )}

          {/* Parent with submenu */}
          {item.child && (
            <div
              className={`menu-link ${
                activeSubmenu === i ? "parent_active not-collapsed" : "collapsed"
              }`}
              onClick={() => toggleSubmenu(i)}
            >
              <div className="flex-1 flex items-start">
                <span className="menu-icon">
                  <Icon icon={item.icon} />
                </span>
                <div className="text-box">{item.title}</div>
              </div>
              <div className="flex-0">
                <div
                  className={`menu-arrow transform transition-all duration-300 ${
                    activeSubmenu === i ? "rotate-90" : ""
                  }`}
                >
                  <Icon icon="heroicons-outline:chevron-right" />
                </div>
              </div>
            </div>
          )}

          {/* Submenu */}
          <Collapse isOpened={activeSubmenu === i}>
            <ul className="sub-menu">
              {item.child?.map((subItem, j) => (
                <li key={j} className="block pl-4 pr-1 mb-4 first:mt-4">
                  <Link href={subItem.childlink}>
                    <span
                      className={`${
                        isActive(subItem.childlink)
                          ? "text-black dark:text-white font-medium"
                          : "text-slate-600 dark:text-slate-300"
                      } text-sm flex space-x-3 items-center transition-all duration-150`}
                    >
                      <span
                        className={`${
                          isActive(subItem.childlink)
                            ? "bg-slate-900 dark:bg-slate-300 ring-4 ring-opacity-[15%] ring-black-500 dark:ring-slate-300 dark:ring-opacity-20"
                            : ""
                        } h-2 w-2 rounded-full border border-slate-600 dark:border-white inline-block flex-none`}
                      ></span>
                      <span className="flex-1">{subItem.childtitle}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Collapse>
        </li>
      ))}
    </ul>
  );
};

export default Navmenu;
