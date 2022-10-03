import OpenedExams from "../../components/exams/OpenedExams";
import MyDraftSubmissions from "../../components/submissions/MyDraftSubmissions";
import MySubmissions from "../../components/submissions/MySubmittedSubmissions";

const MyExams = () => {

    return (
        <div>
            <OpenedExams/>
            <MyDraftSubmissions/>
            <MySubmissions/>
        </div>
    );
}

export default MyExams