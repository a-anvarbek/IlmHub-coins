import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getItemAsync, postItemAsync, selectRewardItem } from "../../redux/rewardItemSlice";

const ShopTab = ({ user, t }) => {
  const dispatch = useDispatch();
  const rewardItemList = useSelector(selectRewardItem).rewardItemList;

  const [modalItem, setModalItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getItemAsync());
  }, [dispatch]);

  const openModal = (item) => {
    setModalItem(item);
    setQuantity(1);
  };

  const handleConfirm = () => {
    if (modalItem) {
      dispatch(postItemAsync({ rewardItemId: modalItem.id, quantity }));
      setModalItem(null);
    }
  };

  const handleCancel = () => {
    setModalItem(null);
  };

  const canAfford = (item) => user?.coins >= item.cost;

  return (
    <div>
      <Alert
        message={
          <span>
            {t("Your coin balance")}: <b>{user?.coins ?? 0}</b>
          </span>
        }
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Row gutter={[16, 16]}>
        {rewardItemList.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
            <Card
              title={item.title}
              actions={[
                <Button
                  type="primary"
                  disabled={!canAfford(item)}
                  onClick={() => openModal(item)}
                  key="buy"
                >
                  {canAfford(item) ? `Buy for ${item.cost} coins` : "Insufficient Coins"}
                </Button>,
              ]}
            >
              <div>{item.description ?? "No description available"}</div>
              <div style={{ marginTop: 8, fontSize: "small", color: "#888" }}>
                Stock: {item.stock}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {modalItem && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={handleCancel}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: 24,
              borderRadius: 8,
              minWidth: 300,
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{modalItem.title}</h3>
            <p>Enter quantity:</p>
            <input
              type="number"
              min={1}
              max={modalItem.stock}
              value={quantity}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 1 && val <= modalItem.stock) {
                  setQuantity(val);
                } else if (val < 1) {
                  setQuantity(1);
                } else if (val > modalItem.stock) {
                  setQuantity(modalItem.stock);
                }
              }}
              style={{ width: "100%", padding: "8px", fontSize: "16px", boxSizing: "border-box" }}
            />
            <div style={{ marginTop: 16, textAlign: "right" }}>
              <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" onClick={handleConfirm}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopTab;