import React from "react";
import { render } from "@testing-library/react";

import { StateProvider, useRps } from "..";

const StatePrinter = () => {
    const state = useRps();

    return <>{JSON.stringify(state)}</>;
};

describe("Reading data from the store", () => {
    it("reads initial state correctly", () => {
        const { baseElement } = render(
            <StateProvider initialState={{ name: "dan" }}>
                <StatePrinter />
            </StateProvider>
        );

        expect(baseElement).toHaveTextContent('{"name":"dan"}');
    });

    it("reads nested initial state correctly", () => {
        const { baseElement } = render(
            <StateProvider
                initialState={{ name: "dan", friends: ["val", "tommy"] }}
            >
                <StatePrinter />
            </StateProvider>
        );

        expect(baseElement).toHaveTextContent(
            '{"name":"dan","friends":["val","tommy"]}'
        );
    });
});
