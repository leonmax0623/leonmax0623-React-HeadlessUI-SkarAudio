export default function SearchBar() {
  function callback($evt) {
    if ($evt.key === 'Enter') {
      console.log($evt.target.value);
      document.location.href = '/search/' + $evt.target.value;
    }
  }

  return (
    <div className={''}>
      <input
        className="px-1 py-0.5 text-sm bg-gray-500 text-white"
        type="text"
        onKeyDown={callback.bind(this)}
        placeholder={'Search'}
      />
    </div>
  );
}
