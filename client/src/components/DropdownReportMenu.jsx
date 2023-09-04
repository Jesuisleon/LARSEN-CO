import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";


export default function DropdownReportMenu({handleDelete, handleEdit}) {

  return (
    <div className="text-right">
      <Menu as="div" className="inline-block text-left"
      >
        <div>
          <Menu.Button className="btn btn-gray">
            Options
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-gray-200 hover:text-gray-100"
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
          <Menu.Items className="absolute right-20 mt-2 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-100">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleEdit()}
                    className={`${
                      active ? "bg-yellow-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <EditIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <EditIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Edit
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleDelete()}
                    className={`${
                      active ? "bg-yellow-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <DeleteIcon
                        className="mr-2 h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <DeleteIcon
                        className="mr-2 h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                      />
                    )}
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function EditIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#efdba9"
        stroke="#eab325"
        strokeWidth="2"
      />
    </svg>
  );
}

function DeleteIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#efdba9"
        stroke="#eab325"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#eab325" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#eab325" strokeWidth="2" />
    </svg>
  );
}


