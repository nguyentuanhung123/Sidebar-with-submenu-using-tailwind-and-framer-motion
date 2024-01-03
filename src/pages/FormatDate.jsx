import axios from "axios";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const FormatDate = () => {
    const [staffs, setStaffs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadData = async () => {
        try {
            const response = await axios.get("http://localhost:3006/staff");
            setStaffs(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            loadData();
            setIsLoading(false);
        }, 3000)
    }, []);

    const formatDate = (dateString) => {
        const parsedDate = new Date(dateString);
        return format(parsedDate, "dd/MM/yyyy");
    };

    return (
        <>
            <h1>FormatDate</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {staffs.map((staff) => (
                        <div key={staff.id}>
                            <p>{staff.id}</p>
                            <p>{staff.first_name}</p>
                            <p>{staff.last_name}</p>
                            <p>{formatDate(staff.date_of_birth)}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default FormatDate;