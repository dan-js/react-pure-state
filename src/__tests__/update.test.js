import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { StateProvider, useRps } from "..";

const createStateUpdater = (updateFn) => ({ renderFn }) => {
    const state = useRps();

    renderFn(state);

    return <button onClick={() => updateFn(state)}>Update</button>;
};

const renderUpdateTest = async (initialState, updateFn, updatedState) => {
    const Updater = createStateUpdater(updateFn);

    const renderFn = jest.fn();

    const { findByText } = render(
        <StateProvider initialState={initialState}>
            <Updater renderFn={renderFn} />
        </StateProvider>
    );

    expect(renderFn).toBeCalledTimes(1);
    expect(renderFn).toBeCalledWith(initialState);

    fireEvent.click(await findByText("Update"));

    expect(renderFn).toBeCalledTimes(2);
    expect(renderFn).toBeCalledWith(updatedState);
};

describe("Updating data in the store", () => {
    it("updates basic data", async () => {
        const initialState = { name: "dan" };

        const updateFn = (state) => {
            state.name = "jake";
        };

        const updatedState = { name: "jake" };

        await renderUpdateTest(initialState, updateFn, updatedState);
    });

    it("adds new data", async () => {
        const initialState = { name: "dan" };

        const updateFn = (state) => {
            state.age = 22;
        };

        const updatedState = { name: "dan", age: 22 };

        await renderUpdateTest(initialState, updateFn, updatedState);
    });

    it("updates nested objects", async () => {
        const initialState = {
            name: {
                first: "dan",
                second: "nash",
            },
        };

        const updateFn = (state) => {
            state.name.first = "jake";
        };

        const updatedState = { name: { first: "jake", second: "nash" } };

        await renderUpdateTest(initialState, updateFn, updatedState);
    });

    it("updates arrays", async () => {
        const initialState = { people: ["dan", "val", "tommy"] };

        const updateFn = (state) => {
            state.people[0] = "jake";
        };

        const updatedState = { people: ["jake", "val", "tommy"] };

        await renderUpdateTest(initialState, updateFn, updatedState);
    });

    it("updates arrays with array prototype functions", async () => {
        const initialState = { people: ["dan", "val", "tommy"] };

        const updateFn = (state) => {
            state.people.push("jake");
        };

        const updatedState = { people: ["dan", "val", "tommy", "jake"] };

        await renderUpdateTest(initialState, updateFn, updatedState);
    });
});
