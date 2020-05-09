import React, { useState, useEffect } from 'react';
import Layout from "./Layout";
import Card from "./Card";


const Shop = () => {
    return (
        <Layout title="Shop Page" description="Search and explore some diary designs" className="container-fluid">
            <div className="row">
                <div className="col-4">left section</div>

                <div className="col-8">right section</div>
            </div>
        </Layout>
    );
}


export default Shop;