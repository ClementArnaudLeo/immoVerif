import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function Page404() {
  const Navigate = useNavigate()
  return (
    <div style={
      {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        border : "1px solid black",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        position: "absolute",
        backgroundColor: "black",
        color: "white",
        zIndex: "1000"
      }}>
      <h1>404</h1>
      <p>Page not found</p>
      <button type="button" className="btn btn-info" onClick={() => Navigate("/")}>Retourner au menu principal !</button>



    </div>
  )
}
