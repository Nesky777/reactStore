// import { Link, NavLink } from "react-router-dom";

// const HomePage = () => {
//   return (
//     <div className="w-full flex flex-col items-center justify-center min-h-[80vh] text-center gap-4">
//       <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
//       <p className="text-gray-300">This is the home page of our application</p>

//       <div className="flex flex-col gap-2">
//         <Link to="/login" className="text-blue-400 hover:underline">
//           Logowanie
//         </Link>
//         <Link to="/register" className="text-blue-400 hover:underline">
//           Rejestracja
//         </Link>
//         <Link to="/products" className="text-blue-400 hover:underline">
//           Lista produktów
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const HomePage = () => {
  const containerRef = useRef();
  const [exploded, setExploded] = useState(false);
  const originalStyles = useRef(new Map());

  const handleToggleExplode = () => {
    const container = containerRef.current;
    const elements = container.querySelectorAll(".movable");

    if (!exploded) {
      // ZAPAMIĘTAJ oryginalne pozycje i style
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        originalStyles.current.set(el, {
          position: el.style.position,
          top: el.style.top,
          left: el.style.left,
          margin: el.style.margin,
          transform: el.style.transform,  // Zapamiętaj obroty
        });

        el.style.position = "absolute";
        el.style.top = `${rect.top + window.scrollY}px`;
        el.style.left = `${rect.left + window.scrollX}px`;
        el.style.margin = "0";
        el.style.cursor = "move";
        el.style.transition = "top 0.3s ease";

        el.isDragging = false;
        makeDraggable(el);
        applyGravity(el);
      });
    } else {
      // PRZYWRÓĆ style
      elements.forEach((el) => {
        const styles = originalStyles.current.get(el);
        if (styles) {
          el.style.position = styles.position;
          el.style.top = styles.top;
          el.style.left = styles.left;
          el.style.margin = styles.margin;
          el.style.transform = styles.transform;
          el.style.cursor = "";
          el.style.transition = "";
          el.isDragging = false;
        }
      });
    }

    setExploded(!exploded);
  };

  const makeDraggable = (el) => {
    let offsetX = 0;
    let offsetY = 0;
    let initialAngle = 0;
    let currentAngle = 0;
    let isDragging = false;

    const onMouseDown = (e) => {
      isDragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      initialAngle = Math.atan2(e.clientY - el.offsetTop, e.clientX - el.offsetLeft) * (180 / Math.PI);
      el.style.zIndex = 1001;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;

      const currentAngleDeg = Math.atan2(e.clientY - el.offsetTop, e.clientX - el.offsetLeft) * (180 / Math.PI);
      const deltaAngle = currentAngleDeg - initialAngle;

      currentAngle = deltaAngle;
      el.style.transform = `rotate(${currentAngle}deg)`;

      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
    };

    const onMouseUp = () => {
      isDragging = false;
      el.style.zIndex = 1000;
    };

    el.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const applyGravity = (el) => {
    let velocity = 0;
    const gravity = 0.98;

    const fall = () => {
      if (!el.isDragging) {
        velocity += gravity;
        let currentTop = parseFloat(el.style.top) || 0;
        const floorY = window.innerHeight - 20 - el.offsetHeight;

        let newTop = currentTop + velocity;

        if (newTop >= floorY) {
          newTop = floorY;
          velocity = 0;
        }

        el.style.top = `${newTop}px`;
      }
      requestAnimationFrame(fall);
    };

    requestAnimationFrame(fall);
  };

  // Funkcja do wykrywania kolizji
  const checkCollision = (el1, el2) => {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center min-h-[80vh] text-center gap-4 relative"
      ref={containerRef}
    >
      <button
        onClick={handleToggleExplode}
        className="fixed top-4 left-4 bg-red-600 text-white px-4 py-2 z-50 rounded"
      >
        {exploded ? "Napraw stronę" : "Rozsyp stronę"}
      </button>

      <h1
        className="text-3xl font-bold movable"
        style={{
          whiteSpace: "nowrap",
          userSelect: exploded ? "none" : "auto",
        }}
      >
        Welcome to the Home Page
      </h1>
      <p
        className="text-gray-300 movable"
        style={{
          whiteSpace: "nowrap",
          userSelect: exploded ? "none" : "auto",
        }}
      >
        This is the home page of our application
      </p>

      <div className="flex flex-col gap-2 movable">
        <Link
          to="/login"
          className="text-blue-400 hover:underline"
          style={{
            whiteSpace: "nowrap",
            userSelect: exploded ? "none" : "auto",
          }}
        >
          Logowanie
        </Link>
        <Link
          to="/register"
          className="text-blue-400 hover:underline"
          style={{
            whiteSpace: "nowrap",
            userSelect: exploded ? "none" : "auto",
          }}
        >
          Rejestracja
        </Link>
        <Link
          to="/products"
          className="text-blue-400 hover:underline"
          style={{
            whiteSpace: "nowrap",
            userSelect: exploded ? "none" : "auto",
          }}
        >
          Lista produktów
        </Link>
      </div>

      {/* Niewidzialna podłoga */}
      <div
        className="floor"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "20px",
          backgroundColor: "transparent",
          pointerEvents: "none",
        }}
      ></div>
    </div>
  );
};

export default HomePage;
