/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/header";
import "./viewflower.scss";
import RelatedProductsSwiper from "../../ViewProduct/RelatedProductsSwiper/RelatedProductsSwiper";
import axios from "axios";
import { addToCart } from "../../API/cart/cart";

const FlowerPage = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const [quantity, setQuantity] = useState(1); // Sử dụng state để quản lý số lượng
    const [cart, setCart] = useState([]); // Quản lý giỏ hàng
    const [flower, setFlowerDetails] = useState({});


    const getFlowerDetails = async () => {
        try {
            const response = await axios.get(`https://localhost:7198/api/FlowerInfo/${id}`);
            console.log(response.data); // Ensure this logs the correct structure
            return response.data; // Since it's a single object, just return it
        } catch (error) {
            console.error('Error fetching flower detail:', error);
            return null; // Return null on error
        }
    }

    useEffect(() => {
        const fetchFlower = async () => {
            const flowerDetails = await getFlowerDetails(); // Fetch flower details

            if (flowerDetails) {
                setFlowerDetails(flowerDetails); // Set state with the flower details object
            } else {
                console.warn("No flower details found.");
                setFlowerDetails({}); // Set an empty object if no details
            }
            //setLoading(false); // Set loading to false after fetching
        };

        fetchFlower(); // Call the fetch function
    }, [id]);

    useEffect(() => {
        setQuantity(1);
        window.scrollTo(0, 0); // Cuộn lên đầu trang khi vào trang chi tiết
    }, [id]);

    // nhập số lượng
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1) {
            setQuantity(value); // Chỉ cho phép số lượng từ 1 trở lên
        }
    };

    // Hàm để tăng số lượng
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    // Hàm để giảm số lượng (không cho phép giảm xuống dưới 1)
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // // // Xóa localStorage để đảm bảo dữ liệu cũ không còn tồn tại
    // useEffect(() => {
    //     localStorage.removeItem("cart"); // Xóa giỏ hàng cũ khi trang tải lần đầu
    //     const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    //     setCart(existingCart);
    // }, []);


    const openNotification = () => {
        notification.open({
            message: "Notification Cart",
            description:
                "Add to cart successfully! Please check your cart to see the product.",
            icon: <SmileOutlined style={{ color: "#108ee9" }} />,
            duration: 1.5,
        });
    };

    //Hàm thêm sản phẩm vào giỏ hàng
    const handleAddToCart = async () => {
        const productToAdd = { ...flower, quantity: Number(quantity) }; // Thêm thông tin sản phẩm và đảm bảo quantity là số
        try {
            const response = await addToCart(flower.flowerId, quantity);
        } catch (error) {

        }
    };

    return (
        <div>
            <Header />
            <div className="product-container">
                {/* Hình ảnh sản phẩm */}
                <div className="product-image">
                    <img src={flower.imageUrl} alt={flower.flowerName} className="product-img" />
                </div>

                {/* Chi tiết sản phẩm */}
                <div className="product-details">
                    <h1 className="product-title">
                        {flower.flowerName} - {flower.price}
                    </h1>
                    <p className="product-description">{flower.flowerDescription}</p>
                    <p>
                        Available quantity: {flower.availableQuantity}
                    </p>
                    {/* Chọn số lượng */}
                    <div className="quantity-section">
                        <button className="quantity-btn" onClick={decreaseQuantity}>
                            -
                        </button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            min="1" // Đảm bảo giá trị không nhỏ hơn 1
                            className="quantity-input"
                        />
                        <button className="quantity-btn" onClick={increaseQuantity}>
                            +
                        </button>
                    </div>

                    {/* Nút Thêm vào giỏ hàng */}
                    <button className="add-to-basket-btn" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
            <RelatedProductsSwiper
                currentFlowerId={flower.flowerId}
                currentCategoryId={flower.categoryId}
            />
        </div>
    );
};

export default FlowerPage;
