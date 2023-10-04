import React, { useEffect, useMemo, useState } from "react";
import Navigation from "./COMPONENT/Navigation";
import { useParams } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./redux/slices/UserSlice";
import TopbarStart from "./COMPONENT/TopbarStart";
import Header from "./COMPONENT/Header";
import './App.css'
import Footer from "./COMPONENT/Footer";
import MainNewsSlider from "./COMPONENT/MainNewsSlider";
import EducationSports from "./COMPONENT/EducationSports";
const Template = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [agencyDetails, setAgencyDetails] = useState();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://174.138.101.222:8080/${id}/get-publication-details`
            );
            setAgencyDetails(response.data.data[0]);
            dispatch(addUser(response.data.data[0]));
            document.title = response.data.data[0].publication_name
            const favicon = document.getElementById("favicon"); // Accessing favicon element
            favicon.href = `http://174.138.101.222:8080${response.data.data[0].logo_small}`;

        } catch (error) {
            console.log(error);
        }
    };

    const [breakingNews, setBreakingNews] = useState();
    const fetchBreakingNews = async () => {
        try {
            const response = await axios.get(
                `http://174.138.101.222:8080/${id}/getBreakingNews`
            );
            // console.log(response.data.data, "breaking");
            setBreakingNews(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchBreakingNews();
        // fetchAd()
    }, []);
    return (
        <div className="centre">
            <Header />
            {<TopbarStart page_name={'Home_Page'} />}
            {agencyDetails && <Navigation agencyDetails={agencyDetails} />}
            {agencyDetails && breakingNews && (<MainNewsSlider page_name={'Home_Page'} agencyDetails={agencyDetails} breakingNews={breakingNews} />)}
            {agencyDetails && <EducationSports page_name={'Home_Page'} agencyDetails={agencyDetails} breakingNews={breakingNews} />}
            {agencyDetails && <Footer page_name={'Home_Page'} agencyDetails={agencyDetails} />}
        </div>
    );
};

export default Template;
