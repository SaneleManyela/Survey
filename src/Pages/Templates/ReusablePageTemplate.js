import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme.js";
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
import { saveSurveyResponse } from "../../db/dbStore.js";

/**
 * Reusable survey page component
 * @param {string} pageTitle - Title of the page
 * @param {string} pageKey - Firestore key for this page (e.g., "page5")
 * @param {string[]} questions - Array of questions for this page
 * @param {number[]} options - Array of selectable options (true/false = ["true","false"], Likert = [1,2,3,4,5])
 */
export function SurveyPage({ pageTitle, pageKey, questions, options }) {
  const [answers, setAnswers] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const userId = "anonymous"; // Replace with real user ID if available

  const handleRadioChange = async (index, value) => {
    const updatedAnswers = { ...answers, [index]: value };
    setAnswers(updatedAnswers);

    // Save responses to Firestore
    await saveSurveyResponse(userId, { page: pageKey, answers: updatedAnswers });

    // Show pop-up if last question
    if (index === questions.length - 1) {
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

        <Typography variant="h1">{pageTitle}</Typography>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Statement</TableCell>
                {options.map((opt) => (
                  <TableCell key={opt} align="center">{opt}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((q, index) => (
                <TableRow key={index}>
                  <TableCell>{q}</TableCell>
                  {options.map((opt) => (
                    <TableCell key={opt} align="center">
                      <Radio
                        checked={answers[index] === opt.toString()}
                        onChange={() => handleRadioChange(index, opt.toString())}
                        value={opt.toString()}
                        name={`${pageKey}_${index}`}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        {/* Pop-up dialog for last radio */}
        <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
          <DialogContent sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => setShowPopup(false)}
              sx={{ fontSize: 24, width: 80, height: 80, borderRadius: 2 }}
            >
              ✅
            </Button>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
