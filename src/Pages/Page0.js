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

const questionsSurvey0 = [
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
];

export function Page0() {
  const [answers, setAnswers] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const userId = getUserId();

  const handleRadioChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      console.log("Saving survey response...", { userId, page: "page0", answers });
      const result = await saveSurveyResponse(userId, { page: "page0", answers });
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
        <Button
          component={Link}
          to="/"
          variant="outlined"
          startIcon={<HomeIcon />}
          sx={{ mb: 2, color: "black", fontWeight: "bold", borderColor: "black", "&:hover": { borderColor: "black", backgroundColor: "#f5f5f5" } }}
        >
          Home
        </Button>
        <Typography variant="h1" gutterBottom>
          Foundations of Communication Style
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
              {questionsSurvey0.map((q, index) => (
                <TableRow key={index}>
                  <TableCell>{q}</TableCell>
                  <TableCell align="center">
                    <Radio checked={answers[index] === "true"} onChange={() => handleRadioChange(index, "true")} name={`q${index}`} value="true" />
                  </TableCell>
                  <TableCell align="center">
                    <Radio checked={answers[index] === "false"} onChange={() => handleRadioChange(index, "false")} name={`q${index}`} value="false" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving} sx={{ mt: 2, fontWeight: "bold" }}>
          {isSaving ? "Saving..." : "Save Responses"}
        </Button>
      </Container>
    </ThemeProvider>
  );
}
