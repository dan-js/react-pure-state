import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import createHook from "../createHook";
import { StateProvider } from "../../";

const NamePrinterFactory = (useName) => () => {
    const [name, setName] = useName();

    return (
        <div>
            <header>From {name}</header>
            <button onClick={() => setName("Jake")}>Update</button>
        </div>
    );
};

describe("createHook", () => {
    it("creates a hook that can read data from the store", () => {
        const useName = createHook((state) => state.user, "name");

        const NamePrinter = NamePrinterFactory(useName);

        const { baseElement } = render(
            <StateProvider initialState={{ user: { name: "Dan" } }}>
                <NamePrinter />
            </StateProvider>
        );

        expect(baseElement).toHaveTextContent("From Dan");
    });

    it("creates a hook that can update data from the store", async () => {
        const useName = createHook((state) => state.user, "name");

        const NamePrinter = NamePrinterFactory(useName);

        const { baseElement } = render(
            <StateProvider initialState={{ user: { name: "Dan" } }}>
                <NamePrinter />
            </StateProvider>
        );

        fireEvent.click(await screen.findByText("Update"));

        expect(baseElement).toHaveTextContent("From Jake");
    });
});
