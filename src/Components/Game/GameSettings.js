import React from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import SelectField from '../Game/SelectField';
import TextFieldComp from '../Game/TextFieldComp';
import useAxios from '../../Hooks/useAxios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  handleCategoryChange,
  handleDifficultyChange,
  handleTypeChange,
  handleAmountChange,
} from '../../Redux/actions';

const GameSettings = () => {
  const { response, error, loading } = useAxios({ url: '/api_category.php' });
  const navigate = useNavigate();

  const difficultyOptions = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ];

  const typeOptions = [{ id: 'multiple', name: 'Multiple Choice' }];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/questions');
  };

  const dispatch = useDispatch();

  const [isRunRandome, setIsRunRandome] = React.useState(false);
  useEffect(() => {
    if (isRunRandome && response && !error && !loading) {
      const test = {
        question_category:
          response.trivia_categories[
            Math.floor(Math.random() * (response.trivia_categories.length - 1))
          ],
        question_difficulty:
          difficultyOptions[
            Math.floor(Math.random() * (difficultyOptions.length - 1))
          ],
        question_type: typeOptions[0],
        amount_of_question: 10,
        score: 0,
      };
      console.log({ test });
      dispatch(handleCategoryChange(test.question_category.id));
      dispatch(handleDifficultyChange(test.question_difficulty.id));
      dispatch(handleTypeChange(test.question_type.id));
      dispatch(handleAmountChange(test.amount_of_question));
      setTimeout(() => {
        navigate('/questions');
      }, 500);
    }
  }, [response, error, loading, isRunRandome]);

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant='h6' mt={20} color='red'>
        Some Went Wrong!
      </Typography>
    );
  }

  return (
    <>
      <h1>Welcome to Quizzi!</h1>

      <form onSubmit={handleSubmit}>
        <SelectField options={response.trivia_categories} label='Category' />
        <SelectField options={difficultyOptions} label='Difficulty' />
        <SelectField options={typeOptions} label='Type' />
        <TextFieldComp />
        <Box mt={3} width='100%'>
          <Button fullWidth variant='contained' type='submit'>
            Get Started
          </Button>
        </Box>
      </form>
      <Button
        onClick={() => {
          setIsRunRandome(true);
        }}
      >
        Random
      </Button>
    </>
  );
};

export default GameSettings;
