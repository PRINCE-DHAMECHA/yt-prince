import { Stack, Box, Skeleton } from "@mui/material";
import React from "react";
import ChannelDetail from "./ChannelDetail";
import VideoCard from "./VideoCard";
import ChannelCard from "./ChannelCard";

const Videos = ({ videos, direction, parentLoading }) => {
  console.log(videos);
  return (
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
      justifyContent={"space-around"}
      alignItems={"center"}
      gap={1}
    >
      {(parentLoading || videos?.length === 0) && (
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{
              width: { xs: "100%", sm: "358px", md: "320px" },
              background: "gray",
              color: "white",
            }}
            height={324}
            animation="pulse"
          />
          <Skeleton
            variant="rectangular"
            sx={{
              width: { xs: "100%", sm: "358px", md: "320px" },
              background: "gray",
              color: "white",
            }}
            height={324}
            animation="pulse"
          />
          <Skeleton
            variant="rectangular"
            sx={{
              width: { xs: "100%", sm: "358px", md: "320px" },
              background: "gray",
              color: "white",
            }}
            height={324}
            animation="pulse"
          />
          <Skeleton
            variant="rectangular"
            sx={{
              width: { xs: "100%", sm: "358px", md: "320px" },
              background: "gray",
              color: "white",
            }}
            height={324}
            animation="pulse"
          />
        </Box>
      )}
      {!(parentLoading || videos?.length === 0) &&
        videos?.map(
          (item, idx) =>
            (item.id.channelId || item.id.videoId) && (
              <Box key={idx}>
                {item.id.videoId && <VideoCard video={item}></VideoCard>}
                {item.id.channelId && (
                  <ChannelCard channelDetail={item}></ChannelCard>
                )}
              </Box>
            )
        )}
    </Stack>
  );
};

export default Videos;
