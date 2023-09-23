import { FC, useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import SyncIcon from "@mui/icons-material/Sync";

const GetAdvice: FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      setData(responseData.slip?.advice || "No advice available");
      setCount((c) => c + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)", 
        borderRadius: "15px", 
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", 
        padding: "24px", 
        color: "white", 
        textAlign: "center", 
      }}
    >
      <Typography variant="h4" gutterBottom>
        Get Inspirational Advice
      </Typography>
      <Button
        variant="contained"
        color="info"
        onClick={fetchData}
        disabled={loading}
        sx={{
          textTransform: "none",
          mt: 4,
          padding: "12px 24px",
          borderRadius: "8px", 
          transition: "background-color 0.3s", 
          "&:hover": {
            backgroundColor: "#1976D2", 
          },
        }}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          <>
            Get Advice <SyncIcon sx={{ ml: 1 }} />
          </>
        )}
      </Button>
      {data && (
        <Typography variant="body1" sx={{ mt: 4 }}>
          "{data}"
        </Typography>
      )}
      <Typography variant="caption" sx={{ mt: 2 }}>
        You've received advice {count} times.
      </Typography>
    </Container>
  );
};

export default GetAdvice;
