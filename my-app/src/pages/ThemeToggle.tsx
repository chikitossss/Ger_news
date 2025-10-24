import React, { useState, useEffect } from "react";

const ThemeToggle: React.FC = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.className = dark ? "dark-theme" : "light-theme";
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)}>
      {dark ? "Светлая тема" : "Темная тема"}
    </button>
  );
};

export default ThemeToggle;
