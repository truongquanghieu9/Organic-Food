import React, { Component, Fragment } from 'react';

import Portfolio from 'components/Shop/Portfolio';

const portItems = [
    {
        id: 1,
        src: "/img/blog-1-380x300.jpg",
        class: "all design sports",
        name: "blog-1"
    },
    {
        id: 2,
        src: "/img/blog-2-380x300.jpg",
        class: "all fashion sports",
        name: "blog-2"
    },
    {
        id: 3,
        src: "/img/blog-3-380x300.jpg",
        class: "all design graphics",
        name: "blog-3"
    },
    {
        id: 4,
        src: "/img/blog-4-380x300.jpg",
        class: "all design graphics",
        name: "blog-6"
    },
    {
        id: 5,
        src: "/img/blog-5-380x300.jpg",
        class: "all fashion sports",
        name: "blog-5"
    },
    {
        id: 6,
        src: "/img/blog-6-380x300.jpg",
        class: "all design sports",
        name: "blog-6"
    },
    {
        id: 7,
        src: "/img/blog-7-380x300.jpg",
        class: "all fashion graphics",
        name: "blog-7"
    },
    {
        id: 8,
        src: "/img/blog-8-380x300.jpg",
        class: "all graphics photography",
        name: "blog-8"
    },
    {
        id: 9,
        src: "/img/blog-1-380x300.jpg",
        class: "all fashion photography",
        name: "blog-9"
    },

];

class PortfolioContainer extends Component {
    showportItems = (portItems) => {
        let result = null;
        if (portItems.length > 0) {
            result = portItems.map((item, index) => {
                return <Portfolio item={item} key={index} index={index}></Portfolio>
            });
        }
        return result;
    }

    render() {
        return (
            <Fragment>

                <Portfolio
                    portItems={portItems}
                />

            </Fragment>
        );
    }
}

export default PortfolioContainer;
