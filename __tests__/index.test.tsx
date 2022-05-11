import { render, screen } from "@testing-library/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Home from "#pages/index";

describe("Home", () => {
  it("renders a heading", async () => {
    const locale = "en";
    const localeInfo = { defaultLocale: "en", locale };
    const localization = await serverSideTranslations(locale, [
      "layout",
      "components",
      "common",
    ]);
    const props = {
      ...localization,
      localeInfo,
    };

    render(<Home {...props} />);

    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
