import React from 'react';
import Trailers from './Trailers';


function HomePage(props: any) {

    const renderTrailers = () => {
        return <Trailers/>;
    }

    return (
        <div className="home-page">
            <div className="trailers">
                {renderTrailers()}
            </div>
            This is Homepage
        </div>
    );
}

export default HomePage;