import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import firebase from "firebase/compat/app";
import { getDatabase, ref, set, push} from "firebase/database";
import { initializeApp } from "firebase/app";
/*
function add_settings() 
{
     const dark_mode = true; 

}
*/