import {NextPage} from "next";
import {usePageLeave} from "@mantine/hooks";
import {useState} from "react";

const Settings: NextPage = () => {
    const audio = new Audio("http://wolo-usa.com/365c-stereo.wav");
    const [leftsCount, setLeftsCount] = useState(0);
    function handlePageLeave() {
        audio.play().then();
        setLeftsCount((p)=>p+1)
    }

    usePageLeave(() => handlePageLeave());

    return (
        <div>
            <h1>Nastavení</h1>
            {leftsCount}
        </div>
    )
}

export default Settings