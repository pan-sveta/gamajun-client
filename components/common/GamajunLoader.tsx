import {Center, Loader} from "@mantine/core";


const GamajunLoader = () => {
    return (
        <Center style={{width: "100%", height: "100%"}}>
            <Loader variant={"dots"}/>
        </Center>
    );
}

export default GamajunLoader