import fs from 'fs';

export function getMenu() {
  // @todo memoize
  const menu = JSON.parse(
    fs.readFileSync('src/components/header/menu.json', 'utf8'),
  );
  // console.log(menu);
  return menu;
}
