import React, { forwardRef, useEffect, useRef } from "react";

const CheckboxTable = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolveRef = ref || defaultRef;

    useEffect(() => {
        resolveRef.current.indeterminate = indeterminate;
    }, [resolveRef, indeterminate])

    return (
        <>
            <input type="checkbox" ref={resolveRef} {...rest} />
        </>
    )

})

export default CheckboxTable;

