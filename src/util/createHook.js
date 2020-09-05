import useRps from "../hooks/useRps";

const createHook = (selector, key) => () => {
    const state = useRps(selector);

    const set = (val) => (state[key] = val);

    return [state[key], set];
};

export default createHook;
