import { useState, useEffect, useContext } from "react";

import StateContext from "../StateContext";
import stringify from "../util/stringify";

const defaultSelector = (state) => state;

export default (selector = defaultSelector) => {
    const { state, listener } = useContext(StateContext);

    const selectedState = selector(state);

    const [lastStringValue, setLastStringValue] = useState(
        stringify(selectedState)
    );

    useEffect(() => {
        const handler = () => {
            const stringifiedMemo = stringify(selectedState);

            if (lastStringValue !== stringifiedMemo) {
                setLastStringValue(stringifiedMemo);
            }

            return true;
        };

        listener.addListener(handler);

        return () => listener.removeListener(handler);
    }, []);

    return selectedState;
};
