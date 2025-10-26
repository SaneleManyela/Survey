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

// ===================== PAGE 5 =====================
const leadershipQuestions = [
  "I engage in and like arguments or conflicts at work.",
  "I would appreciate feedback that is open and truthful, even if it is harsh.",
  "My natural reaction when I'm insulted is to withdraw rather than react.",
  "I feel that avoiding unnecessary disagreement is typically the best strategy.",
  "Workplace conflict can either motivate or depress me.",
  "When my department or team is compared to others, I feel competitive.",
  "I like the challenge of work competitions or 'turf wars.'",
  "When someone is nasty to me, I usually feel forced to return the favor."
];

export function Page4() {
  const [answers, setAnswers] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const userId = "anonymous"; // TODO: replace with auth.uid when integrating

  // ✅ Radio buttons only update local state
  const handleRadioChange = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  // ✅ Save button explicitly calls saveSurveyResponse
  const handleSave = async () => {
    setIsSaving(true);
    try {
      console.log("Saving survey response...", { userId, page: "page4", answers });
      const result = await saveSurveyResponse(userId, { page: "page4", answers });
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
          sx={{
            mb: 2,
            color: "black",
            fontWeight: "bold",
            borderColor: "black",
            "&:hover": {
              borderColor: "black",
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          Home
        </Button>

        <Typography variant="h1" gutterBottom>
          Assessing One's Leadership: Potential towards Conflict
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Instructions:</strong> Indicate the extent to which each statement describes your attitude or behavior by selecting one number. 1 = Very Inaccurate (VI) | 2 = Moderately Inaccurate (MI) | 3 = Neither Accurate nor Inaccurate (N) | 4 = Moderately Accurate (MA) | 5 = Very Accurate (VA)
        </Typography>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Statement</TableCell>
                {[1, 2, 3, 4, 5].map((num) => (
                  <TableCell key={num} align="center">{num}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {leadershipQuestions.map((q, index) => (
                <TableRow key={index}>
                  <TableCell>{q}</TableCell>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <TableCell key={num} align="center">
                      <Radio
                        checked={answers[index] === num.toString()}
                        onChange={() => handleRadioChange(index, num.toString())}
                        value={num.toString()}
                        name={`cp${index + 1}`}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        {/* ✅ Save Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={isSaving}
          sx={{ mt: 2, fontWeight: 'bold' }}
        >
          {isSaving ? "Saving..." : "Save Responses"}
        </Button>
      </Container>
    </ThemeProvider>
  );
}
