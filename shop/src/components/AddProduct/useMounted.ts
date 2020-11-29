import { useEffect, useRef } from "react";

export const useMonted = () => {
    const isMounted = useRef(true);

    useEffect(
        () => () => {
            isMounted.current = false;
        },
        []
    );

    return isMounted;
};
