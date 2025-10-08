import React from "react";
import { Appearance } from "react-native";

export const ThemeContext = React.createContext({ theme: "light", toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
const [theme, setTheme] = React.useState(Appearance.getColorScheme() || "light");

React.useEffect(() => {
const sub = Appearance.addChangeListener(({ colorScheme }) => {
if (colorScheme) setTheme(colorScheme);
});
return () => sub.remove();
}, []);

function toggle() {
setTheme((t) => (t === "light" ? "dark" : "light"));
}

return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

