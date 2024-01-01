import { useEffect, useMemo, useState } from "react";

const expensiveFunction = (number) => {

    console.log('Bắt đầu');

    const start = new Date();

    //đợi ở đây 3 giây
    while (new Date - start < 3000);

    console.log('Kết thúc', new Date - start, ' ms');

    return number * number;
}

const Settings = () => {

    const [count, setCount] = useState(0);

    const [num, setNum] = useState(20);

    useEffect(() => {
        setTimeout(() => {
            setNum(30)
        }, 2000)
    }, [])

    const number = useMemo(() => {
        return expensiveFunction(num);
    }, [num])


    return (
        <>
            <h1>Settings</h1>
            <p>{count}</p>
            <button onClick={() => setCount((prevCount) => prevCount + 1)}>Click</button>
            <p>{num}</p>
            <p>{number}</p>
        </>
    )
};

export default Settings;