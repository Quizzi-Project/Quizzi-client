import { Button, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';
import { handleScoreChange } from '../../Redux/actions';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max)); // TODO: move to utils folder
};

const difficultyOptions = [
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' },
];

const typeOptions = [{ id: 'multiple', name: 'Multiple Choice' }];

const Questions = () => {
  const {
    question_category, // TODO: use camelCase
    question_difficulty,
    question_type,
    amount_of_question,
    score,
  } = useSelector((state) => state);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=${amount_of_question}`;
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  console.log({ apiUrl });

  const { response, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    console.log({ response });
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      console.log({ answers });
      setOptions(answers);
    }
  }, [response, questionIndex]);

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate('/score');
    }
  };

  if (!response.results.length) {
    return (
      <div>
        No Questions to show
        <div>
          <Link to='/settings'>settings</Link>
        </div>
        <div>
          <Link to='/'>home</Link>
        </div>
      </div>
    );
  }
  return (
    <Box>
      <div>
        <Link to='/settings'>settings</Link>
      </div>
      <div>
        <Link to='/'>home</Link>
      </div>
      <Typography variant='h4'>Questions {questionIndex + 1}</Typography>
      <Typography>{response.results[questionIndex].question}</Typography>
      {options.map((answerOption, index) => (
        <Box mt={2} key={index}>
          <Button onClick={handleClickAnswer} variant='contained'>
            {answerOption}
          </Button>
        </Box>
      ))}
      <Box mt={5}>
        Score: {score} / {response.results.length}
      </Box>
    </Box>
  );
};

export default Questions;
