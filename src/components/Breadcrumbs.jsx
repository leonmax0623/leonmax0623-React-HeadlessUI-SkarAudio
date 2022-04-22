/**
 * A server component that displays the content on the homepage of the Hydrogen app
 */
export default function Breadcrumbs({routes = []}) {
  let paths = [['/', 'Home']];

  for (let i = 0; i < routes.length; i++) {
    paths.push([null, ' / '])
    paths.push(routes[i]);
  }

  return (
    <>
      {paths.map((path) =>
        path[0] ? <a href={path[0]}>{path[1]}</a> : path[1]
      )}
    </>
  );
}
