import { Box, useTheme, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [queries, setQueries] = useState([
    {
      title: "Fix User Issue",
      query: "Make adjustments so that only admins can add users ",
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newQuery = { title, query };
    setQueries([...queries, newQuery]);
    setTitle("");
    setQuery("");
  };

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title of query"
          variant="filled"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Enter your query"
          variant="filled"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          endIcon={<PostAddIcon />}
          color="success"
          size="large"
          sx={{ ml: 85, mt: 3 }}
        >
          Submit
        </Button>
      </form>
      <br></br>
      <Box>
        {/* <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              Camera Issue
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Please check inactive cameras query</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              User chart issue
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Please add a user chart.</Typography>
          </AccordionDetails>
        </Accordion> */}
        {queries.map((q, i) => (
          <Accordion key={i}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                {q.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{q.query}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default FAQ;
