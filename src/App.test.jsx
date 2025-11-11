import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "./App.jsx";
import { ContextProvider } from "./common/context/ContextApi.jsx";
import CookieConsent from "./common/components/CookieConsent.jsx";

test("renders HomePage at root path", () => {
  render(
    <ContextProvider>
      <MemoryRouter initialEntries={["/"]}>
        <App />
        <CookieConsent />
      </MemoryRouter>
    </ContextProvider>,
  );

  // Assert that the text exists
  expect(screen.getByText(/Anime Pillow!/i)).toBeInTheDocument();
});
