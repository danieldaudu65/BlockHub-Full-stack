import Downbar from "../../../components/Downbar";
import Top_Oppurtunities from "../components/Top_Oppurtunities";
import Nav from "../components/Nav";

export default function Top_opp() {
    return (
        <>
            <div className=" mb-16">
                <Nav />
                <Top_Oppurtunities />
            </div>
            <Downbar />
        </>
    );
}