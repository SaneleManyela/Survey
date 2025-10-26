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
  Dialog,
  DialogContent,
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
  const [showPopup, setShowPopup] = useState(false);
  const userId = "anonymous"; // Replace with real user ID if available

  const handleRadioChange = async (index, value) => {
    const updatedAnswers = { ...answers, [index]: value };
    setAnswers(updatedAnswers);

    try {
      await saveSurveyResponse(userId, {
        page: "page0",
        answers: updatedAnswers,
      });
    } catch (err) {
      console.error("Error saving response:", err);
    }

    // Show ✅ popup only on last question
    if (index === leadershipQuestions.length - 1) {
      setShowPopup(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
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
        {/* ✅ Pop-up dialog when last question answered */}
        <Dialog
          open={showPopup}
          onClose={() => setShowPopup(false)}
          PaperProps={{
            sx: { borderRadius: 0, width: 160, height: 160 }, // square dialog
          }}
        >
          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => setShowPopup(false)}
              sx={{
                fontSize: 36,
                width: 80,
                height: 80,
                borderRadius: 2,
              }}
            >
              ✅
            </Button>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}