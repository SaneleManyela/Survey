// src/Pages/Admin.js
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { getAllSurveyResponses } from "../db/dbStore.js";

// Questions data for each page
const pageQuestions = [
  {
    title: "Foundations of Communication Style",
    questions: [
      "Typically, when I speak in a group, others tend to pause and listen.",
      "My written work, such as emails and social media posts, consistently receives excellent responses.",
      "I typically return calls as soon as I get voicemail.",
      "I constantly seek chances to deliver presentations or speak in front of audiences.",
      "My writing, such as letters to editors or company newsletter articles, has been published or made public.",
      "I've had at least two messages or comments complimenting my own blog or website.",
      "I have received 'B' or higher marks for nearly all my academic papers as well as projects.",
      "Any time I tell a joke or a comment that I find funny, people usually chuckle.",
      "I keep myself informed by watching news shows on television or reading news articles online.",
      "My voice and gestures have been described as enthusiastic, vibrant, colorful, and dynamic by others.",
      "I usually send text messages with better grammar and spelling than I receive.",
    ],
    options: ["true", "false"],
  },
  {
    title: "Excellent Speaking and Writing Strategies",
    questions: [
      "My audience finds me to be highly educated and trustworthy about the subject matter at hand.",
      "I always change my voice and point of emphasis in order to suit the needs and interests of those listening.",
      "When offering a suggestion, I focus on explaining the direct benefits and positive outcomes for the people I'm trying to persuade.",
      "When making a point, I frequently utilize colorful, emotionally charged language that has a strong impact.",
      "I use relevant personal tales or brief narratives (anecdotes) to demonstrate and make abstract subjects more understandable.",
      "I make sure my arguments are backed up by reliable data, facts, or figures rather than just my own opinion.",
      "I want to reduce unneeded filler words and typical linguistic ticks (e.g. 'um,' 'uh').",
      "I value straightforward communication, starting with the most important facts.",
      "I only use technical or industry-specific terms when it's necessary and understood by my audience.",
    ],
    options: ["true", "false"],
  },
  {
    title: "Fundamentals of Persuasion and Influence",
    questions: [
      "My audience finds me to be highly educated and trustworthy about the subject matter at hand.",
      "I always change my voice and point of emphasis in order to suit the needs and interests of those listening.",
      "When offering a suggestion, I focus on explaining the direct benefits and positive outcomes for the people I'm trying to persuade.",
      "When making a point, I frequently utilize colorful, emotionally charged language that has a strong impact.",
      "I use relevant personal tales or brief narratives (anecdotes) to demonstrate and make abstract subjects more understandable.",
      "I make sure my arguments are backed up by reliable data, facts, or figures rather than just my own opinion.",
      "I want to reduce unneeded filler words and typical linguistic ticks (e.g. 'um,' 'uh').",
      "I value straightforward communication, starting with the most important facts.",
      "I only use technical or industry-specific terms when it's necessary and understood by my audience.",
    ],
    options: ["true", "false"],
  },
  {
    title: "Style of Conflict Resolution Self-Evaluation",
    questions: [
      "I see myself as a forceful, uncompromising negotiator.",
      "Dominating and defeating the other party is the best approach for resolving a dispute.",
      "I try to ensure the other party feels they have gained something and can leave the negotiation feeling satisfied.",
      "To make space for my desired outcome, I intentionally start negotiations with an aggressive demand or offer.",
      "In a really effective negotiation, one party wins everything and the other loses everything.",
      "Both parties should leave the table with something beneficial after reaching an agreement.",
      "When disagreeing, I focus on paying close attention to understand the other person's point of view.",
      "I refuse to surrender or compromise during an argument because I am confident about my point.",
      "I always take into consideration how important it is to keep a positive, long-term working relationship while resolving conflicts with coworkers.",
      "People who are too friendly or welcoming get the worst outcomes in conflict resolution.",
    ],
    options: ["true", "false"],
  },
  {
    title: "Assessing One's Leadership: Potential towards Conflict",
    questions: [
      "I engage in and like arguments or conflicts at work.",
      "I would appreciate feedback that is open and truthful, even if it is harsh.",
      "My natural reaction when I'm insulted is to withdraw rather than react.",
      "I feel that avoiding unnecessary disagreement is typically the best strategy.",
      "Workplace conflict can either motivate or depress me.",
      "When my department or team is compared to others, I feel competitive.",
      "I like the challenge of work competitions or 'turf wars.'",
      "When someone is nasty to me, I usually feel forced to return the favor.",
    ],
    options: ["true", "false"],
  },
];

// Aggregate counts for page options
function aggregateCounts(responses, pageKey, numQuestions, options) {
  const counts = Array.from({ length: numQuestions }, () =>
    Object.fromEntries(options.map((opt) => [opt, 0]))
  );
  responses.forEach((resp) => {
    const pageAnswers = resp.responses?.[pageKey] || {};
    Object.entries(pageAnswers).forEach(([qIdx, value]) => {
      if (counts[qIdx] && counts[qIdx][value] !== undefined) counts[qIdx][value]++;
    });
  });
  return counts;
}

// Count participants per page
function countParticipantsPerPage(responses, pageKey) {
  return responses.filter((resp) => resp.responses?.[pageKey]).length;
}

export function Admin() {
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // current survey page
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedResponses, setSelectedResponses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getAllSurveyResponses();
      setResponses(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleViewResponses = (pageIdx) => {
    const pageKey = `page${pageIdx}`;
    const pageResponses = responses.map((resp) => ({
      id: resp.id,
      answers: resp.responses?.[pageKey] || {},
    }));
    setSelectedResponses(pageResponses);
    console.log("AllSurveyResponses:", responses);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedResponses([]);
  };

  const page = pageQuestions[currentPage] || { title: "", questions: [], options: [] };
  const counts = aggregateCounts(
    responses,
    `page${currentPage}`,
    page.questions.length,
    page.options
  );
  const participantsPerPage = countParticipantsPerPage(responses, `page${currentPage}`);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          startIcon={<HomeIcon />}
          sx={{
            mb: 2,
            color: "black",
            fontWeight: "bold",
            borderColor: "black",
            "&:hover": { borderColor: "black", backgroundColor: "#f5f5f5" },
          }}
        >
          Home
        </Button>

        <Typography variant="h3" gutterBottom>
          Survey Dashboard
        </Typography>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6">
            Total Participants: {loading ? <CircularProgress size={18} /> : responses.length}
          </Typography>
          <Typography variant="h6">
            Participants on this page: {loading ? <CircularProgress size={18} /> : participantsPerPage}
          </Typography>
        </Paper>

        {/* Page navigation */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            {page.title}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => handleViewResponses(currentPage)}
            sx={{ mb: 2, color: "black", borderColor: "black" }}
          >
            View Individual Responses
          </Button>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Statement</TableCell>
                {page.options.map((opt) => (
                  <TableCell key={opt} align="center">
                    {opt}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {page.questions.map((q, qIdx) => (
                <TableRow key={qIdx}>
                  <TableCell>{q}</TableCell>
                  {page.options.map((opt) => (
                    <TableCell key={opt} align="center">
                      {counts[qIdx][opt]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination buttons */}
          <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between" }}>
            <Button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((p) => p - 1)}
              sx={{ color: "black", borderColor: "black" }}
            >
              Previous
            </Button>
            <Typography>
              Page {currentPage + 1} / {pageQuestions.length}
            </Typography>
            <Button
              disabled={currentPage === pageQuestions.length - 1}
              onClick={() => setCurrentPage((p) => p + 1)}
              sx={{ color: "black", borderColor: "black" }}
            >
              Next
            </Button>
          </div>
        </Paper>

        {/* Dialog for individual responses */}
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
          <DialogTitle>
            Individual Responses
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  {page.questions.map((q, qIdx) => (
                    <TableCell key={qIdx} align="center">
                      Q{qIdx + 1}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedResponses.map((resp) => (
                  <TableRow key={resp.id}>
                    <TableCell>{resp.id}</TableCell>
                    {page.questions.map((q, qIdx) => (
                      <TableCell key={qIdx} align="center">
                        {resp.answers[qIdx] || "-"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}