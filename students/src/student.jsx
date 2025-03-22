import "./assets/student.css";
import { PostsDisplay } from "./Post";

import NavBAR from "./compontets/navBar";

const student = () => {
    
   

    return (
        <div className="home-container">
            <NavBAR/>

            <main className="content">
                <PostsDisplay />
            </main>

        </div>
    );
};

export default student;
