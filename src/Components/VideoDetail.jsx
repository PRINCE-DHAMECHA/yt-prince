import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Skeleton } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";
const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setloading(true);
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setVideoDetail(data?.items[0]);
    });
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => {
        console.log(data);
        setVideos(data?.items);
        setloading(false);
      }
    );
  }, [id]);
  if (!videoDetail?.snippet) return "loading...";
  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;
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
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            ></ReactPlayer>
            <Typography variant="h5" fontWeight={"bold"} p={2} color="#fff">
              {title}
            </Typography>
            <Stack
              direction={"column"}
              justifyContent={"space-between"}
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Stack direction={"row"} gap="10px" alignItems={"center"}>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                  {parseInt(viewCount).toLocaleString()} Views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                  {parseInt(likeCount).toLocaleString()} Likes
                </Typography>
              </Stack>
              <Link to={`/channel/${channelId}`}>
                <Typography color="#fff" variant="h5">
                  {channelTitle}
                  <CheckCircle
                    sx={{
                      fontSize: "12px",
                      color: "gray",
                      ml: "5px",
                      mt: "20px",
                    }}
                  />
                </Typography>
              </Link>
            </Stack>
          </Box>
        </Box>
      </Stack>
      <Typography variant="h4" textAlign={"center"} color="white" my={"20px"}>
        Related Videos
      </Typography>
      <Box
        px={2}
        py={{ md: 1, xs: 5 }}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
      >
        <Videos videos={videos} direction="column" />
      </Box>
    </Box>
  );
};

export default VideoDetail;
