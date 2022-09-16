import React from "react";

export const initialData = {
  id: 0,
  description: "test",
  content: "test",
  tags: "test",
};

export const AppContext = React.createContext(initialData);
