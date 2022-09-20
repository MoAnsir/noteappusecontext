const InputGroup = ({ state, setState, field }) => {
  return (
    <div className={`note-${field} my-4 mx-2`}>
      <label
        htmlFor="price"
        className="block text-base w-full text-gray-700 mb-2"
      >
        Note {field}
      </label>
      <input
        type="text"
        name={`note${field}`}
        id={`note${field}`}
        className="block shadow-inner w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 text-base"
        placeholder={`Note ${field}`}
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
    </div>
  );
};

export default InputGroup;
