import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";
import { tournamentsLogo } from "../../content/tournamentsLogo";
import { dict } from "../../dict";

const styles = ({ palette, spacing }: Theme) => ({
  caption: {
    color: palette.text.secondary,
  },
  content: {
    paddingBottom: 0,
    paddingTop: spacing(2),
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

interface IProps extends WithStyles<typeof styles> {
  country?: string;
  id: string;
  name: string;
}

const fallBackImageUrl =
  "http://www.merseyvolley.co.uk/MVL/wp-content/uploads/2017/04/icon_tournament.png";

const TournamentCardImage = (props: IProps) => {
  const { classes } = props;
  const id = props.id.split(":")[2];
  const image = tournamentsLogo[id] ? tournamentsLogo[id] : fallBackImageUrl;
  return (
    <CardMedia
      component="img"
      className={classes.img}
      image={image}
      title={props.name}
    />
  );
};

const TournamentCardElement = (props: IProps) => {
  const { classes } = props;

  const MyLink = React.forwardRef((linkProps: any, ref) => (
    <Link to={`tournament/${props.id}`} {...linkProps} innerRef={ref} />
  ));

  return (
    <Card>
      <CardActionArea href="">
        <MyLink>
          <TournamentCardImage {...props} />
        </MyLink>
      </CardActionArea>
      <CardContent className={classes.content}>
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
