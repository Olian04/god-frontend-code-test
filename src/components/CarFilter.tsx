import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Car } from 'src/types/Car';

interface Props {
  carsData: Car[];
  selected: string;
  onChange?: (bodyType: string) => void;
}

export const CarFilter = ({ carsData, selected, onChange }: Props) => {
  const [query, setQuery] = useState('');

  const updateSelected = (newSelected: string) => {
    if (onChange) {
      onChange(newSelected);
    }
  }

  const uniqueBodyTypes = [...new Set(
    carsData.map(({ bodyType }) =>
      bodyType
        .toLowerCase()
        .replace(/\s+/g, ''))
  )];

  const filteredBodyTypes =
    query === ''
      ? uniqueBodyTypes
      : uniqueBodyTypes.filter((bodyType) =>
          bodyType
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className="w-72">
      <Combobox value={selected} onChange={updateSelected}>
        <div className="relative">
          <div className="relative w-full text-left border-2 border-[steelblue] bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-[steelblue] focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
            <Combobox.Input
              className="w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredBodyTypes.length === 0 && query !== '' ? (
                <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredBodyTypes.map((bodyType) => (
                  <Combobox.Option
                    key={bodyType}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${
                        active ? 'text-white bg-[steelblue]' : 'text-gray-900'
                      }`
                    }
                    value={bodyType}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {bodyType}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-[steelblue]'
                            }`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
