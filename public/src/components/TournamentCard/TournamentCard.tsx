import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";
import { tournamentsLogo } from "../../content/tournamentsLogo";
import { dict } from "../../dict";

interface IProps {
  classes?: any;
  country?: string;
  id: string;
  name: string;
}

const styles = ({ palette }: Theme) => ({
  caption: {
    color: palette.text.secondary,
  },
  h2: {
    overflow: "hidden",
    "text-overflow": "ellipsis",
    "white-space": "nowrap",
  },
  img: {
    backgroundSize: "contain",
    height: "300px",
  },
});

const TournamentCardElement = (props: IProps) => {
  const { classes } = props;
  const MyLink = (linkProps: any) => (
    <Link to={`tournament/${props.id}`} {...linkProps} />
  );
  const renderImage = () => {
    const id = props.id.split(":")[2];
    const image = tournamentsLogo[id]
      ? tournamentsLogo[id]
      : "http://www.merseyvolley.co.uk/MVL/wp-content/uploads/2017/04/icon_tournament.png";
    return (
      <CardMedia className={classes.img} image={image} title={props.name} />
    );
  };

  return (
    <Card>
      {renderImage()}
      <CardContent>
        <Typography className={classes.h2} variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography className={classes.caption} variant="caption">
          {props.country}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={MyLink} size="small" color="primary">
          {dict.tournament_card_more}
        </Button>
      </CardActions>
    </Card>
  );
};

export const TournamentCard = withStyles(styles)(TournamentCardElement);
