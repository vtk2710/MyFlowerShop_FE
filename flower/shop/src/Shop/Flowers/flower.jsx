import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Row, Col, Card } from 'antd';
import Header from '../../components/Header/header';
import './flower.scss';
import axios from 'axios';

function Flowers() {
    const { id } = useParams()
    const [flowerList, setFlowerList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getListFlower = async () => {
        try {
            const response = await axios.get(`https://localhost:7198/api/Category/${id}/flowers`);

            // Check if response.data is an array and has elements
            if (Array.isArray(response.data) && response.data.length > 0) {
                return response.data; // Directly return the flower list
            } else {
                return []; // Return an empty array if no flowers found
            }
        } catch (error) {
            console.error('Error fetching flower list:', error);
            return []; // Return an empty array on error
        }
    };

    useEffect(() => {
        const fetchFlowers = async () => {
            setLoading(true); // Set loading to true before fetching
            const flowers = await getListFlower(); // Fetch the flower list
            setFlowerList(flowers); // Update state with the fetched flowers
            setLoading(false); // Set loading to false after fetching
        };

        fetchFlowers(); // Call the fetch function
    }, [id]); // Empty dependency array means this runs once on mount

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while fetching
    }


    // const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    const handleOpen = (flower) => {
        // Điều hướng sang trang chi tiết sản phẩm
        navigate(`/viewflower/${flower.flowerId}`);
    };

    return (
        <>
            <Header />
            <div className="row HomePage__body">
                {flowerList.map((flower) => (
                    <div className="product-card" key={flower.flowerId}>
                        <img src={flower.imageUrl} alt={flower.flowerName} />
                        <br />
                        <h3>{flower.flowerName}</h3>
                        <br />
                        <Button
                            type="primary" // Sử dụng kiểu "primary"
                            onClick={() => handleOpen(flower)} // Điều hướng sang trang chi tiết sản phẩm
                            style={{ marginTop: "10px" }}
                        >
                            View Details
                        </Button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Flowers;
