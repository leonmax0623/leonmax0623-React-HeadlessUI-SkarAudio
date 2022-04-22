import {Menu, Transition} from '@headlessui/react';
import {ChevronDownIcon, ChevronRightIcon} from '@heroicons/react/solid';
import {Link} from '@shopify/hydrogen/client';
import {Fragment} from 'react';
import {classNames} from '../../helpers/class-names.js';
// import {useUrl} from '@shopify/hydrogen';

function useUrl() {
  if (typeof document === 'object') {
    return document.location;
  }
  return {};
}

export function RenderDropDownMenus({categories, alignRight}) {
  const url = useUrl();
  return (
    <>
      {categories.map((category) => (
        <Menu as="div" className="relative text-left" key={category.id}>
          <div>
            <Menu.Button
              className={classNames(
                'inline-flex justify-center w-full px-4 py-2 ',
                'text-sm font-medium text-white focus:outline-none font-oswald whitespace-nowrap',
                'font-oswald uppercase',
              )}
            >
              {category.category}
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
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
            <Menu.Items
              className={classNames(
                alignRight
                  ? 'origin-top-right right-0 '
                  : 'origin-top-left left-0 ',
                'absolute mt-2 w-56 rounded-md z-20 menu-bg-color',
                'shadow-lg ring-1 ring-black focus:outline-none',
              )}
            >
              <div className="py-1">
                {category.collections.map((collection) => {
                  const currentPage = collection.slug === url.pathname;
                  console.log(collection.id, collection.title);
                  return (
                    <Menu.Item key={collection.id}>
                      {({active}) =>
                        collection['sub-collections'] ??
                        collection['products'] ? (
                          <RenderDropRightMenus
                            products={
                              collection['sub-collections'] ??
                              collection['products']
                            }
                            active={active}
                            className={classNames(
                              active ? 'text-white' : 'text-gray-300',
                              'block px-4 py-2 text-sm font-oswald uppercase',
                            )}
                          >
                            {collection.title}
                          </RenderDropRightMenus>
                        ) : (
                          <Link
                            to={`${collection.slug}`}
                            className={classNames(
                              currentPage ? 'text-orange-100' : 'text-white',
                              'block px-4 py-2 text-sm uppercase font-oswald hover:underline',
                            )}
                          >
                            {collection.title}
                          </Link>
                        )
                      }
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ))}
    </>
  );
}

export function RenderDropRightMenus({products, children, active}) {
  return (
    <Menu as="div" className="relative text-left">
      <Menu.Button
        className={classNames(
          'inline-flex w-full px-4 py-2 uppercase',
          'text-sm font-medium text-white focus:outline-zinc-600',
          'font-oswald whitespace-nowrap hover:underline',
          active && 'underline',
        )}
      >
        {children}
        <ChevronRightIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            'origin-top-left left-0',
            'absolute mt-2 w-56 rounded-md menu-bg-color',
            'shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
          )}
          style={{marginLeft: '224px', marginTop: '-34px'}}
        >
          <div className="py-1">
            {products &&
              products.map((product) => (
                <Menu.Item key={product.id}>
                  {({active}) => (
                    <Link
                      to={`${product.slug}`}
                      className={classNames(
                        active ? 'text-white' : 'text-gray-300',
                        'block px-4 py-2 text-sm font-oswald',
                      )}
                    >
                      {product.sku}
                    </Link>
                  )}
                </Menu.Item>
              ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

/**
 * @typedef MenuCategory
 * @property id {string}
 * @property category {string}
 * @property collections {MenuCollection[]}
 */

/**
 * @typedef MenuCollection
 * @property id {string}
 * @property title {string}
 * @property slug {string}
 */
