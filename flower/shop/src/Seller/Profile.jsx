import { useState, useEffect } from 'react';
import { notification, DatePicker } from 'antd'; // Import DatePicker từ Ant Design
import moment from 'moment'; // Import moment để xử lý giá trị của DatePicker
import './Profile.scss';

const Profile = () => {
  const [sellerInfo, setSellerInfo] = useState({
    id: '',
    name: '',
    email: '',
    address: '',
    sellerType: 'individual',
    shopName: '',
    sex: 'male', 
    birth: '', 
    createdAt: '',
    updatedAt: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  // Hàm hiển thị notification khi cập nhật thành công
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Profile Updated Successfully',
      description: 'Your profile information has been successfully updated.',
    });
  };

  useEffect(() => {
    const storedData = localStorage.getItem('sellerProfile');
    if (storedData) {
      setSellerInfo(JSON.parse(storedData));
    } else {
      setSellerInfo({
        id: 'S001',
        name: 'John Doe',
        email: 'john@example.com',
        address: '123 Main St, Springfield',
        sellerType: 'individual',
        shopName: 'John’s Flower Shop',
        sex: 'male', 
        birth: '1990-01-01',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSellerInfo({
      ...sellerInfo,
      [name]: value,
    });
  };

  // Hàm xử lý khi thay đổi ngày sinh và các trường khác liên quan đến ngày
  const handleDateChange = (date, dateString, field) => {
    setSellerInfo({
      ...sellerInfo,
      [field]: dateString, // Lưu giá trị chuỗi ngày vào state
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('sellerProfile', JSON.stringify(sellerInfo));
    setIsEditing(false); // Quay lại chế độ xem thông tin
    openNotificationWithIcon('success'); // Hiển thị notification khi cập nhật thành công
  };

  return (
    <div className="profile-container">
      <div className="profile-inner">
        <h1 className="profile-title">Seller Profile</h1>
        {isEditing ? (
          <form className="profile-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label className="form-label">ID</label>
              <input
                type="text"
                name="id"
                value={sellerInfo.id}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={sellerInfo.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={sellerInfo.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                value={sellerInfo.address}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            {/* Seller Type */}
            <div className="form-group">
              <label className="form-label">Seller Type</label>
              <select
                name="sellerType"
                value={sellerInfo.sellerType}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="individual">Individual</option>
                <option value="business">Business</option>
              </select>
            </div>

            {/* Shop Name */}
            <div className="form-group">
              <label className="form-label">Shop Name</label>
              <input
                type="text"
                name="shopName"
                value={sellerInfo.shopName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            {/* Sex */}
            <div className="form-group">
              <label className="form-label">Sex</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="male"
                    checked={sellerInfo.sex === 'male'}
                    onChange={handleInputChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="female"
                    checked={sellerInfo.sex === 'female'}
                    onChange={handleInputChange}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="other"
                    checked={sellerInfo.sex === 'other'}
                    onChange={handleInputChange}
                  />
                  Other
                </label>
              </div>
            </div>

            {/* Birth (Date Picker) */}
            <div className="form-group">
              <label className="form-label">Birth</label>
              <DatePicker
                value={sellerInfo.birth ? moment(sellerInfo.birth) : null}
                onChange={(date, dateString) => handleDateChange(date, dateString, 'birth')}
                className="form-input"
              />
            </div>

            {/* Created At (Date Picker) */}
            <div className="form-group">
              <label className="form-label">Created At</label>
              <DatePicker
                value={sellerInfo.createdAt ? moment(sellerInfo.createdAt) : null}
                onChange={(date, dateString) => handleDateChange(date, dateString, 'createdAt')}
                className="form-input"
              />
            </div>

            {/* Updated At (Date Picker) */}
            <div className="form-group">
              <label className="form-label">Updated At</label>
              <DatePicker
                value={sellerInfo.updatedAt ? moment(sellerInfo.updatedAt) : null}
                onChange={(date, dateString) => handleDateChange(date, dateString, 'updatedAt')}
                className="form-input"
              />
            </div>

            <button type="submit" className="profile-button">Save</button>
          </form>
        ) : (
          <div className="profile-info">
            <p><strong>ID:</strong> {sellerInfo.id}</p>
            <hr />
            <p><strong>Name:</strong> {sellerInfo.name}</p>
            <hr />
            <p><strong>Sex:</strong> {sellerInfo.sex === 'male' ? 'Male' : sellerInfo.sex === 'female' ? 'Female' : 'Other'}</p>
            <hr />
            <p><strong>Birth:</strong> {sellerInfo.birth}</p>
            <hr />
            <p><strong>Email:</strong> {sellerInfo.email}</p>
            <hr />
            <p><strong>Address:</strong> {sellerInfo.address}</p>
            <hr />
            <p><strong>Seller Type:</strong> {sellerInfo.sellerType === 'individual' ? 'Individual' : 'Business'}</p>
            <hr />
            <p><strong>Shop Name:</strong> {sellerInfo.shopName}</p>
            <hr />
            <p><strong>Created At:</strong> {sellerInfo.createdAt}</p>
            <hr />
            <p><strong>Updated At:</strong> {sellerInfo.updatedAt}</p>
            <button onClick={() => setIsEditing(true)} className="profile-button">Update Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
