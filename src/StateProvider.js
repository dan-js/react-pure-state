import React from "react";
import pt from "prop-types";

import StateContext from "./StateContext";
import proxifyRecursive from "./util/proxifyRecursive";
import ProxyListener from "./util/ProxyListener";

const getProxyHandler = (listener) => ({
    set: function (obj, prop, value) {
        const currentValue = obj[prop];

        obj[prop] = value;

        const shouldUpdate = listener.emit({ obj, prop, value });

        if (!shouldUpdate) {
            obj[prop] = currentValue;
        }

        return true;
    },
});

const StateProvider = ({ initialState, middleware, children }) => {
    const listener = new ProxyListener();

    if (middleware.length) {
        middleware.forEach((mw) => listener.addListener(mw));
    }

    const proxiedState = proxifyRecursive(
        initialState,
        getProxyHandler(listener)
    );

    return (
        <StateContext.Provider value={{ state: proxiedState, listener }}>
            {children}
        </StateContext.Provider>
    );
};

StateProvider.propTypes = {
    initialState: pt.object.isRequired,
    children: pt.node.isRequired,
    middleware: pt.arrayOf(pt.func),
};

StateProvider.defaultProps = {
    middleware: [],
};

export default StateProvider;
