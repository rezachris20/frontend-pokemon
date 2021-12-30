import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Navbar from './pages/components/Navbar'

export default function App() {
  return (
    <Navbar />
  );
}