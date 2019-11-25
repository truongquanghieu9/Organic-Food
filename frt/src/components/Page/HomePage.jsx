import React from 'react';

import ShopLayout from "contains/Layout/ShopLayout";

import ProductsContainer from 'contains/Shop/ProductsContainer';
import DealContainer from 'contains/Shop/DealContainer';
import OurProductsContainer from 'contains/Shop/OurProductsContainer';

import Introduce from 'components/Shop/Introduce';
import Banner from 'components/Shop/Banner';
import Testimonial from 'components/Shop/Testimonial';
import OurBlog from 'components/Shop/OurBlog';
import Brand from 'components/Shop/Brand';

function Home() {
    return (
        <ShopLayout >
                <Introduce />

            <ProductsContainer />

                <Banner />

            <DealContainer />

            <OurProductsContainer />

                <Testimonial />

                <OurBlog />

                <Brand />

        </ShopLayout>
    );
}

export default Home;
