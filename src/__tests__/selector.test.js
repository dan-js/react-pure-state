import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { StateProvider, useRps } from "..";

const renderFn = jest.fn();

const NamePrinter = () => {
    const { first, last } = useRps((state) => state.name);

    renderFn();

    return (
        <div>
            Hello my name is {first} {last}
        </div>
    );
};

const AgeUpdater = () => {
    const state = useRps();

    return (
        <button
            onClick={() => {
                state.age = 24;
            }}
        >
            Update ({state.age})
        </button>
    );
};

describe("Selecting data from the store", () => {
    it("selects data correctly and does not rerender with unrelated updates", async () => {
        const { baseElement, findByText } = render(
            <StateProvider
                initialState={{ name: { first: "dan", last: "nash" }, age: 22 }}
            >
                <NamePrinter />
                <AgeUpdater />
            </StateProvider>
        );

        expect(baseElement).toHaveTextContent("Hello my name is dan nash");
        expect(renderFn).toBeCalledTimes(1);

        fireEvent.click(await findByText("Update (22)"));

        expect(renderFn).toBeCalledTimes(1);
        expect(baseElement).toHaveTextContent("Update (24)");
    });
});
