import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "fake-indexeddb/auto";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";
import App from "../App";

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
  it("Should render the header", () => {
    render(<App />);
    const mainTitle = screen.getByText(/Note App/i);
    expect(mainTitle).toBeInTheDocument();
  });
  it("Should render add note component", () => {
    render(<App />);
    const mainDesc = screen.getByLabelText(/Note Desc/i);
    const mainNote = screen.getByLabelText(/Note note/i);
    const mainTags = screen.getByLabelText(/Note tags/i);
    expect(mainDesc).toBeInTheDocument();
    expect(mainNote).toBeInTheDocument();
    expect(mainTags).toBeInTheDocument();
  });
  it("Should render the list component with no notes", () => {
    render(<App />);
    const mainNotes = screen.getByTestId("no-notes");
    expect(mainNotes).toBeInTheDocument();
  });
  it("Should render the list component", () => {
    render(<App testData={testData} />);
    const mainNotes = screen.getByTestId("main-notes");
    expect(mainNotes).toBeInTheDocument();
  });
  it("Should render the list component with notes", () => {
    render(<App testData={testData} />);
    const allNotetitles = screen.getAllByText(/test title/i);
    expect(allNotetitles).toHaveLength(2);
  });
  //May be a view port issue observer. react-intersection-observer
  it("Should render the edit modal", () => {
    render(<App testData={testData} />);
    const editButton = screen.getAllByRole("button", { name: /Edit/i });
    expect(editButton).toHaveLength(2);
    mockAllIsIntersecting(true);
    fireEvent.click(editButton[0]);
    const editModal = screen.getByTestId("edit-modal");
    expect(editModal).toBeInTheDocument();
  });
});

describe("test the app can do crud functions", () => {
  afterEach(cleanup);
  it("Should read a note", () => {
    render(<App testData={testData} />);
    const allNotesTitle = screen.getAllByText(/test title/i);
    const allNotesContent = screen.getAllByText(/test content/i);
    expect(allNotesTitle).toHaveLength(2);
    expect(allNotesContent).toHaveLength(2);
  });
  it("Should add a note", () => {
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
  it("Should edit a note", () => {
    render(<App testData={testData} />);
    const editButton = screen.getAllByRole("button", { name: /Edit/i });
    expect(editButton).toHaveLength(2);
    mockAllIsIntersecting(true);
    fireEvent.click(editButton[0]);
    const editModal = screen.getByTestId("edit-modal");
    expect(editModal).toBeInTheDocument();

    const desc = screen.getAllByPlaceholderText("Note desc");
    const note = screen.getAllByPlaceholderText("Note note");
    const tag = screen.getAllByPlaceholderText("Note tags");
    const but = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(desc[1], { target: { value: "manual test Edit desc 1" } });
    fireEvent.change(note[1], { target: { value: "manual test Edit note 1" } });
    fireEvent.change(tag[1], { target: { value: "manual test Edit, tag1" } });

    expect(desc[1].value).toBe("manual test Edit desc 1");
    expect(note[1].value).toBe("manual test Edit note 1");
    expect(tag[1].value).toBe("manual test Edit, tag1");

    fireEvent.click(but);
    expect(screen.getByText(/manual test Edit desc 1/i)).toBeInTheDocument();
    expect(screen.getByText(/manual test Edit note 1/i)).toBeInTheDocument();
  });
  it("Should delete a note", () => {
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
  it("should open a note in a modal when clicked", () => {
    render(<App testData={testData} />);
    const allNotesTitle = screen.getAllByText(/test title/i);
    const allNotesContent = screen.getAllByText(/test content/i);
    expect(allNotesTitle).toHaveLength(2);
    expect(allNotesContent).toHaveLength(2);
    fireEvent.click(allNotesContent[0]);
    const showModal = screen.getByTestId("show-modal");
    expect(showModal).toBeInTheDocument();
  });
});
