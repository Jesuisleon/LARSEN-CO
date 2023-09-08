import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {Bars3Icon} from "@heroicons/react/20/solid";
import {Link} from "react-router-dom";
import {ArrowRightOnRectangleIcon, ChartBarIcon, PencilSquareIcon} from "@heroicons/react/24/solid";

export default function DropdownReportMenu({isAdmin, user, handleClickLogout}) {

  return (
    <div className="text-right md:hidden">
      <Menu as="div" className="inline-block text-left"
      >
        <div>
          <Menu.Button className="btn btn-gray">
            <Bars3Icon
              className="h-5 w-5 text-gray-200 hover:text-gray-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-2 mt-2 w-28 origin-top-right divide-y divide-gray-300 rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-100">
            {isAdmin &&
              <div className="px-1 py-1">
              <Menu.Item>
                {/*ICON */}
                <Link className="group flex w-full items-center rounded-md px-2 py-2 text-sm" to="/admin">
                <ChartBarIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  Admin
                </Link>
              </Menu.Item>
            </div>}
            <div className="px-1 py-1">
              <Menu.Item>
                <Link className="group flex w-full items-center rounded-md px-2 py-2 text-sm" to={`/salesman/${user.id}`}>
                  <PencilSquareIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  Reports
                </Link>
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm" onClick={handleClickLogout}>
                  <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  Logout
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}


