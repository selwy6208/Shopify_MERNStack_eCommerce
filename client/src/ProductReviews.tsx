import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Statics
import './ProductReviews.css';
import Axios from 'axios';

interface ReviewTypes {
  _id: string;
  comment: string;
  rating: number;
}

interface Props {
  productId: string;
  reviews: Array<ReviewTypes>;
}

const ProductReviews: React.FC<Props> = ({ productId, reviews }) => {
  //  States
  const [rating, setRating] = useState<number | null>(1);
  const [comment, setComment] = useState<string>('');

  // Functions
  const handleComment = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => setComment(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment && rating) {
      await Axios.post(`/api/p/${productId}`, { comment, rating });
      setRating(1);
      setComment('');
    } else {
      alert('Comment And Rating is Required!');
    }
  };

  return (
    <div className="productReview">
      <div className="productReview__left">
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Leave A Review
          </Typography>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(_, newValue: number | null) => setRating(newValue)}
            />
          </Box>
          <TextField
            label="Comment"
            multiline
            rows={4}
            onChange={handleComment}
            value={comment}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Review
          </Button>
        </form>
      </div>
      <div className="productReview__right">
        <List>
          {reviews.map((r) => (
            <ListItem alignItems="flex-start" key={r._id}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={<Rating value={r.rating} readOnly />}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Ali Connors
                    </Typography>
                    {` — ${r.comment}`}
                  </React.Fragment>
                }
              />
              <Divider variant="inset" component="li" />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default ProductReviews;