import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Skeleton } from "@mui/material";
import Videos from "./Videos";
import ChannelCard from "./ChannelCard";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setloading] = useState(true);
  console.log(ChannelDetail, videos);
  useEffect(() => {
    setloading(true);
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => {
      setChannelDetail(data?.items[0]);
    });
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => {
        setVideos(data?.items);
        setloading(false);
      }
    );
  }, [id]);
  if (loading) {
    return (
      <Skeleton
        variant="rectangular"
        sx={{
          width: "auto",
          background: "gray",
          color: "white",
          margin: "20px",
        }}
        height={"100vh"}
        animation="pulse"
      />
    );
  }
  return (
    <Box minHeight={"95vh"}>
      <Box>
        <div
          style={{
            backgroundColor: "#ff7878",
            backgroundImage: "linear-gradient(315deg, #ff7878 0%, #ff0000 74%)",
            zIndex: "10",
            height: "200px",
          }}
        ></div>
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display={"flex"} p={2}>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
