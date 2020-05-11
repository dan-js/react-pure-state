import { useEffect } from "react";

import stringify from "../util/stringify";

export default (fn, deps = []) =>
    useEffect(
        fn,
        deps.map((d) => stringify(d))
    );
