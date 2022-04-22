import {useEffect, useState, useRef} from 'react';
import cheerio from 'cheerio';
import {Spinner} from './spinner.jsx';

export function DescriptionTabs({descriptionHtml}) {
  const [tabNames, setTabNames] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const $ = cheerio.load(descriptionHtml);
    const ul = $('ul');
    // console.log(ul);
    const tabs = $('li', ul[0]);
    // console.log(tabs);
    const tabNames = Array.from(tabs).map(
      (x) => x?.children?.[0]?.children?.[0]?.data,
    );
    // console.log(tabNames);
    setTabNames(tabNames);

    const content = $('> li', ul[1]);
    const sections = Array.from(content).map((x) => {
      console.log(x);
      return '<div>' + $.html(x.children) + '</div>';
    });
    setSections(sections);
  }, [descriptionHtml]);

  if (!tabNames.length) {
    return <Spinner />;
  }

  return <FourTabs tabNames={tabNames} sections={sections} />;
}

export function FourTabs({tabNames, sections}) {
  const tabRef = useRef(null);
  const [tab, setTab] = useState(tabNames?.[0]);
  const [selectorStyle, setSelectorStyle] = useState({
    left: 0,
    width: 0,
    height: 0
  });

  const clickTab = (e, tabName) => {
    e.preventDefault();
    setTab(tabName);
  };

  useEffect(() => {
    const activeTab = tabRef.current;
    setSelectorStyle({
      left: activeTab.offsetLeft,
      width: activeTab.offsetWidth,
      height: activeTab.offsetHeight,
    })
  }, [tabRef, tab]);

  return (
    <>
      <div className="tabs">
        <div style={selectorStyle} className="tabs__selector"></div>
        {tabNames.map((tabName) => (
          <a ref={tab === tabName ? tabRef: null} className={tab === tabName ? 'active' : ''} href={'#' + tabName} onClick={(e) => clickTab(e, tabName)}>{tabName}</a>
        ))}
      </div>
      <div className="tab-content" id="tabs-tabContent">
        {tabNames.map((tabName, index) => (
          <div
            key={tabName}
            className={
              'prose tab-pane fade ' +
              (tab === tabName ? 'show active' : 'hidden')
            }
            id="tabs-home"
            role="tabpanel"
            aria-labelledby="tabs-home-tab"
            dangerouslySetInnerHTML={{__html: sections[index]}}
          ></div>
        ))}
      </div>
    </>
  );
}
