import React from "react"
import './loader.css'

export default function loader() {
  return (
    <div className="load">
      <div className="loader loader--style6" title="5">
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="80px"
          height="64px"
          viewBox="0 0 24 60"
          style={{background: "#282c34"}}
          xmlSpace="preserve"
        >
          <rect
            className="blue"
            x="0"
            y="13"
            rx="3"
            ry="3"
            width="6"
            height="4"
            fill="#333"
          >
            <animate
              attributeName="height"
              attributeType="XML"
              values="5;21;5"
              begin="0s"
              dur="0.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              attributeType="XML"
              values="13; 5; 13"
              begin="0s"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </rect>

          <rect
            className="green"
            x="10"
            y="13"
            rx="3"
            ry="3"
            width="6"
            height="5"
            fill="#333"
          >
            <animate
              attributeName="height"
              attributeType="XML"
              values="5;21;5"
              begin="0.12s"
              dur="0.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              attributeType="XML"
              values="13; 5; 13"
              begin="0.12s"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </rect>

          <rect
            className="yellow"
            x="20"
            y="13"
            rx="3"
            ry="3"
            width="6"
            height="5"
            fill="#333"
          >
            <animate
              attributeName="height"
              attributeType="XML"
              values="5;21;5"
              begin="0.24s"
              dur="0.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              attributeType="XML"
              values="13; 5; 13"
              begin="0.24s"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </rect>

          <rect
            className="orange"
            x="30"
            y="13"
            rx="3"
            ry="3"
            width="6"
            height="5"
            fill="#333"
          >
            <animate
              attributeName="height"
              attributeType="XML"
              values="5;21;5"
              begin="0.36s"
              dur="0.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              attributeType="XML"
              values="13; 5; 13"
              begin="0.36s"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </rect>

          <rect
            className="pink"
            x="40"
            y="13"
            rx="3"
            ry="3"
            width="6"
            height="5"
            fill="#333"
          >
            <animate
              attributeName="height"
              attributeType="XML"
              values="5;21;5"
              begin="0.48s"
              dur="0.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              attributeType="XML"
              values="13; 5; 13"
              begin="0.48s"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </div>
    </div>
  )
}
