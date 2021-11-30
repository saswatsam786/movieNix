import React from "react"
import './Error.css'
import {Link} from 'react-router-dom'

export default function error() {
  return (
    <div className ="main">
      <div className="head">
        <div className="meta">
        </div>
        <div className="meta">
        </div>
      </div>
      <Link style={{textDecoration:'none'}} to="/"><div className="body">
      </div></Link>
    </div>
  )
}
