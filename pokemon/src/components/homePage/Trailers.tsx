import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ReactPlayer from 'react-player';

import _ from 'lodash';
import './styles/trailer.scss';
import { Typography } from 'antd';

const { Title } = Typography;

function Trailers(props: any) {

    const YoutubeSlide = ({ url, isSelected }: { url: string; isSelected?: boolean }) => (
        <ReactPlayer width="100%" url={url} playing={isSelected} />
    );

    const renderCarousel = () => {
        const customRenderItem = (item, props) => <item.type {...item.props} {...props} />;

        const validateYouTubeUrl = (url: string) => {
            try {

                if (url != undefined || url != '') {
                    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\\&v=|\?v=)([^#\\&\\?]*).*/;
                    const match = url.match(regExp);
                    if (match && match[2].length == 11) {
                        const urlCustom = 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0&enablejsapi=1';
                        return urlCustom;

                    } else {
                        return "";
                    }
                }
            } catch (error) {
                console.log('error: ', error);
            }
        };


        const youtubeArr = [
            "https://youtu.be/D0zYJ1RQ-fs",
            "https://youtu.be/1roy4o4tqQM",
            "https://youtu.be/bILE5BEyhdo",
            "https://youtu.be/uBYORdr_TY8",
        ];

        return (
            <Carousel renderItem={customRenderItem} >
                {
                    _.map(youtubeArr, (item) => {
                        return <YoutubeSlide key="youtube-2" url={validateYouTubeUrl(item) || ""} />
                    })
                }
            </Carousel>
        );

    }

    return (
        <div className="trailer-box">
            <Title level={3}>Trailers</Title>
            {renderCarousel()}
        </div>
    );
}

export default Trailers;