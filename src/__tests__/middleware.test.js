import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { StateProvider, useRps } from "..";

describe("Middleware", () => {
    it("cancells updates correctly", async () => {
        const nameMiddleware = ({ prop, value }) => {
            return prop !== "name" || value === "dan" || value === "val";
        };

        const renderFn = jest.fn();

        const InvalidUpdater = () => {
            const state = useRps();

            renderFn(state.name);

            return (
                <>
                    <button
                        onClick={() => {
                            state.name = "val";
                        }}
                    >
                        val
                    </button>
                    <button
                        onClick={() => {
                            state.name = "jake";
                        }}
                    >
                        jake
                    </button>
                </>
            );
        };

        const { findByText } = render(
            <StateProvider
                initialState={{ name: "dan" }}
                middleware={[nameMiddleware]}
            >
                <InvalidUpdater />
            </StateProvider>
        );

        fireEvent.click(await findByText("jake"));

        expect(renderFn).toBeCalledTimes(1);
        expect(renderFn).toBeCalledWith("dan");

        fireEvent.click(await findByText("val"));

        expect(renderFn).toBeCalledTimes(2);
        expect(renderFn).toBeCalledWith("val");
    });
});
