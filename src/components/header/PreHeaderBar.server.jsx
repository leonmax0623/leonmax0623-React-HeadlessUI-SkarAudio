import SearchBar from '../Searchbar.client.jsx';
import CartToggle from '../CartToggle.client.jsx';

export default function PreHeaderBar() {
  // const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div
      className="px-5 flex flex-row justify-between py-1 z-20"
      style={{backgroundColor: 'rgb(27,31,35)'}}
    >
      <div className={'basis-1/3 flex items-center'}>
        <div className="py-0.5 text-gray-100">Contact: +1 123 123 123</div>
      </div>

      <div
        className={
          'basis-1/3 content-center justify-items-center ' +
          ' items-center place-self-center self-center place-content-center ' +
          'flex '
        }
      ></div>

      <div className="flex basis-1/3 justify-items-end items-center place-content-end">
        <SearchBar />

        <a
          href={'login'}
          className={
            'block mx-3 px-3 text-gray-100 hover:text-white whitespace-nowrap'
          }
        >
          <i className={'fa fa-user-circle px-2'} /> Login
        </a>

        <div className="py-0.5">
          <CartToggle
          // handleClick={() => {
          // if (isMobileNavOpen) setIsMobileNavOpen(false);
          />
        </div>
      </div>
    </div>
  );
}

export function SocialIcons() {
  return (
    <div className="social_icons flex-row hidden">
      <a
        href="https://twitter.com/skaraudio_?lang=en"
        title="Skar Audio on Twitter"
        rel="me noreferrer"
        target="_blank"
        className="fa fa-twitter px-4 hover:text-white"
      >
        &nbsp;
      </a>
      <a
        href="https://www.facebook.com/SkarAudio"
        title="Skar Audio on Facebook"
        rel="me"
        target="_blank"
        className="fa fa-facebook px-4 hover:text-white"
      >
        &nbsp;
      </a>
      <a
        href="https://www.youtube.com/user/skaraudio"
        title="Skar Audio on YouTube"
        rel="me"
        target="_blank"
        className="fa fa-youtube px-4 hover:text-white"
      >
        &nbsp;
      </a>
      <a
        href="https://www.instagram.com/skaraudioofficial"
        title="Skar Audio on Instagram"
        rel="me"
        target="_blank"
        className="fa fa-instagram px-4 hover:text-white"
      >
        &nbsp;
      </a>
      <a
        href="mailto:support@skaraudio.com"
        title="Email Skar Audio"
        className="fa fa-envelope-o px-4 hover:text-white"
      >
        &nbsp;
      </a>
    </div>
  );
}
