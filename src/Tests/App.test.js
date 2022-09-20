import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "fake-indexeddb/auto";
import App from "../App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

afterAll(cleanup);

const testData = [
  {
    id: 1,
    desc: "test title 1 ",
    note: "test content 1",
    tags: "work, p1",
  },
  {
    id: 2,
    desc: "test title 2",
    note: "test content 2",
    tags: "work, p2",
  },
];

describe("test note app renders", () => {
  afterEach(cleanup);
  it("should render the header", () => {
    render(<App />);
    const mainTitle = screen.getByText(/Note App/i);
    expect(mainTitle).toBeInTheDocument();
  });
  it("should render add note component", () => {
    render(<App />);
    const mainDesc = screen.getByLabelText(/Note Desc/i);
    const mainNote = screen.getByLabelText(/Note note/i);
    const mainTags = screen.getByLabelText(/Note tags/i);
    expect(mainDesc).toBeInTheDocument();
    expect(mainNote).toBeInTheDocument();
    expect(mainTags).toBeInTheDocument();
  });
  it("should render the list component with no notes", () => {
    render(<App />);
    const mainNotes = screen.getByTestId("no-notes");
    expect(mainNotes).toBeInTheDocument();
  });
  it("should render the list component", () => {
    render(<App testData={testData} />);
    const mainNotes = screen.getByTestId("main-notes");
    expect(mainNotes).toBeInTheDocument();
  });
  it("should render the list component with notes", () => {
    render(<App testData={testData} />);
    const allNotetitles = screen.getAllByText(/test title/i);
    expect(allNotetitles).toHaveLength(2);
  });
  //May be a view port issue observer. react-intersection-observer
  // it("should render the edit modal", () => {
  //   render(<App testData={testData} />);
  //   const editButton = screen.getAllByRole("button", { name: /Edit/i });
  //   expect(editButton).toHaveLength(2);
  //   fireEvent.click(editButton[0]);
  //   const editModal = screen.getByTestId("edit-modal");
  //   expect(editModal).toBeInTheDocument();
  // });
});

describe("test the app can do crud functions", () => {
  afterEach(cleanup);
  it("It should read a note", () => {
    render(<App testData={testData} />);
    const allNotesTitle = screen.getAllByText(/test title/i);
    const allNotesContent = screen.getAllByText(/test content/i);
    expect(allNotesTitle).toHaveLength(2);
    expect(allNotesContent).toHaveLength(2);
  });
  it("It should add a note", () => {
    render(<App testData={testData} />);

    const desc = screen.getByPlaceholderText("Note desc");
    const note = screen.getByPlaceholderText("Note note");
    const tag = screen.getByPlaceholderText("Note tags");
    const but = screen.getByRole("button", { name: /Add note/i });

    fireEvent.change(desc, { target: { value: "manual test desc 1" } });
    fireEvent.change(note, { target: { value: "manual test note 1" } });
    fireEvent.change(tag, { target: { value: "manual test, tag1" } });

    expect(desc.value).toBe("manual test desc 1");
    expect(note.value).toBe("manual test note 1");
    expect(tag.value).toBe("manual test, tag1");

    fireEvent.click(but);
    expect(screen.getByText(/manual test desc 1/i)).toBeInTheDocument();
    expect(screen.getByText(/manual test note 1/i)).toBeInTheDocument();
  });
  //react-intersection-observer
  it("It should edit a note", () => {
    render(<App testData={testData} />);
  });
  it("It should delete a note", () => {
    render(<App testData={testData} />);
    const allNotesTitle = screen.getAllByText(/test title/i);
    const allNotesContent = screen.getAllByText(/test content/i);
    const deleteButton = screen.getAllByRole("button", { name: /Delete/i });
    expect(allNotesTitle).toHaveLength(2);
    expect(allNotesContent).toHaveLength(2);
    expect(allNotesContent).toHaveLength(2);
    fireEvent.click(deleteButton[0]);
    expect(screen.queryByText(/test title 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/test content 1/i)).not.toBeInTheDocument();
  });
});
