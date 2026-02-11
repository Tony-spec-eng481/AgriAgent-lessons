import PixelTransition from "./PixelTransition.tsx";

const Usage = () => {
  return (
    <PixelTransition
      firstContent={
        <img
          src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Agriculture backdrop"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      }
      secondContent={
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            backgroundColor: "#0f2da3ff",
          }}
        >
          <div style={{ textAlign: "center", padding: "0.2rem" }}>
            <img
              src="https://cdn.pixabay.com/photo/2021/04/22/06/40/duck-6198196_960_720.jpg"
              alt="Agriculture backdrop"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      }
      gridSize={10}
      pixelColor="#ffffff"
      once={false}
      animationStepDuration={0.4}
      className="hero-pixel-transition"
      aspectRatio="100%"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default Usage;
