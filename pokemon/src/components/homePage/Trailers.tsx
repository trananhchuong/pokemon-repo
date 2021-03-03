import React from 'react';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import ReactPlayer from 'react-player';

import _ from 'lodash';
import './styles/trailer.scss';
import { Typography } from 'antd';

const { Title } = Typography;

function Trailers(props: any) {

    const YoutubeSlide = ({ url, isSelected }: { url: string; isSelected?: boolean }) => (
        <ReactPlayer url={url} playing={isSelected} />
    );

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };


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
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                infinite={true}
                // autoPlay={true}
                transitionDuration={1500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {
                    _.map(youtubeArr, (item, key) => {
                        return <YoutubeSlide key={key} url={validateYouTubeUrl(item) || ""} />;
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