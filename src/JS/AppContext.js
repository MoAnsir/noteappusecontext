import React from "react";

export const initialData = {
  id: 0,
  desc: "test",
  note: "test",
  tags: "test",
};

export const AppContext = React.createContext(initialData);
