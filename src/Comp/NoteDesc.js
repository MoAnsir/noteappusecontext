const NoteDesc = ({ desc, setDesc }) => {
  return (
    <div className="note-desc my-4">
      <label htmlFor="price" className="block text-base w-full text-gray-700">
        Note description
      </label>
      <input
        type="text"
        name="noteDesc"
        id="noteDesc"
        className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 text-base "
        placeholder="Note Description"
        value={desc}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
      />
    </div>
  );
};

export default NoteDesc;
