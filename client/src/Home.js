import React from 'react';
import ResponsiveNavBar from "./ResponsiveNavBar"

function Home(props) {
    return (
        <div>
            <ResponsiveNavBar />
            <div class="bg-cover bg-center grid grid-cols-1 md:grid-cols-2 gap-0 px-5 py-5">
                <img src="/data_analysis.png" alt="image" ></img>
                <img src="/data_analysis.png" alt="image" ></img>
                <img src="/data_analysis.png" alt="image" ></img>
                <img src="/data_analysis.png" alt="image" ></img>
            </div>

        </div>
    );
}

export default Home;