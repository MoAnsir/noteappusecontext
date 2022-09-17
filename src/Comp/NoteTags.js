const NoteTags = ({ tags, setTags }) => {
  return (
    <div className="note-tag my-4">
      <label htmlFor="price" className="block text-base w-1/4 text-gray-700">
        Note Tag
      </label>
      <input
        type="text"
        name="noteTag"
        id="noteTag"
        className="block w-1/4 rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 text-base "
        placeholder="Note Description"
        value={tags}
        onChange={(e) => {
          setTags(e.target.value);
        }}
      />
    </div>
  );
};

export default NoteTags;
