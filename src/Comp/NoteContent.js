const NoteContent = ({ note, setNote }) => {
  return (
    <div className="note-content my-4">
      <label htmlFor="price" className="block text-base w-1/4 text-gray-700">
        Note content
      </label>
      <input
        type="text"
        name="noteContent"
        id="noteContent"
        className="block w-1/4 rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 text-base "
        placeholder="Note Description"
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
        }}
      />
    </div>
  );
};

export default NoteContent;
