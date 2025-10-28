import { useState } from "react";
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
  Radio,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { saveSurveyResponse } from "../db/dbStore.js";
import { getUserId } from "../utils/userIdGenerator.js";

const conflictQuestions = [
  "My audience finds me to be highly educated and trustworthy about the subject matter at hand.",
  "I always change my voice and point of emphasis in order to suit the needs and interests of those listening.",
  "When offering a suggestion, I focus on explaining the direct benefits and positive outcomes for the people I'm trying to persuade.",
  "When making a point, I frequently utilize colorful, emotionally charged language that has a strong impact.",
  "I use relevant personal tales or brief narratives (anecdotes) to demonstrate and make abstract subjects more understandable.",
  "I make sure my arguments are backed up by reliable data, facts, or figures rather than just my own opinion.",
  "I want to reduce unneeded filler words and typical linguistic ticks (e.g. 'um,' 'uh').",
  "I value straightforward communication, starting with the most important facts.",
  "I only use technical or industry-specific terms when it's necessary and understood by my audience."
];

export function Page2() {
  const [answers, setAnswers] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const userId = getUserId();

  const handleRadioChange = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      console.log("Saving survey response...", { userId, page: "page2", answers });
      const result = await saveSurveyResponse(userId, { page: "page2", answers });
      console.log("Save result:", result);
      if (!result.success) alert("Failed to save your responses: " + result.error);
    } catch (err) {
      console.error("Error saving response:", err);
      alert("Failed to save your responses. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Button component={Link} to="/" variant="outlined" startIcon={<HomeIcon />} sx={{ mb: 2, color: "black", fontWeight: "bold", borderColor: "black", "&:hover": { borderColor: "black", backgroundColor: "#f5f5f5" } }}>
          Home
        </Button>
        <Typography variant="h1" gutterBottom>
          Fundamentals of Persuasion and Influence
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Instructions:</strong> Please indicate whether the following statements are <strong>Mostly True</strong> or <strong>Mostly False</strong> regarding how you generally approach conflict and negotiation.
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Statement</TableCell>
                <TableCell align="center">Mostly True</TableCell>
                <TableCell align="center">Mostly False</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {conflictQuestions.map((q, index) => (
                <TableRow key={index}>
                  <TableCell>{q}</TableCell>
                  <TableCell align="center">
                    <Radio checked={answers[index] === "true"} onChange={() => handleRadioChange(index, "true")} value="true" name={`c${index}`} />
                  </TableCell>
                  <TableCell align="center">
                    <Radio checked={answers[index] === "false"} onChange={() => handleRadioChange(index, "false")} value="false" name={`c${index}`} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving} sx={{ mt: 2, fontWeight: 'bold' }}>
          {isSaving ? "Saving..." : "Save Responses"}
        </Button>
      </Container>
    </ThemeProvider>
  );
}
