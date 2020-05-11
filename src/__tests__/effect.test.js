import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { StateProvider, useRps, useEffectObj } from "..";

describe("Firing side effects when state updates", () => {
    it("fires useEffect when subscribed state changes", async () => {
        const effectFn = jest.fn();

        const UpdatingComponent = () => {
            const state = useRps();

            useEffectObj(() => {
                effectFn(state.name);
            }, [state]);

            return (
                <button
                    onClick={() => {
                        state.name = "jake";
                    }}
                >
                    Update
                </button>
            );
        };

        const { findByText } = render(
            <StateProvider initialState={{ name: "dan" }}>
                <UpdatingComponent />
            </StateProvider>
        );

        expect(effectFn).toBeCalledTimes(1);
        expect(effectFn).toBeCalledWith("dan");

        fireEvent.click(await findByText("Update"));

        expect(effectFn).toBeCalledTimes(2);
        expect(effectFn).toBeCalledWith("jake");
    });
});
